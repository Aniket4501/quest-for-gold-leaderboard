import React from 'react'

/**
 * CoinIcon Component
 * 
 * Proper coin icon (SVG) for consistent rendering across the app.
 * Replaces emoji-based coins for better alignment and visual consistency.
 */
function CoinIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle cx="12" cy="12" r="10" fill="#D4AF37" stroke="#B8941F" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="6" fill="#F5D76E" opacity="0.6"/>
      <path d="M8 12 L16 12" stroke="#B8941F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8 L12 16" stroke="#B8941F" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default CoinIcon

