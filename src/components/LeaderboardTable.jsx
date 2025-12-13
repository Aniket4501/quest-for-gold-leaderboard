import React from 'react'

/**
 * LeaderboardTable Component
 * 
 * Displays all participants using CSS Grid layout (ranks 4+).
 * Top 3 are shown in the podium section above.
 * 
 * Uses grid-based layout for guaranteed column alignment.
 * Wrapped in semi-opaque panel for text visibility.
 * 
 * Future Integration:
 * - Will receive real data from scoring service
 * - Will auto-sort by total coins (descending)
 * - Will highlight top performers
 * - Will trigger animations on score updates
 */
function LeaderboardTable({ participants = [] }) {
  if (!participants || participants.length === 0) {
    return null
  }

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-panel">
        {/* Header Row */}
        <div className="leaderboard-header leaderboard-row">
          <div className="leaderboard-rank">Rank</div>
          <div className="leaderboard-name">Explorer Name</div>
          <div className="leaderboard-coins">Total Gold Coins</div>
        </div>
        
        {/* Data Rows */}
        {participants.map((participant, index) => (
          <div key={participant.rank || index} className="leaderboard-row">
            <div className="leaderboard-rank">{participant.rank}</div>
            <div className="leaderboard-name">{participant.username}</div>
            <div className="leaderboard-coins">
              <span className="coin-icon-small">🪙</span>
              <span>{participant.coins}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LeaderboardTable

