import '../../../styles/sections/Projects.css'

/*
  ProjectCard — modal detail card for a selected project.

  Props:
    project {Object|null} — the selected project from projects.js, or null
    onClose {fn}          — called to dismiss the card
*/
export default function ProjectCard({ project, onClose }) {
  const isOpen = !!project

  return (
    <>
      <div
        id="card-backdrop"
        className={isOpen ? 'open' : ''}
        onClick={onClose}
      />

      <div id="project-card" className={isOpen ? 'open' : ''}>
        {isOpen && (
          <>
            <button id="project-card-close" onClick={onClose}>
              Close
            </button>

            <div id="project-card-img">
              {project.imgs
                ? (
                  <div className="pc-img-grid" style={{ '--pc-img-count': project.imgs.length }}>
                    {project.imgs.map((src, i) => (
                      <img key={i} src={src} alt={`${project.label} figure ${i + 1}`} />
                    ))}
                  </div>
                )
                : project.img
                  ? <img src={project.img} alt={project.label} />
                  : <div className="img-placeholder">{project.label}</div>
              }
            </div>

            <div id="project-card-body">
              <div id="project-card-eyebrow">
                {project.eyebrow}
                {project.wip && <span className="pc-wip-badge">In Progress</span>}
              </div>

              <div id="project-card-title">{project.title}</div>

              {project.award && (
                <div className="pc-award"><span className="pc-award-star">✦</span> {project.award}</div>
              )}

              <div id="project-card-desc">
                {Array.isArray(project.desc)
                  ? (
                    <ul className="pc-desc-bullets">
                      {project.desc.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )
                  : project.desc
                }
              </div>

              <div id="project-card-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="pc-tag">{tag}</span>
                ))}
              </div>

              {!project.wip && (project.link || project.link2) && (
                <div className="pc-links">
                  {project.link2 && (
                    <a
                      className="project-card-github"
                      href={project.link2}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Repository"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>
                  )}
                  {project.link && (
                    <a
                      className="project-card-link"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.linkLabel} →
                    </a>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
