import React, { useState, useRef } from 'react'
import { parseCSV, validateCSV } from '../utils/csvParser'

/**
 * CSVUploader Component
 * 
 * Simple CSV upload with optional password protection.
 * Parses CSV and passes data to parent component.
 * 
 * CSV Format: rank,user_name,coins
 */
function CSVUploader({ onDataUploaded, isAuthenticated, onAuthenticate, onLock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Password protection (optional)
  const ADMIN_PASSWORD = 'admin123' // Simple frontend password

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onAuthenticate(true)
      setPassword('')
      setError('')
      // Store in localStorage for persistence
      localStorage.setItem('quest-for-gold-authenticated', 'true')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      const text = await file.text()
      
      // Validate CSV structure
      if (!validateCSV(text)) {
        setError('Invalid CSV format. Expected: rank,user_name,coins')
        setIsUploading(false)
        return
      }

      // Parse CSV
      const participants = parseCSV(text)
      
      if (participants.length === 0) {
        setError('No valid data found in CSV')
        setIsUploading(false)
        return
      }

      // Play coin sound on successful upload
      try {
        const coinSound = new Audio('/assets/coin.mp3')
        coinSound.volume = 0.4
        coinSound.play().catch(() => {
          // Silently fail if autoplay is blocked
        })
      } catch (audioError) {
        // Silently fail if audio file doesn't exist
      }

      // Pass data to parent
      onDataUploaded(participants)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setError('')
    } catch (err) {
      setError('Error reading file: ' + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  // Note: We do NOT auto-authenticate from localStorage when panel opens
  // Admin must enter password each time (or use keyboard shortcut to toggle panel)

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="csv-uploader-password">
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="password-input"
            autoFocus
          />
          <button type="submit" className="password-submit">
            Unlock
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    )
  }

  // Show upload form if authenticated
  return (
    <div className="csv-uploader">
      <div className="upload-controls">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="file-input"
          id="csv-file-input"
        />
        <label 
          htmlFor="csv-file-input" 
          className={`file-label ${isUploading ? 'disabled' : ''}`}
        >
          {isUploading ? 'Uploading...' : 'Upload CSV'}
        </label>
        <button
          onClick={() => {
            // Lock admin controls - hide panel and reset authentication
            if (onLock) {
              onLock()
            } else {
              // Fallback: just reset authentication
              localStorage.removeItem('quest-for-gold-authenticated')
              onAuthenticate(false)
            }
          }}
          className="logout-button"
        >
          Lock
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default CSVUploader

