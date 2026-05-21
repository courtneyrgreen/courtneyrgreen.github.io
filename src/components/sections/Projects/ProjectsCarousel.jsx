import { useRef, useState, useEffect } from 'react'
import { PROJECTS } from '../../../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import '../../../styles/sections/Projects.css'

export default function ProjectsCarousel({ onBack }) {
  const [openProject, setOpenProject] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.idx))
          }
        })
      },
      { root: track, threshold: 0.6 }
    )

    Array.from(track.children).forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [])

  return (
    <div id="projects-cosmos">
      <div className="pneb pn1" />
      <div className="pneb pn2" />
      <div className="pneb pn3" />

      <div id="pcar-hdr">
        <div id="pcar-eyebrow">Jupiter</div>
        <h1 id="pcar-title">Projects</h1>
        <p id="pcar-hint">swipe to explore</p>
      </div>

      <div id="pcar-track" ref={trackRef}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="pcar-card"
            data-idx={i}
            onClick={() => setOpenProject(project)}
          >
            <div
              className={`pcar-img${!(project.img || project.imgs) ? ' pcar-img-empty' : ''}`}
              style={project.imgBg ? { background: project.imgBg } : {}}
            >
              {(project.img || project.imgs) && (
                <img
                  src={project.img || project.imgs[0]}
                  alt={project.label}
                  style={{
                    objectFit: project.imgFit || 'cover',
                    objectPosition: project.imgPosition || 'center',
                  }}
                />
              )}
            </div>

            <div className="pcar-body">
              <div className="pcar-badge">{project.eyebrow}</div>
              <div className="pcar-label">{project.label}</div>
              <p className="pcar-desc">
                {Array.isArray(project.desc) ? project.desc[0] : project.desc}
              </p>
              <div className="pcar-tags">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="pcar-tag">{tag}</span>
                ))}
              </div>
              <div className="pcar-tap-hint">tap to open full details ↗</div>
            </div>
          </div>
        ))}
      </div>

      <div id="pcar-dots">
        {PROJECTS.map((_, i) => (
          <div key={i} className={`pcar-dot${i === activeIndex ? ' active' : ''}`} />
        ))}
      </div>

      <button id="projects-back" onClick={onBack}>← Solar System</button>

      <ProjectCard project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  )
}
