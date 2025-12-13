import React from 'react'

/**
 * PodiumSlot Component
 * 
 * Individual podium position for top-3 participants.
 * 
 * Visual Treatment:
 * - Rank 1: Gold, center, tallest
 * - Rank 2: Silver, left
 * - Rank 3: Bronze, right
 * 
 * Future Integration:
 * - Coin count updates will trigger coin animation
 * - Rank changes will trigger celebration effects
 * - Sound effects will play on updates
 */
function PodiumSlot({ rank, username, coins }) {
  const getPodiumClass = () => {
    switch (rank) {
      case 1:
        return 'podium-gold'
      case 2:
        return 'podium-silver'
      case 3:
        return 'podium-bronze'
      default:
        return ''
    }
  }

  const getPodiumBaseClass = () => {
    switch (rank) {
      case 1:
        return 'podium-base-gold'
      case 2:
        return 'podium-base-silver'
      case 3:
        return 'podium-base-bronze'
      default:
        return ''
    }
  }

  return (
    <div 
      className={`podium-slot ${getPodiumClass()}`}
      data-rank={rank}
    >
      <div className={`podium-card ${getPodiumBaseClass()}`}>
        <div className="podium-rank">{rank}</div>
        <div className="podium-name">{username}</div>
        <div className="podium-coins">
          <span className="coin-icon">🪙</span>
          <span className="coin-count">{coins}</span>
        </div>
      </div>
    </div>
  )
}

export default PodiumSlot

