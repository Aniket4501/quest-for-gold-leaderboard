import React from 'react'
import Header from './Header'
import Podium from './Podium'
import LeaderBadge from './LeaderBadge'
import GoldCoins from './GoldCoins'
import LeaderboardTable from './LeaderboardTable'
import DecorativeElements from './DecorativeElements'

/**
 * ParchmentScroll Component
 * 
 * Central scroll container that houses all visible UI content.
 * This is the main content area centered on screen.
 * 
 * Future Integration Points:
 * - CSV upload trigger will be added (admin mode)
 * - Auto-refresh indicator will be added
 */
function ParchmentScroll({ podiumData, leaderboardData, leader }) {
  return (
    <div 
      className="parchment-scroll"
    >
      {/* Decorative Elements (compass, hourglass) */}
      <DecorativeElements />
      
      {/* Section A: Top Section (Fixed height by content) */}
      <div className="parchment-top-section">
        <Header />
        <Podium podiumData={podiumData} leader={leader} />
      </div>
      
      {/* Section B: Middle Section (Fixed height by content) - Empty now, badge is overlay */}
      <div className="parchment-middle-section">
      </div>
      
      {/* Section C: Bottom Section (Flexible & Scrollable) */}
      <div className="parchment-bottom-section">
        <LeaderboardTable participants={leaderboardData} />
        <GoldCoins />
      </div>
    </div>
  )
}

export default ParchmentScroll

