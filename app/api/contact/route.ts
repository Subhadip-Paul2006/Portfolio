import { NextResponse } from "next/server"
import { Resend } from "resend"

// Simple in-memory rate limiting / deduplication store (keyed by IP + payload hash)
const recentSubmissions = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 10_000 // 10 seconds

function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS * 2) {
      recentSubmissions.delete(key)
    }
  }
}

// RFC 5322 compliant regex for basic email format validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid Content-Type. Expected application/json." },
        { status: 415 }
      )
    }

    // 2. Parse request payload
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed request payload. Invalid JSON." },
        { status: 400 }
      )
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid submission data." },
        { status: 400 }
      )
    }

    const { name, email, message } = body as Record<string, unknown>

    const trimmedName = typeof name === "string" ? name.trim() : ""
    const trimmedEmail = typeof email === "string" ? email.trim() : ""
    const trimmedMessage = typeof message === "string" ? message.trim() : ""

    // 3. Server-side field validations
    if (!trimmedName) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      )
    }
    if (trimmedName.length > 120) {
      return NextResponse.json(
        { success: false, error: "Name is too long (maximum 120 characters)." },
        { status: 400 }
      )
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, error: "Please enter your email address." },
        { status: 400 }
      )
    }
    if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      )
    }
    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (maximum 5000 characters)." },
        { status: 400 }
      )
    }

    // 4. Rate-limiting / Duplicate submission prevention
    cleanupRateLimitStore()
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const submissionFingerprint = `${clientIp}:${trimmedEmail}:${trimmedMessage.slice(0, 50)}`

    const lastSubmissionTime = recentSubmissions.get(submissionFingerprint)
    const now = Date.now()
    if (lastSubmissionTime && now - lastSubmissionTime < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate transmission detected. Please wait a moment before sending another message.",
        },
        { status: 429 }
      )
    }
    recentSubmissions.set(submissionFingerprint, now)

    // 5. Verify server environment configuration
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim()
    if (!receiverEmail || !EMAIL_REGEX.test(receiverEmail)) {
      console.error(
        "[Contact API] ERROR: CONTACT_RECEIVER_EMAIL is missing or invalid in environment variables."
      )
      return NextResponse.json(
        {
          success: false,
          error:
            "Receiver email configuration is missing or invalid on the server (CONTACT_RECEIVER_EMAIL).",
        },
        { status: 500 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim()
    if (!resendApiKey) {
      console.error(
        "[Contact API] ERROR: RESEND_API_KEY is not set in environment variables."
      )
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service credential is not configured on the server (RESEND_API_KEY).",
        },
        { status: 500 }
      )
    }

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "Portfolio Contact <onboarding@resend.dev>"

    // 6. Format email payload
    const submissionDate = new Date()
    const formattedDate = submissionDate.toUTCString()
    const subject = `New Portfolio Contact — ${trimmedName}`

    const safeName = escapeHtml(trimmedName)
    const safeEmail = escapeHtml(trimmedEmail)
    const safeMessage = escapeHtml(trimmedMessage)
    const safeDate = escapeHtml(formattedDate)

    const textContent = [
      "==================================================",
      "⚡ NEW CONTACT TRANSMISSION",
      "==================================================",
      "",
      `SENDER NAME:            ${trimmedName}`,
      `SENDER EMAIL:           ${trimmedEmail}`,
      `SUBMISSION DATE & TIME: ${formattedDate}`,
      "",
      "--------------------------------------------------",
      "MESSAGE / THE MISSION:",
      "--------------------------------------------------",
      trimmedMessage,
      "",
      "--------------------------------------------------",
      `Note: You can reply directly to this email to message ${trimmedName} (${trimmedEmail}).`,
    ].join("\n")

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #000000; font-family: 'Space Mono', 'Courier New', monospace; color: #ffffff;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 4px solid #ff3e00; box-shadow: 8px 8px 0px #ff3e00;">
    <tr>
      <td style="padding: 20px 24px; background-color: #ff3e00; color: #000000;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; font-family: 'Archivo Black', 'Arial Black', sans-serif;">
          ⚡ NEW CONTACT TRANSMISSION
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px 24px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #00f0ff; font-weight: bold; width: 140px; text-transform: uppercase; font-size: 13px;">
              SENDER NAME:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; font-weight: bold;">
              ${safeName}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #00f0ff; font-weight: bold; width: 140px; text-transform: uppercase; font-size: 13px;">
              SENDER EMAIL:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px;">
              <a href="mailto:${safeEmail}" style="color: #00f0ff; text-decoration: underline;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #00f0ff; font-weight: bold; width: 140px; text-transform: uppercase; font-size: 13px;">
              DATE &amp; TIME:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222222; color: #888888; font-size: 13px;">
              ${safeDate}
            </td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <div style="color: #ffff00; font-weight: bold; text-transform: uppercase; font-size: 13px; margin-bottom: 8px; letter-spacing: 0.5px;">
            THE MISSION / MESSAGE:
          </div>
          <div style="background-color: #000000; border: 2px solid #333333; padding: 18px; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">
${safeMessage}
          </div>
        </div>

        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px dashed #333333; font-size: 12px; color: #777777; line-height: 1.5;">
          Sent from Portfolio Contact Form.<br/>
          Reply directly to this email to respond to <strong style="color: #ffffff;">${safeName}</strong> (<span style="color: #00f0ff;">${safeEmail}</span>).
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`

    // 7. Transmit through Resend
    const resend = new Resend(resendApiKey)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      replyTo: trimmedEmail,
      subject,
      text: textContent,
      html: htmlContent,
    })

    if (error) {
      console.error("[Contact API] Resend email transmission error:", error)
      return NextResponse.json(
        {
          success: false,
          error:
            error.message ||
            "The email transmission service failed to deliver the message. Please try again.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Transmission delivered successfully.",
      id: data?.id,
    })
  } catch (err: unknown) {
    console.error("[Contact API] Unexpected error during transmission:", err)
    const message =
      err instanceof Error ? err.message : "An unexpected server error occurred."
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
