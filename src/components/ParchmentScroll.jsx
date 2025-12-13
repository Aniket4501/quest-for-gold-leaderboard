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
      style={{
        backgroundImage: 'url(/assets/scroll.png)'
      }}
    >
      {/* Decorative Elements (compass, hourglass) */}
      <DecorativeElements />
      
      {/* Header Section */}
      <Header />
      
      {/* Top-3 Podium Section */}
      <Podium podiumData={podiumData} />
      
      {/* Leader of the Day Badge */}
      <LeaderBadge leader={leader} />
      
      {/* Leaderboard Table Section */}
      <LeaderboardTable participants={leaderboardData} />
      
      {/* Gold Coins Section */}
      <GoldCoins />
      
      {/* Future: CSV Upload Area (admin mode) will be added here */}
    </div>
  )
}

export default ParchmentScroll

