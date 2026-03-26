import { useState } from 'react'
import ResumeTerminal from './ResumeTerminal.jsx'
import ResumePods     from './ResumePods.jsx'
import '../../styles/sections/Resume.css'

/*
  Resume — preview wrapper.
  Toggle between Terminal and Pods designs to compare.
  Remove the toggle + picker once a design is chosen.
*/
export default function Resume({ onBack }) {
  const [mode, setMode] = useState('terminal')

  return (
    <>
      {/* ── A/B toggle — remove once design is picked ── */}
      <div id="resume-picker">
        <button
          className={mode === 'terminal' ? 'active' : ''}
          onClick={() => setMode('terminal')}
        >
          Terminal
        </button>
        <button
          className={mode === 'pods' ? 'active' : ''}
          onClick={() => setMode('pods')}
        >
          Pods
        </button>
      </div>

      {mode === 'terminal' && <ResumeTerminal onBack={onBack} />}
      {mode === 'pods'     && <ResumePods     onBack={onBack} />}
    </>
  )
}
