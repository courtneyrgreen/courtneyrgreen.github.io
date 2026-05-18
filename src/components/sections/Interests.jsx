import { useEffect, useRef } from 'react'
import '../../styles/sections/Interests.css'

function Sprig() {
  return (
    <svg className="int-sprig" viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* stem */}
      <path d="M24 78 Q22 55 24 10" stroke="rgba(160,120,60,0.45)" strokeWidth="1.2" fill="none"/>
      {/* leaves */}
      <path d="M24 62 Q12 54 10 44 Q18 46 24 62Z" fill="rgba(160,120,60,0.18)" stroke="rgba(160,120,60,0.35)" strokeWidth="0.8"/>
      <path d="M24 62 Q36 54 38 44 Q30 46 24 62Z" fill="rgba(160,120,60,0.18)" stroke="rgba(160,120,60,0.35)" strokeWidth="0.8"/>
      <path d="M24 44 Q13 36 12 26 Q20 29 24 44Z" fill="rgba(160,120,60,0.15)" stroke="rgba(160,120,60,0.3)" strokeWidth="0.8"/>
      <path d="M24 44 Q35 36 36 26 Q28 29 24 44Z" fill="rgba(160,120,60,0.15)" stroke="rgba(160,120,60,0.3)" strokeWidth="0.8"/>
      <path d="M24 26 Q16 18 17 10 Q23 14 24 26Z" fill="rgba(160,120,60,0.12)" stroke="rgba(160,120,60,0.25)" strokeWidth="0.8"/>
      <path d="M24 26 Q32 18 31 10 Q25 14 24 26Z" fill="rgba(160,120,60,0.12)" stroke="rgba(160,120,60,0.25)" strokeWidth="0.8"/>
    </svg>
  )
}

export default function Interests({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="int-layer">
      <div id="int-glow" />

      <div id="int-card" ref={cardRef}>

        <div id="int-eyebrow">Uranus &nbsp;·&nbsp; Off the Clock</div>
        <h1 id="int-title">The Kitchen</h1>

        <p id="int-statement">
          Outside of work, I'm usually cooking. Adjusting recipes,
          following instincts, making food I'm excited to share.
        </p>

        <a
          id="int-book"
          href="https://www.notion.so/3579fac6e1ca81e2ae4dc8eae47d3f74"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Left binding strip */}
          <div id="int-book-spine" />

          <div id="int-book-body">
            <div id="int-book-top">
              <div id="int-book-kicker">Personal Collection</div>
              <Sprig />
            </div>

            <div id="int-book-title">Court's Cookbook</div>

            <div id="int-book-divider">
              <span /><span className="int-divider-dot" /><span />
            </div>

            <div id="int-book-sub">Recipes &nbsp;·&nbsp; Collections &nbsp;·&nbsp; Annotations</div>

            <div id="int-book-footer">
              <span id="int-book-open">Open in Notion &nbsp;↗</span>
            </div>
          </div>
        </a>

      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}
