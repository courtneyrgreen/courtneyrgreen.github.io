import { useEffect, useState } from 'react'
import resumePDF from '../../assets/images/Green_CV_2025.pdf'
import '../../styles/sections/ResumeTerminal.css'

const BOOT = [
  { text: '> ESTABLISHING SECURE CHANNEL...', delay: 0 },
  { text: '> HANDSHAKE CONFIRMED  ·  ENCRYPTION: AES-256', delay: 380 },
  { text: '> PAYLOAD MANIFEST RECEIVED', delay: 700 },
  { text: '', delay: 820 },
  { text: '> 2 TRANSMITTABLE FILES DETECTED', delay: 960 },
]

const FILES = [
  {
    pid: 'PACKET_01',
    fname: 'curriculum_vitae.pdf',
    meta: ['type  :  portable document', 'format:  pdf / long-form'],
    href: resumePDF,
    download: 'Green_CV_2025.pdf',
    cmd: 'GET curriculum_vitae.pdf',
  },
  {
    pid: 'PACKET_02',
    fname: 'resume.pdf',
    meta: ['type  :  portable document', 'format:  pdf / condensed'],
    href: resumePDF,       // swap once 1-page resume PDF exists
    download: 'Green_Resume.pdf',
    cmd: 'GET resume.pdf',
  },
]

export default function ResumeTerminal({ onBack }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showCards, setShowCards]       = useState(false)

  useEffect(() => {
    BOOT.forEach((_, i) => {
      setTimeout(() => setVisibleLines(n => n + 1), BOOT[i].delay)
    })
    setTimeout(() => setShowCards(true), 1300)
  }, [])

  return (
    <div id="rtx-layer">
      <div id="rtx-crt" />

      <div id="rtx-wrap">
        {/* Boot sequence */}
        <div id="rtx-boot">
          {BOOT.slice(0, visibleLines).map((l, i) => (
            <div key={i} className="rtx-boot-line">{l.text || '\u00a0'}</div>
          ))}
        </div>

        {/* Download cards */}
        <div id="rtx-cards" className={showCards ? 'show' : ''}>
          {FILES.map(f => (
            <div key={f.pid} className="rtx-card">
              <div className="rtx-card-top">
                <span className="rtx-pid">{f.pid}</span>
                <span className="rtx-ready">● READY</span>
              </div>
              <div className="rtx-fname">{f.fname}</div>
              <div className="rtx-meta">
                {f.meta.map((m, i) => <span key={i}>{m}</span>)}
              </div>
              <a className="rtx-btn" href={f.href} download={f.download}>
                <span className="rtx-btn-prefix">$</span>
                <span className="rtx-btn-cmd">{f.cmd}</span>
                <span className="rtx-btn-cursor" />
                <span className="rtx-btn-fill" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}
