import React from 'react'

/**
 * Header Component
 * 
 * Displays the main title and subtitle with gold divider.
 * Uses ancient/medieval serif fonts for regal feel.
 */
function Header() {
  return (
    <header className="scroll-header">
      <h1 className="scroll-title">Quest for Gold</h1>
      <p className="scroll-subtitle">Gamified Induction Experience</p>
      <div className="gold-divider"></div>
    </header>
  )
}

export default Header

