import React from 'react'

/**
 * BackgroundLayers Component
 * 
 * Renders the layered background structure:
 * 1. Parchment/map texture background
 * 2. Fire/burnt edge overlays (top and bottom)
 * 
 * These layers are fixed and provide the treasure hunt atmosphere.
 */
function BackgroundLayers() {
  return (
    <>
      {/* Layer 1: Old Map / Parchment Background */}
      <div 
        className="background-layer"
        style={{
          backgroundImage: 'url(/assets/Map.jpg)'
        }}
      />
      
      {/* Layer 2: Fire / Burnt Edge Overlay (Top) */}
      <div 
        className="fire-overlay fire-overlay-top"
        style={{
          backgroundImage: 'url(/assets/fire.png)'
        }}
      />
      
      {/* Layer 3: Fire / Burnt Edge Overlay (Bottom) */}
      <div 
        className="fire-overlay fire-overlay-bottom"
        style={{
          backgroundImage: 'url(/assets/fire.png)'
        }}
      />
    </>
  )
}

export default BackgroundLayers

