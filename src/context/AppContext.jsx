import { createContext, useContext, useState, useCallback } from 'react'

/*
  AppContext — global navigation state for the portfolio.

  Views (screens):
    'solar'      → animated solar system landing page (orbit mode)
    'lineup'     → planets arranged in a horizontal line (selection mode)
    'about'      → The Observatory  (About Me)
    'experience' → The Orrery       (Work History)
    'skills'     → The Spectrograph (Skills)
    'resume'     → The Transmission (Resume / CV)
    'fieldnotes' → Field Notes      (Personal reflections)
    'projects'   → Project Cosmos   (Research & Projects)

  Navigation flows:
    solar   --[click Sun]--------> lineup
    lineup  --[click planet]-----> section
    lineup  --[back button]------> solar
    section --[back button]------> solar
*/

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // The currently visible screen
  const [view, setView] = useState('solar')

  // Controls the full-screen dark veil overlay used between transitions
  const [veilActive, setVeilActive] = useState(false)

  // True while the solar system is animating its zoom-out (travelling to another view)
  const [solarZooming, setSolarZooming] = useState(false)

  // True while the solar system is animating its zoom-in (returning from another view)
  const [solarEntering, setSolarEntering] = useState(false)

  /* ── enterPortfolio ──────────────────────────────────────────────────
     Triggered by clicking the Sun in orbit mode.
     Switches directly to lineup mode — solar system stays visible,
     planets animate into a horizontal line.
  ─────────────────────────────────────────────────────────────────── */
  const enterPortfolio = useCallback(() => {
    setView('lineup')
  }, [])

  /* ── goToSection ─────────────────────────────────────────────────────
     Triggered by clicking a planet in lineup mode.
     Veil fades to black → section appears.
  ─────────────────────────────────────────────────────────────────── */
  const goToSection = useCallback((id) => {
    if (!id) return
    setVeilActive(true)
    setTimeout(() => {
      setView(id)
      setVeilActive(false)
    }, 500)
  }, [])

  /* ── openSection ─────────────────────────────────────────────────────
     Triggered by clicking a constellation in cosmos view.
     Shorter transition — no solar zoom needed, just a veil swap.
  ─────────────────────────────────────────────────────────────────── */
  const openSection = useCallback((id) => {
    setVeilActive(true)
    setTimeout(() => {
      setView(id)
      setVeilActive(false)
    }, 500)
  }, [])

  /* ── returnToOrbit ───────────────────────────────────────────────────
     Triggered by the back affordance in lineup mode.
     Veil covers the lineup→orbit layout snap, then reveals orbit mode.
  ─────────────────────────────────────────────────────────────────── */
  const returnToOrbit = useCallback(() => {
    setVeilActive(true)
    setTimeout(() => {
      setView('solar')
      setSolarZooming(false)
      setVeilActive(false)
    }, 400)
  }, [])

  /* ── returnToSolar ───────────────────────────────────────────────────
     Legacy — kept in case Cosmos is ever re-enabled.
  ─────────────────────────────────────────────────────────────────── */
  const returnToSolar = useCallback(() => {
    setVeilActive(true)
    setTimeout(() => {
      setView('solar')
      setSolarZooming(false)
      setSolarEntering(true)
      setVeilActive(false)
    }, 500)
    setTimeout(() => setSolarEntering(false), 1600)
  }, [])

  /* ── returnFromSection ───────────────────────────────────────────────
     Triggered by the back button in any section layer.
     Veil covers the snap, then reveals the lineup (planets in a row).
  ─────────────────────────────────────────────────────────────────── */
  const returnFromSection = useCallback(() => {
    setVeilActive(true)
    setTimeout(() => {
      setView('lineup')
      setVeilActive(false)
    }, 420)
  }, [])

  return (
    <AppContext.Provider
      value={{
        view,
        veilActive,
        solarZooming,
        solarEntering,
        enterPortfolio,
        goToSection,
        openSection,
        returnToOrbit,
        returnToSolar,
        returnFromSection,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom hook — consume navigation context from any component
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
