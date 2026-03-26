import { useEffect, useRef } from 'react'
import { paintPlanet } from '../../utils/painters.js'
import { PLANET_DEFS } from '../../data/planets.js'
import resumePDF from '../../assets/images/Green_CV_2025.pdf'
import '../../styles/sections/ResumePods.css'

// Mars = the Resume planet in the solar system — CV gets it
const MARS  = PLANET_DEFS.find(p => p.id === 'mars')
// Venus = warm, complementary — 1-page resume
const VENUS = PLANET_DEFS.find(p => p.id === 'venus')

const PODS = [
  {
    id:       'cv',
    planet:   MARS,
    glow:     MARS.glowColor,
    label:    'Curriculum Vitae',
    filename: 'curriculum_vitae.pdf',
    desc:     'Full academic + work history',
    href:     resumePDF,
    download: 'Green_CV_2025.pdf',
  },
  {
    id:       'resume',
    planet:   VENUS,
    glow:     VENUS.glowColor,
    label:    'Résumé',
    filename: 'resume.pdf',
    desc:     'One-page condensed version',
    href:     resumePDF,        // swap once 1-page PDF exists
    download: 'Green_Resume.pdf',
  },
]

function PlanetCanvas({ planet, size = 130 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) paintPlanet(ref.current, size, planet.paintConfig)
  }, [planet, size])

  return <canvas ref={ref} width={size} height={size} className="rpod-canvas" />
}

export default function ResumePods({ onBack }) {
  return (
    <div id="rpod-layer">

      <div id="rpod-header">
        <div id="rpod-title">Transmit Files</div>
        <div id="rpod-sub">select a payload to download</div>
      </div>

      <div id="rpod-wrap">
        {PODS.map(pod => (
          <a
            key={pod.id}
            className="rpod-item"
            href={pod.href}
            download={pod.download}
            style={{ '--glow': pod.glow }}
          >
            <div className="rpod-orb-wrap">
              <PlanetCanvas planet={pod.planet} size={130} />
            </div>
            <div className="rpod-label">{pod.label}</div>
            <div className="rpod-desc">{pod.desc}</div>
            <div className="rpod-filename">{pod.filename}</div>
            <div className="rpod-cta">↓ download</div>
          </a>
        ))}
      </div>

      <button className="sec-back-btn" onClick={onBack}>← Solar System</button>
    </div>
  )
}
