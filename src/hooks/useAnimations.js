import { useCallback } from 'react'

/**
 * useAnimations Hook
 * 
 * Provides animation trigger functions for UI elements.
 * These are prepared hooks - animations will be fully implemented
 * when data binding is complete.
 * 
 * Future: These will be triggered by state changes from:
 * - CSV upload completion
 * - Score recalculations
 * - Auto-refresh updates
 */

/**
 * Podium Entry Animation
 * Triggers rise/scale-in animation for podium slots
 */
export function usePodiumAnimation() {
  const triggerPodiumEntry = useCallback((container) => {
    if (!container) return

    const slots = container.querySelectorAll('.podium-slot')
    
    slots.forEach((slot, index) => {
      // Add animation class with staggered delay
      setTimeout(() => {
        slot.classList.add('animate-in')
      }, index * 200) // Stagger by 200ms
    })
  }, [])

  return { triggerPodiumEntry }
}

/**
 * Badge Glow Animation
 * Triggers pulse animation for leader badge
 */
export function useBadgeAnimation() {
  const triggerBadgeGlow = useCallback((badge) => {
    if (!badge) return

    // Add glow pulse class
    badge.classList.add('glow-pulse')
    
    // Remove class after animation completes (for re-triggering)
    setTimeout(() => {
      badge.classList.remove('glow-pulse')
    }, 2000)
  }, [])

  return { triggerBadgeGlow }
}

/**
 * Coin Shimmer Animation
 * Triggers bounce/shimmer loop for coin pile
 */
export function useCoinAnimation() {
  const triggerCoinShimmer = useCallback((coinElement) => {
    if (!coinElement) return

    // Add shimmer class for continuous loop
    coinElement.classList.add('shimmer-loop')
  }, [])

  const triggerCoinFlip = useCallback((coinElement) => {
    if (!coinElement) return

    // Add flip animation for individual coin updates
    coinElement.classList.add('coin-flip')
    
    setTimeout(() => {
      coinElement.classList.remove('coin-flip')
    }, 600)
  }, [])

  return { 
    triggerCoinShimmer,
    triggerCoinFlip
  }
}

