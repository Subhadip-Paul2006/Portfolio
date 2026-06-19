"use client"

import { useState } from "react"

type Status = "idle" | "submitting" | "sent" | "error"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Basic client-side validation
    const name = (data.get("name") as string)?.trim()
    const email = (data.get("email") as string)?.trim()
    const message = (data.get("message") as string)?.trim()

    if (!name || !email || !message) {
      setStatus("error")
      setErrorMsg("Please fill in every field before sending.")
      return
    }

    // Pragmatic default: simulate a submit. Replace with a real /api/contact
    // route handler when a backend is ready.
    setStatus("submitting")
    setErrorMsg("")
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <label htmlFor="contact-name">YOUR NAME</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="John 'The Maverick' Doe"
          autoComplete="name"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="contact-email">EMAIL ADDRESS</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="john@unconventional.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="contact-message">THE MISSION</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me why we should break the internet together..."
          required
        />
      </div>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "SENDING…" : "SEND TRANSMISSION"}
      </button>

      {status === "sent" && (
        <p
          role="status"
          aria-live="polite"
          style={{ marginTop: "20px", color: "var(--accent)", fontWeight: 700 }}
        >
          ✓ TRANSMISSION RECEIVED. I&apos;LL BE IN TOUCH.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          style={{ marginTop: "20px", color: "var(--primary)", fontWeight: 700 }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  )
}
