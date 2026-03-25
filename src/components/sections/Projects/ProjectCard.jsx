import '../../../styles/sections/Projects.css'

/*
  ProjectCard — modal detail card for a selected project.

  Displays project title, description, tags, and a link.
  Sits above a dim backdrop. Clicking the backdrop or the Close
  button calls onClose.

  Props:
    project {Object|null} — the selected project from projects.js,
                            or null when no card should be shown
    onClose {fn}          — called to dismiss the card
*/
export default function ProjectCard({ project, onClose }) {
  const isOpen = !!project

  return (
    <>
      {/* Dim backdrop — click dismisses the card */}
      <div
        id="card-backdrop"
        className={isOpen ? 'open' : ''}
        onClick={onClose}
      />

      {/* Card — scales in when .open, scales out when closed */}
      <div id="project-card" className={isOpen ? 'open' : ''}>
        {isOpen && (
          <>
            <button id="project-card-close" onClick={onClose}>
              Close
            </button>

            {/* Preview image or placeholder */}
            <div id="project-card-img">
              {project.img
                ? <img src={project.img} alt={project.label} />
                : <div className="img-placeholder">{project.label}</div>
              }
            </div>

            <div id="project-card-body">
              {/* Eyebrow — type + year */}
              <div id="project-card-eyebrow">{project.eyebrow}</div>

              {/* Full project title */}
              <div id="project-card-title">{project.title}</div>

              {/* Description paragraph */}
              <div id="project-card-desc">{project.desc}</div>

              {/* Technology / method tags */}
              <div id="project-card-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="pc-tag">{tag}</span>
                ))}
              </div>

              {/* External link */}
              <a
                id="project-card-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel} →
              </a>
            </div>
          </>
        )}
      </div>
    </>
  )
}
