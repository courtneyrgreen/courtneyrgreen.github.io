import { useEffect, useRef } from 'react'
import '../../styles/sections/Interests.css'

/*
  Interests — Uranus section.
  The human side of the portfolio — hobbies, curiosities, and the
  explanation for why this site is space-themed.

  Props:
    onBack {fn} — called when "← Solar System" is clicked
*/

const INTEREST_GROUPS = [
  {
    label: 'Craft & Making',
    icon: '✦',
    items: ['Embroidery', 'Crochet'],
    note: 'There\'s something meditative about turning thread into structure — not unlike modeling.',
  },
  {
    label: 'In the Kitchen',
    icon: '✦',
    items: ['Cooking', 'Baking'],
    note: 'Creativity meets intuition. A perfect balance of structure and spontaneity.',
  },
  {
    label: 'History & Lore',
    icon: '✦',
    items: ['European Monarchal History'],
    note: 'Power, lineage, consequence. The original political data science.',
  },
  {
    label: 'Narrative Games',
    icon: '✦',
    items: ['The Sims', 'Life is Strange', 'Detroit: Become Human'],
    note: 'Games where small choices ripple into vastly different outcomes — which is essentially causal inference.',
  },
  {
    label: 'The Stars',
    icon: '✦',
    items: ['Astronomy', 'Astrology & Zodiac'],
    note: 'The reason this portfolio looks the way it does. The cosmos has always felt like the right metaphor for a career still being written.',
  },
]

export default function Interests({ onBack }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => cardRef.current?.classList.add('visible'), 120)
    return () => {
      clearTimeout(t)
      if (cardRef.current) cardRef.current.classList.remove('visible')
    }
  }, [])

  return (
    <div id="int-layer">
      {/* Uranus teal glow */}
      <div id="int-glow" />

      <div id="int-card" ref={cardRef}>

        <div id="int-eyebrow">Uranus &nbsp;·&nbsp; Beyond the Data</div>
        <h1 id="int-title">Interests</h1>
        <div id="int-rule" />

        <p id="int-intro">
          A portfolio is a résumé with personality. Here's mine.
        </p>

        <div id="int-groups">
          {INTEREST_GROUPS.map(group => (
            <div key={group.label} className="int-group">
              <div className="int-group-header">
                <span className="int-icon">{group.icon}</span>
                <span className="int-group-label">{group.label}</span>
              </div>
              <div className="int-items">
                {group.items.map(item => (
                  <span key={item} className="int-item">{item}</span>
                ))}
              </div>
              <p className="int-note">{group.note}</p>
            </div>
          ))}
        </div>

      </div>

      <button className="sec-back-btn" onClick={onBack}>
        ← Solar System
      </button>
    </div>
  )
}
