# Quest for Gold - Asset Reference Guide

## Required Image Assets

### Background Layer
- **File**: `assets/parchment-bg.png`
- **Purpose**: Main parchment texture for background layer
- **Specs**: Full screen coverage, seamless tileable texture
- **Dimensions**: 1920x1080px (or larger for high-res displays)
- **Format**: PNG with transparency or JPG
- **Style**: Aged, weathered parchment/map texture

### Fire/Burnt Edge Overlays
- **File**: `assets/fire-edge.png`
- **Purpose**: Burnt/fire effect at top and bottom of screen
- **Specs**: Horizontal strip, semi-transparent
- **Dimensions**: 1920x150px (width should match screen width)
- **Format**: PNG with transparency
- **Style**: Fire/burnt paper edge effect
- **Note**: Used for both top and bottom (rotated 180deg for top)

### Scroll/Parchment Container
- **File**: `assets/parchment-texture.png`
- **Purpose**: Texture overlay for central scroll container
- **Specs**: Subtle texture pattern
- **Dimensions**: 1400x900px (or larger)
- **Format**: PNG with transparency
- **Style**: Aged paper texture

- **File**: `assets/scroll-edge.png`
- **Purpose**: Border image for scroll edges
- **Specs**: 9-slice border image
- **Dimensions**: 24x24px (8px slices)
- **Format**: PNG with transparency
- **Style**: Decorative scroll edge pattern

### Decorative Elements
- **File**: `assets/compass.png`
- **Purpose**: Compass decorative element (top-right)
- **Specs**: Icon-style graphic
- **Dimensions**: 80x80px
- **Format**: PNG with transparency
- **Style**: Vintage compass illustration

- **File**: `assets/hourglass.png`
- **Purpose**: Hourglass decorative element (bottom-left)
- **Specs**: Icon-style graphic
- **Dimensions**: 60x60px
- **Format**: PNG with transparency
- **Style**: Vintage hourglass illustration

- **File**: `assets/gold-coins.png`
- **Purpose**: Gold coins decorative element (bottom-center)
- **Specs**: Horizontal arrangement
- **Dimensions**: 120x40px
- **Format**: PNG with transparency
- **Style**: Stacked gold coins illustration

- **File**: `assets/coin-pile.png`
- **Purpose**: Coin pile in footer gamification strip
- **Specs**: Icon-style graphic
- **Dimensions**: 100x50px
- **Format**: PNG with transparency
- **Style**: Pile of gold coins

## Asset Organization

```
assets/
├── parchment-bg.png
├── fire-edge.png
├── parchment-texture.png
├── scroll-edge.png
├── compass.png
├── hourglass.png
├── gold-coins.png
└── coin-pile.png
```

## Fallback Behavior

All decorative elements have CSS fallbacks using emoji characters:
- Compass: 🧭
- Hourglass: ⏳
- Gold Coins: 🪙
- Coin Pile: 🪙🪙🪙🪙

The CSS is designed to gracefully degrade if images are missing, using:
1. Emoji fallbacks for decorative elements
2. CSS gradients for background textures
3. Solid colors for borders if border-image fails

## Design Assumptions

1. **Single Screen Layout**: No scrolling - all content fits in viewport
2. **Event/Projector Friendly**: High contrast, readable from distance
3. **Aspect Ratio**: Designed for 16:9 displays (1920x1080)
4. **Color Scheme**: Warm, aged parchment with gold accents
5. **Typography**: Medieval/antique feel (Cinzel + Crimson Text)
6. **Layering**: Fixed positioning for background, fire overlays, and scroll
7. **Responsive**: Scales down for smaller screens, hides decorative elements on mobile

## Future Animation Assets

These will be needed when implementing animations:
- Coin flip sprite sheet (optional)
- Particle effects for celebrations (optional)
- Glow effect overlays (can be CSS-only)

