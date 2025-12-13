import React, { useEffect, useRef } from 'react'
import { useCoinAnimation } from '../hooks/useAnimations'

/**
 * GoldCoins Component
 * 
 * Displays coin pile image near bottom center of scroll.
 * Coins should slightly bounce or shimmer to feel "alive".
 * 
 * Future Integration:
 * - Will update coin count display
 * - Will trigger coin drop sound on updates
 * - Will animate when coins are added
 */
function GoldCoins() {
  const coinsRef = useRef(null)
  const { triggerCoinShimmer } = useCoinAnimation()

  useEffect(() => {
    // Trigger shimmer animation loop
    if (coinsRef.current) {
      triggerCoinShimmer(coinsRef.current)
    }
  }, [triggerCoinShimmer])

  return (
    <div className="coin-pile-container">
      <div 
        className="coin-pile"
        ref={coinsRef}
        style={{
          backgroundImage: 'url(/assets/coins.png)'
        }}
      >
        {/* Fallback emoji if image not available - shown via CSS if image fails */}
      </div>
    </div>
  )
}

export default GoldCoins

