import React, { useEffect } from 'react'
import BackgroundLayers from './components/BackgroundLayers'
import ParchmentScroll from './components/ParchmentScroll'

/**
 * Main App Component
 * 
 * This is the root component that orchestrates the layered visual structure.
 * 
 * Future Integration Points:
 * - CSV upload state management will be added here
 * - Leaderboard data state will be managed here
 * - Auto-refresh logic will be wired here
 */
function App() {
  // Sound effect on UI load
  useEffect(() => {
    // Play coin sound on load (safe for browser autoplay rules)
    const playCoinSound = () => {
      try {
        const coinSound = new Audio('/assets/coin.mp3')
        coinSound.volume = 0.4
        coinSound.play().catch(() => {
          // Silently fail if autoplay is blocked (browser security)
        })
      } catch (error) {
        // Silently fail if audio file doesn't exist or can't be loaded
      }
    }

    // Small delay to ensure UI is ready
    const timer = setTimeout(playCoinSound, 500)
    return () => clearTimeout(timer)
  }, [])
  // Dummy data for UI-only phase
  // TODO: Replace with real data from CSV parsing in future phase
  const dummyPodiumData = [
    { rank: 1, username: 'Explorer One', coins: 62 },
    { rank: 2, username: 'Explorer Two', coins: 45 },
    { rank: 3, username: 'Explorer Three', coins: 38 }
  ]

  // Dummy data for leaderboard table (ranks 4+)
  const dummyLeaderboardData = [
    { rank: 4, username: 'Adventurer Four', coins: 32 },
    { rank: 5, username: 'Adventurer Five', coins: 28 },
    { rank: 6, username: 'Adventurer Six', coins: 25 },
    { rank: 7, username: 'Adventurer Seven', coins: 22 },
    { rank: 8, username: 'Adventurer Eight', coins: 18 },
    { rank: 9, username: 'Adventurer Nine', coins: 15 },
    { rank: 10, username: 'Adventurer Ten', coins: 12 }
  ]

  const dummyLeader = dummyPodiumData[0] // Rank 1 is leader

  return (
    <div className="app-container">
      {/* Layer 1: Background with parchment texture */}
      <BackgroundLayers />
      
      {/* Layer 2: Central scroll with all content */}
      <ParchmentScroll 
        podiumData={dummyPodiumData}
        leaderboardData={dummyLeaderboardData}
        leader={dummyLeader}
      />
      
      {/* Future: CSV Upload Modal will be rendered here conditionally */}
      {/* Future: Admin controls will be added here */}
    </div>
  )
}

export default App

