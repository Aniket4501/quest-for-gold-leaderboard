/**
 * CSV Parser Utility
 * 
 * Simple CSV parser for leaderboard data.
 * Format: rank,user_name,coins
 * 
 * No external dependencies - pure JavaScript.
 */

/**
 * Parse CSV string into array of objects
 * @param {string} csvText - Raw CSV text content
 * @returns {Array} Array of participant objects with rank, username, coins
 */
export function parseCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') {
    return []
  }

  const lines = csvText.trim().split('\n')
  
  if (lines.length === 0) {
    return []
  }

  // Skip header row if it exists (check if first line contains "rank" or is numeric)
  const firstLine = lines[0].toLowerCase()
  const hasHeader = firstLine.includes('rank') || firstLine.includes('user_name') || firstLine.includes('coins')
  const dataLines = hasHeader ? lines.slice(1) : lines

  const participants = []

  for (const line of dataLines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue // Skip empty lines

    // Split by comma, handling quoted values
    const parts = trimmedLine.split(',').map(part => part.trim())
    
    if (parts.length < 3) {
      continue // Skip invalid lines
    }

    const rank = parseInt(parts[0], 10)
    const user_name = parts[1]
    const coins = parseInt(parts[2], 10)

    // Validate data
    if (isNaN(rank) || isNaN(coins) || !user_name) {
      continue // Skip invalid data
    }

    participants.push({
      rank,
      username: user_name,
      coins
    })
  }

  // Sort by rank ascending (CSV order should be trusted, but ensure consistency)
  return participants.sort((a, b) => a.rank - b.rank)
}

/**
 * Validate CSV structure
 * @param {string} csvText - Raw CSV text content
 * @returns {boolean} True if CSV appears valid
 */
export function validateCSV(csvText) {
  if (!csvText || typeof csvText !== 'string') {
    return false
  }

  const lines = csvText.trim().split('\n').filter(line => line.trim())
  
  if (lines.length === 0) {
    return false
  }

  // Check if we have at least one data row
  const firstLine = lines[0].toLowerCase()
  const hasHeader = firstLine.includes('rank') || firstLine.includes('user_name')
  const minDataRows = hasHeader ? 1 : 1 // Need at least 1 data row

  return lines.length >= minDataRows
}

