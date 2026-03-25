import { AppProvider, useApp } from './context/AppContext.jsx'
import StarField from './components/StarField.jsx'
import Veil from './components/Veil.jsx'
import SolarSystem from './components/SolarSystem/SolarSystem.jsx'
import About from './components/sections/About.jsx'
import Experience from './components/sections/Experience.jsx'
import Skills from './components/sections/Skills.jsx'
import Resume from './components/sections/Resume.jsx'
import FieldNotes from './components/sections/FieldNotes.jsx'
import Projects from './components/sections/Projects/Projects.jsx'
import Contact from './components/sections/Contact.jsx'

/*
  AppInner — renders whichever view is currently active.
  Must be a child of AppProvider so it can call useApp().
*/
function AppInner() {
  const {
    view,
    veilActive,
    solarZooming,
    solarEntering,
    enterPortfolio,
    goToSection,
    returnToOrbit,
    returnFromSection,
  } = useApp()

  // Solar system stays mounted in orbit mode, lineup mode, and during any zoom-out.
  const solarVisible = view === 'solar' || view === 'lineup' || solarZooming

  // SolarSystem renders in 'lineup' layout when the lineup view is active.
  const solarMode = view === 'lineup' ? 'lineup' : 'orbit'

  // Sun click: enter lineup from orbit, or return to orbit from lineup.
  const handleSunClick = view === 'lineup' ? returnToOrbit : enterPortfolio

  return (
    <>
      {/* ── Background star field (always present) ── */}
      <StarField />

      {/* ── Name + role shown only on the orbit landing screen ── */}
      {view === 'solar' && (
        <div id="name-header">
          <h1>Courtney Green</h1>
          <p>Data Scientist &amp; Researcher</p>
        </div>
      )}

      {/* ── Hint text: orbit screen only ── */}
      {view === 'solar' && (
        <div id="solar-hint">
          click the sun to explore
        </div>
      )}

      {/* ── Back affordance in lineup mode ── */}
      {view === 'lineup' && (
        <button id="lineup-back" onClick={returnToOrbit}>
          ← solar system
        </button>
      )}

      {/* ── Solar system — orbit or lineup mode ── */}
      <SolarSystem
        visible={solarVisible}
        zooming={solarZooming}
        entering={solarEntering}
        mode={solarMode}
        onSunClick={handleSunClick}
        onPlanetClick={goToSection}
      />

      {/* ── Section layers — each is a full-screen immersive view ── */}
      {view === 'about'      && <About      onBack={returnFromSection} />}
      {view === 'experience' && <Experience onBack={returnFromSection} />}
      {view === 'skills'     && <Skills     onBack={returnFromSection} />}
      {view === 'resume'     && <Resume     onBack={returnFromSection} />}
      {view === 'fieldnotes' && <FieldNotes onBack={returnFromSection} />}
      {view === 'projects'   && <Projects   onBack={returnFromSection} />}
      {view === 'contact'    && <Contact    onBack={returnFromSection} />}

      {/* ── Transition veil — full-screen black overlay during navigation ── */}
      <Veil active={veilActive} />
    </>
  )
}

/*
  App — root component.
  Wraps AppInner in AppProvider so all children share navigation context.
*/
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
