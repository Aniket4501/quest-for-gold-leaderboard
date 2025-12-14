import React, { useState, useEffect } from 'react'
import BackgroundLayers from './components/BackgroundLayers'
import ParchmentScroll from './components/ParchmentScroll'
import CSVUploader from './components/CSVUploader'

/**
 * Main App Component
 * 
 * Manages leaderboard data state and CSV upload functionality.
 */
function App() {
  // State management
  const [leaderboardData, setLeaderboardData] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('quest-for-gold-leaderboard-data')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeaderboardData(parsed)
        }
      }
    } catch (error) {
      // Silently fail if localStorage data is corrupted
    }
  }, [])

  // Keyboard shortcut: Ctrl+Shift+U to toggle admin panel (Windows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'U') {
        e.preventDefault()
        setShowAdminPanel((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Sound effect on UI load
  useEffect(() => {
    const playCoinSound = () => {
      try {
        const coinSound = new Audio('/assets/coin.mp3')
        coinSound.volume = 0.4
        coinSound.play().catch(() => {
          // Silently fail if autoplay is blocked
        })
      } catch (error) {
        // Silently fail if audio file doesn't exist
      }
    }

    const timer = setTimeout(playCoinSound, 500)
    return () => clearTimeout(timer)
  }, [])

  // Default dummy data (fallback if no CSV uploaded)
  const defaultPodiumData = [
    { rank: 1, username: 'Explorer One', coins: 62 },
    { rank: 2, username: 'Explorer Two', coins: 45 },
    { rank: 3, username: 'Explorer Three', coins: 38 }
  ]

  const defaultLeaderboardData = [
    { rank: 4, username: 'Adventurer Four', coins: 32 },
    { rank: 5, username: 'Adventurer Five', coins: 28 },
    { rank: 6, username: 'Adventurer Six', coins: 25 },
    { rank: 7, username: 'Adventurer Seven', coins: 22 },
    { rank: 8, username: 'Adventurer Eight', coins: 18 },
    { rank: 9, username: 'Adventurer Nine', coins: 15 },
    { rank: 10, username: 'Adventurer Ten', coins: 12 }
  ]

  // Process leaderboard data: split into podium (ranks 1-3) and table (rank 4+)
  const podiumData = leaderboardData.length > 0
    ? leaderboardData.filter(p => p.rank >= 1 && p.rank <= 3).sort((a, b) => a.rank - b.rank)
    : defaultPodiumData

  const tableData = leaderboardData.length > 0
    ? leaderboardData.filter(p => p.rank >= 4).sort((a, b) => a.rank - b.rank)
    : defaultLeaderboardData

  // Leader is always rank 1
  const leader = podiumData.find(p => p.rank === 1) || podiumData[0]

  // Handle CSV upload
  const handleDataUploaded = (participants) => {
    setLeaderboardData(participants)
    // Persist to localStorage
    try {
      localStorage.setItem('quest-for-gold-leaderboard-data', JSON.stringify(participants))
    } catch (error) {
      // Silently fail if localStorage is full or unavailable
    }
  }

  // Handle admin lock (hide admin panel)
  const handleAdminLock = () => {
    setShowAdminPanel(false)
    setIsAuthenticated(false)
  }

  // Optional: Auto-refresh every 5 seconds (re-render with existing data)
  useEffect(() => {
    if (leaderboardData.length === 0) return // Only refresh if we have data

    const interval = setInterval(() => {
      // Re-render with existing data (no recalculation, just refresh)
      // This triggers a re-render to ensure UI stays fresh
      setLeaderboardData(prev => [...prev])
    }, 5000)

    return () => clearInterval(interval)
  }, [leaderboardData.length]) // Only depend on length, not the array itself

  return (
    <div className="app-container">
      {/* Layer 1: Background with parchment texture */}
      <BackgroundLayers />
      
      {/* Layer 2: Central scroll with all content */}
      <ParchmentScroll 
        podiumData={podiumData}
        leaderboardData={tableData}
        leader={leader}
      />
      
      {/* CSV Uploader - Hidden by default, toggled via Ctrl+Shift+U */}
      {showAdminPanel && (
        <CSVUploader
          onDataUploaded={handleDataUploaded}
          isAuthenticated={isAuthenticated}
          onAuthenticate={setIsAuthenticated}
          onLock={handleAdminLock}
        />
      )}
    </div>
  )
}

export default App

