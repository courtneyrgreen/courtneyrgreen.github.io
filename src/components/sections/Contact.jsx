import { useEffect, useRef, useState } from 'react'
import '../../styles/sections/Contact.css'

export default function Contact({ onBack }) {
  const cardRef   = useRef(null)
  const [status, setStatus] = useState('STANDING BY')

  useEffect(() => {
    const t = setTimeout(() => {
      cardRef.current?.classList.add('visible')
      setStatus('COMMS OPEN')
    }, 150)
    return () => {
      clearTimeout(t)
      cardRef.current?.classList.remove('visible')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const name    = e.target.ctc_name.value
    const email   = e.target.ctc_email.value
    const subject = e.target.ctc_subject.value
    const body    = e.target.ctc_message.value
    setStatus('TRANSMITTING...')
    const mailto  = `mailto:crg123@georgetown.edu`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${body}`)}`
    setTimeout(() => {
      window.location.href = mailto
      setStatus('SIGNAL SENT')
    }, 600)
  }

  return (
    <div id="contact-layer">

      {/* Radiating signal pulse rings */}
      <div id="ctc-pulse-ring" className="ring r1" />
      <div id="ctc-pulse-ring" className="ring r2" />
      <div id="ctc-pulse-ring" className="ring r3" />
      <div id="ctc-pulse-ring" className="ring r4" />

      {/* Neptune glow */}
      <div id="ctc-glow" />

      {/* Main card */}
      <div id="ctc-card" ref={cardRef}>

        {/* Corner brackets */}
        <div className="ctc-corner tl" />
        <div className="ctc-corner tr" />
        <div className="ctc-corner bl" />
        <div className="ctc-corner br" />

        {/* Status header */}
        <div id="ctc-status-bar">
          <span className="ctc-status-dot" />
          <span id="ctc-status-text">{status}</span>
          <span className="ctc-status-divider" />
          <span className="ctc-status-item">NEPTUNE RELAY</span>
          <span className="ctc-status-divider" />
          <span className="ctc-status-item">CHANNEL 07</span>
          <span className="ctc-status-divider" />
          <span className="ctc-status-item">ENC AES-256</span>
        </div>

        {/* Header */}
        <div id="ctc-header">
          <div id="ctc-eyebrow">Neptune &nbsp;·&nbsp; Mission Control</div>
          <h1 id="ctc-title">Transmit a Message</h1>
        </div>

        {/* Form */}
        <form id="ctc-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="ctc-row">
            <div className="ctc-field">
              <label htmlFor="ctc_name">Sender ID</label>
              <input id="ctc_name" name="ctc_name" type="text" required placeholder="Your name" />
            </div>
            <div className="ctc-field">
              <label htmlFor="ctc_email">Return Signal</label>
              <input id="ctc_email" name="ctc_email" type="email" required placeholder="your@email.com" />
            </div>
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc_subject">Subject Line</label>
            <input id="ctc_subject" name="ctc_subject" type="text" required placeholder="Mission objective..." />
          </div>

          <div className="ctc-field">
            <label htmlFor="ctc_message">Payload</label>
            <textarea id="ctc_message" name="ctc_message" required placeholder="Describe your project, question, or idea..." rows={5} />
          </div>

          <div id="ctc-send-row">
            <button type="submit" id="ctc-send">
              <span className="ctc-send-arrow">▶</span> Transmit
            </button>
            <div id="ctc-signal-bars">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        </form>

        {/* Links */}
        <div id="ctc-links">
          <a href="https://github.com/courtneyrgreen" target="_blank" rel="noreferrer" className="ctc-link">GitHub</a>
          <span className="ctc-sep">·</span>
          <a href="https://www.linkedin.com/in/courtneyreneegreen/" target="_blank" rel="noreferrer" className="ctc-link">LinkedIn</a>
          <span className="ctc-sep">·</span>
          <a href="mailto:crg123@georgetown.edu" className="ctc-link">Direct Email</a>
        </div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}
