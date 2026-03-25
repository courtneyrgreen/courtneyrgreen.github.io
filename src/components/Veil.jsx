import '../styles/Veil.css'

/*
  Veil — full-screen black overlay used during view transitions.

  When `active` is true the veil fades to opaque, hiding any visual
  discontinuity while views swap out. When false it fades back to
  transparent and is pointer-events:none.

  The CSS transition (0.55s) handles the fade animation.
*/
export default function Veil({ active }) {
  return <div id="veil" className={active ? 'active' : ''} />
}
