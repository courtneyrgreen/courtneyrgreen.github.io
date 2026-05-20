import { useEffect, useRef } from 'react'
import '../../styles/sections/Interests.css'

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
          Cooking is one of my favorite ways to unwind. I love trying out
          new recipes and exploring different flavors, though I usually end
          up following my instincts and tweaking things as I go. For me,
          there's nothing better than making a great meal for the people I
          love. I'm currently putting together a digital cookbook to keep
          track of everything I'm creating.
        </p>

        <a
          id="int-patch"
          href="https://www.notion.so/3579fac6e1ca81e2ae4dc8eae47d3f74"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg id="int-patch-svg" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 32 Q18 56 36 56 Q54 56 54 32 Z"
              fill="rgba(210,100,60,0.10)" stroke="rgba(210,100,60,0.60)" strokeWidth="1.4"/>
            <rect x="15" y="28" width="42" height="5" rx="2"
              fill="rgba(210,100,60,0.10)" stroke="rgba(210,100,60,0.55)" strokeWidth="1.4"/>
            <path d="M15 31 Q8 31 8 36 Q8 41 15 41"
              stroke="rgba(210,100,60,0.50)" strokeWidth="1.4" fill="none"/>
            <path d="M57 31 Q64 31 64 36 Q64 41 57 41"
              stroke="rgba(210,100,60,0.50)" strokeWidth="1.4" fill="none"/>
            <path d="M20 28 Q36 22 52 28"
              stroke="rgba(210,100,60,0.45)" strokeWidth="1.3" fill="none"/>
            <circle cx="36" cy="21" r="3"
              fill="none" stroke="rgba(210,100,60,0.45)" strokeWidth="1.2"/>
            <path d="M28 16 Q26 10 28 4"
              stroke="rgba(210,100,60,0.28)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M36 14 Q34 8 36 2"
              stroke="rgba(210,100,60,0.22)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <path d="M44 16 Q42 10 44 4"
              stroke="rgba(210,100,60,0.28)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </svg>
        </a>

        <div id="int-patch-hint">Court's Cookbook &nbsp;↗</div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}
