"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"

type Status = "idle" | "submitting" | "sent" | "error"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverError, setServerError] = useState<string>("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    // Clear status if user starts typing after an error or success
    if (status !== "idle" && status !== "submitting") {
      setStatus("idle")
      setServerError("")
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName) {
      newErrors.name = "Please enter your name."
    }

    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address."
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address."
    }

    if (!trimmedMessage) {
      newErrors.message = "Please enter your message."
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      // Focus first field with an error
      if (newErrors.name) {
        document.getElementById("contact-name")?.focus()
      } else if (newErrors.email) {
        document.getElementById("contact-email")?.focus()
      } else if (newErrors.message) {
        document.getElementById("contact-message")?.focus()
      }
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent duplicate submissions while in progress
    if (status === "submitting") {
      return
    }

    // Client-side validation before network transmission
    if (!validate()) {
      return
    }

    setStatus("submitting")
    setServerError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        setStatus("error")
        setServerError(
          data?.error ||
            "Transmission failed. Please check your network and try again."
        )
        return
      }

      // Success: clear form fields and show confirmation
      setStatus("sent")
      setFormData({ name: "", email: "", message: "" })
      setErrors({})
    } catch {
      setStatus("error")
      setServerError(
        "Network connection error. Transmission could not be delivered."
      )
    }
  }

  const isSubmitting = status === "submitting"

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label htmlFor="contact-name">YOUR NAME</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John 'The Maverick' Doe"
          autoComplete="name"
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          style={{ color: "var(--black)", caretColor: "var(--black)" }}
          required
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            style={{
              marginTop: "8px",
              color: "var(--primary)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ⚠ {errors.name}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="contact-email">EMAIL ADDRESS</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@unconventional.com"
          autoComplete="email"
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          style={{ color: "var(--black)", caretColor: "var(--black)" }}
          required
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            style={{
              marginTop: "8px",
              color: "var(--primary)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ⚠ {errors.email}
          </p>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="contact-message">THE MISSION</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me why we should break the internet together..."
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          style={{ color: "var(--black)", caretColor: "var(--black)" }}
          required
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            style={{
              marginTop: "8px",
              color: "var(--primary)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ⚠ {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        style={{
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.75 : 1,
        }}
      >
        {isSubmitting ? "SENDING TRANSMISSION…" : "SEND TRANSMISSION"}
      </button>

      {status === "sent" && (
        <p
          role="status"
          aria-live="polite"
          style={{
            marginTop: "20px",
            color: "var(--accent)",
            fontWeight: 700,
            fontFamily: "Space Mono, monospace",
            fontSize: "1.05rem",
            letterSpacing: "0.5px",
          }}
        >
          ✓ TRANSMISSION SUCCESSFUL — MESSAGE DELIVERED
        </p>
      )}

      {status === "error" && serverError && (
        <p
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "20px",
            color: "var(--primary)",
            fontWeight: 700,
            fontFamily: "Space Mono, monospace",
            fontSize: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          ✗ {serverError}
        </p>
      )}
    </form>
  )
}
