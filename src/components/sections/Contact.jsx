import { useEffect, useRef } from 'react'
import '../../styles/sections/Contact.css'

/*
  Contact — "Contact Mission Control" section.

  Themed around Neptune — deep-blue atmosphere, soft azure glow.
  Form submits via mailto so no backend is required.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/
export default function Contact({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 150)
    return () => {
      clearTimeout(t)
      if (cardRef.current) cardRef.current.classList.remove('visible')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name    = e.target.ctc_name.value
    const email   = e.target.ctc_email.value
    const subject = e.target.ctc_subject.value
    const body    = e.target.ctc_message.value
    const mailto  = `mailto:courtneygreen@email.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${body}`)}`
    window.location.href = mailto
  }

  return (
    <div id="contact-layer">

      {/* Neptune atmospheric glow */}
      <div id="ctc-glow" />

      {/* Main card */}
      <div id="ctc-card" ref={cardRef}>

        <div id="ctc-header">
          <div id="ctc-eyebrow">Neptune &nbsp;·&nbsp; Contact</div>
          <h1 id="ctc-title">Contact Mission Control</h1>
          <p id="ctc-sub">
            Ready to collaborate on something data-driven?<br />
            Beam me up.
          </p>
        </div>

        <form id="ctc-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc_name">Name</label>
              <input
                id="ctc_name"
                name="ctc_name"
                type="text"
                required
                placeholder="Your name"
              />
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc_email">Email</label>
              <input
                id="ctc_email"
                name="ctc_email"
                type="email"
                required
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc_subject">Subject</label>
            <input
              id="ctc_subject"
              name="ctc_subject"
              type="text"
              required
              placeholder="What's the mission?"
            />
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc_message">Message</label>
            <textarea
              id="ctc_message"
              name="ctc_message"
              required
              placeholder="Describe your project, question, or idea..."
              rows={5}
            />
          </div>

          <button type="submit" id="ctc-send">Transmit Message</button>
        </form>

        <div id="ctc-links">
          <a
            href="https://github.com/courtneygreen"
            target="_blank"
            rel="noreferrer"
            className="ctc-link"
          >
            GitHub
          </a>
          <span className="ctc-sep">·</span>
          <a
            href="https://linkedin.com/in/courtneygreen"
            target="_blank"
            rel="noreferrer"
            className="ctc-link"
          >
            LinkedIn
          </a>
          <span className="ctc-sep">·</span>
          <a href="mailto:courtneygreen@email.com" className="ctc-link">
            Direct Email
          </a>
        </div>

      </div>

      {/* Availability strip */}
      <div id="ctc-meta">
        <span>Replies within 24 hours</span>
        <span>Remote &amp; Hybrid</span>
        <span>Washington, D.C. &nbsp;·&nbsp; ET</span>
      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>

    </div>
  )
}
