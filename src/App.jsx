// ── Toggle this to show/hide the maintenance page ──────────────────
const MAINTENANCE = true

import { AppProvider, useApp } from './context/AppContext.jsx'
import StarField from './components/StarField.jsx'
import Veil from './components/Veil.jsx'
import SolarSystem from './components/SolarSystem/SolarSystem.jsx'
import Objective from './components/sections/Objective.jsx'
import About from './components/sections/About.jsx'
import Experience from './components/sections/Experience.jsx'
import Resume from './components/sections/Resume.jsx'
import Projects from './components/sections/Projects/Projects.jsx'
import Skills from './components/sections/Skills.jsx'
import Interests from './components/sections/Interests.jsx'
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
          <p>data scientist, policy analyst, and digital storyteller</p>
        </div>
      )}

      {/* ── Hint text: orbit screen only ── */}
      {view === 'solar' && (
        <div id="solar-hint">
          click the sun to explore
        </div>
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
      {view === 'objective'  && <Objective  onBack={returnFromSection} />}
      {view === 'about'      && <About      onBack={returnFromSection} />}
      {view === 'experience' && <Experience onBack={returnFromSection} />}
      {view === 'resume'     && <Resume     onBack={returnFromSection} />}
      {view === 'projects'   && <Projects   onBack={returnFromSection} />}
      {view === 'skills'     && <Skills     onBack={returnFromSection} />}
      {view === 'interests'  && <Interests  onBack={returnFromSection} />}
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
function Maintenance() {
  return (
    <>
      <StarField />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '18px', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(11px, 1.6vmin, 14px)',
          letterSpacing: '0.45em',
          color: 'rgba(200,168,80,0.55)',
          textTransform: 'uppercase',
        }}>
          Courtney Green
        </div>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(18px, 3vmin, 28px)',
          letterSpacing: '0.3em',
          color: 'rgba(232,240,255,0.88)',
          textTransform: 'uppercase',
        }}>
          Coming Soon
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(12px, 1.8vmin, 16px)',
          letterSpacing: '0.12em',
          color: 'rgba(138,143,168,0.55)',
        }}>
          site under construction · launching soon
        </div>
      </div>
    </>
  )
}

export default function App() {
  if (MAINTENANCE) return <Maintenance />
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
