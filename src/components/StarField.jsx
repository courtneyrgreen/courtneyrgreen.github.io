import { useMemo } from 'react'
import '../styles/StarField.css'

/*
  StarField — renders a static background of twinkling stars.

  280 star <div>s are created on mount with randomised:
    - size (1, 1.5, or 2 px — mostly small)
    - position (random across the full viewport)
    - animation duration, delay, and base opacity (via CSS custom properties)

  All animation is done in CSS (see StarField.css).
  useMemo ensures the star array is only generated once, not on every render.
*/
export default function StarField() {
  // Generate star data once and memoize — never needs to change
  const stars = useMemo(() => {
    return Array.from({ length: 280 }, (_, i) => {
      // Size distribution: 70% tiny, 15% small, 15% medium
      const sz = Math.random() < 0.7 ? 1 : Math.random() < 0.85 ? 1.5 : 2
      const op = 0.35 + Math.random() * 0.55

      return {
        key: i,
        style: {
          width:  `${sz}px`,
          height: `${sz}px`,
          left:   `${Math.random() * 100}%`,
          top:    `${Math.random() * 100}%`,
          // CSS custom properties consumed by the twinkle keyframe animation
          '--dur':   `${3 + Math.random() * 5}s`,
          '--delay': `-${Math.random() * 6}s`,  // negative = start mid-animation
          '--op':    op,
        },
      }
    })
  }, [])

  return (
    <div id="starfield">
      {stars.map(star => (
        <div key={star.key} className="star" style={star.style} />
      ))}
    </div>
  )
}
