import React, { useEffect, useRef } from 'react'
import { useBadgeAnimation } from '../hooks/useAnimations'

/**
 * LeaderBadge Component
 * 
 * Displays "🔥 Leader of the Day" badge prominently near Rank 1.
 * Badge should glow subtly and look celebratory, not noisy.
 * 
 * Future Integration:
 * - Will update when leader changes
 * - Will trigger celebration sound on leader change
 * - Will animate when new leader is crowned
 */
function LeaderBadge({ leader }) {
  const badgeRef = useRef(null)
  const { triggerBadgeGlow } = useBadgeAnimation()

  useEffect(() => {
    // Trigger glow animation on mount and when leader changes
    if (badgeRef.current && leader) {
      triggerBadgeGlow(badgeRef.current)
      
      // Optional celebration sound for Leader of the Day
      try {
        const celebrationSound = new Audio('/assets/celebration.mp3')
        celebrationSound.volume = 0.3
        celebrationSound.play().catch(() => {
          // Silently fail if autoplay is blocked
        })
      } catch (error) {
        // Silently fail if audio file doesn't exist
      }
    }
  }, [leader, triggerBadgeGlow])

  if (!leader) {
    return null
  }

  return (
    <div className="leader-badge-container">
      <div 
        className="leader-badge"
        ref={badgeRef}
      >
        <span className="badge-icon">🔥</span>
        <span className="badge-text">Leader of the Day</span>
      </div>
    </div>
  )
}

export default LeaderBadge

