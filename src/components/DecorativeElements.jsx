import React from 'react'

/**
 * DecorativeElements Component
 * 
 * Renders decorative elements positioned absolutely within scroll:
 * - Compass (top-right corner)
 * - Hourglass (bottom-left corner)
 * 
 * These elements add to the treasure hunt atmosphere.
 */
function DecorativeElements() {
  return (
    <>
      {/* Compass - Top Right */}
      <div 
        className="decorative-compass"
        style={{
          backgroundImage: 'url(/assets/compass.png)'
        }}
      />
      
      {/* Hourglass - Bottom Left */}
      <div 
        className="decorative-hourglass"
        style={{
          backgroundImage: 'url(/assets/hourglass.png)'
        }}
      />
    </>
  )
}

export default DecorativeElements

