/**
 * useSound Hook
 * 
 * Provides sound effect trigger functions.
 * These are prepared hooks - sounds will be fully wired
 * when data binding and state management are complete.
 * 
 * Future: These will be triggered by:
 * - CSV upload success
 * - Score updates
 * - Leader changes
 * - Auto-refresh cycles
 */

/**
 * Sound Manager
 * Handles loading and playing audio files
 */
class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true // Can be toggled by user preference
  }

  /**
   * Load a sound file
   * @param {string} name - Sound identifier
   * @param {string} path - Path to audio file
   */
  loadSound(name, path) {
    try {
      this.sounds[name] = new Audio(path)
      this.sounds[name].volume = 0.5 // Default volume
    } catch (error) {
      console.warn(`Failed to load sound: ${name}`, error)
    }
  }

  /**
   * Play a sound effect
   * @param {string} name - Sound identifier
   */
  play(name) {
    if (!this.enabled) return

    const sound = this.sounds[name]
    if (sound) {
      // Clone and play to allow overlapping sounds
      const soundClone = sound.cloneNode()
      soundClone.volume = sound.volume
      soundClone.play().catch(error => {
        console.warn(`Failed to play sound: ${name}`, error)
      })
    }
  }

  /**
   * Set sound enabled/disabled
   */
  setEnabled(enabled) {
    this.enabled = enabled
  }
}

// Global sound manager instance
const soundManager = new SoundManager()

// Load sound files (paths will be set when assets are added)
// TODO: Uncomment when sound assets are available
/*
soundManager.loadSound('coinDrop', '/sounds/coin-drop.mp3')
soundManager.loadSound('celebration', '/sounds/celebration.mp3')
soundManager.loadSound('leaderChange', '/sounds/leader-change.mp3')
*/

/**
 * Hook for coin drop sound
 * Will be triggered when coins are added/updated
 */
export function useCoinSound() {
  const playCoinDrop = () => {
    soundManager.play('coinDrop')
  }

  return { playCoinDrop }
}

/**
 * Hook for celebration sound
 * Will be triggered when leader changes or milestones reached
 */
export function useCelebrationSound() {
  const playCelebration = () => {
    soundManager.play('celebration')
  }

  return { playCelebration }
}

/**
 * Hook for leader change sound
 * Will be triggered when new leader is crowned
 */
export function useLeaderChangeSound() {
  const playLeaderChange = () => {
    soundManager.play('leaderChange')
  }

  return { playLeaderChange }
}

/**
 * Export sound manager for direct access if needed
 */
export { soundManager }

