import React from 'react'

/**
 * Header Component
 * 
 * Displays the main title and subtitle with gold divider.
 * Includes company logo branding.
 */
function Header() {
  return (
    <header className="scroll-header">
      <img 
        src="/assets/habit.png" 
        alt="Company Logo" 
        className="header-logo"
      />
      <h1 className="scroll-title">Quest for Gold</h1>
      <p className="scroll-subtitle">Your Journey Begins Here</p>
      <div className="gold-divider"></div>
    </header>
  )
}

export default Header

