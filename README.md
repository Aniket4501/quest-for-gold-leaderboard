# Quest for Gold - Gamified Induction Leaderboard

A single-screen, treasure-hunt themed leaderboard UI built with React and Vite.

## 🎯 Current Phase: UI-Only Implementation

This is a **UI-first implementation** with:
- ✅ Complete visual structure and theming
- ✅ Top-3 podium display
- ✅ Leader badge
- ✅ Gold coins section
- ✅ Animation hooks (prepared, ready to wire)
- ✅ Sound hooks (prepared, ready to wire)
- ❌ CSV parsing (not yet implemented)
- ❌ Scoring logic (not yet implemented)
- ❌ Data binding (using dummy data)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
quest-for-gold/
├── src/
│   ├── components/
│   │   ├── BackgroundLayers.jsx      # Background and fire overlays
│   │   ├── ParchmentScroll.jsx       # Central scroll container
│   │   ├── Header.jsx                # Title and subtitle
│   │   ├── Podium.jsx                # Top-3 podium container
│   │   ├── PodiumSlot.jsx            # Individual podium position
│   │   ├── LeaderBadge.jsx           # Leader of the Day badge
│   │   ├── GoldCoins.jsx             # Coin pile section
│   │   └── DecorativeElements.jsx    # Compass and hourglass
│   ├── hooks/
│   │   ├── useAnimations.js          # Animation trigger hooks
│   │   └── useSound.js               # Sound effect hooks
│   ├── styles/
│   │   └── App.css                   # All theme styles
│   ├── App.jsx                       # Main app component
│   └── main.jsx                      # React entry point
├── public/
│   └── assets/                       # Image assets (to be added)
├── package.json
├── vite.config.js
└── index.html
```

## 🎨 Visual Structure

### Layered Design
1. **Background Layer**: Parchment/map texture with vignette
2. **Fire Overlays**: Burnt edges at top and bottom
3. **Central Scroll**: All content housed in centered parchment container

### Components
- **Header**: Title "Quest for Gold" with gold divider
- **Podium**: Top-3 participants (Gold/Silver/Bronze)
- **Leader Badge**: "🔥 Leader of the Day" badge
- **Gold Coins**: Animated coin pile
- **Decorative Elements**: Compass and hourglass

## 🖼️ Required Assets

Place these images in `public/assets/`:

- `bg-map.jpg` - Parchment/map background texture
- `fire-top.png` - Fire/burnt edge (top)
- `fire-bottom.png` - Fire/burnt edge (bottom)
- `scroll-bg.png` - Scroll/parchment texture
- `compass.png` - Compass decorative element
- `hourglass.png` - Hourglass decorative element
- `coin-pile.png` - Gold coin pile graphic

**Note**: The app includes emoji fallbacks if images are missing.

## 🎭 Animations

Animation hooks are prepared and ready:

- **Podium Entry**: Rise/scale-in animation (triggered on mount)
- **Badge Glow**: Pulse animation for leader badge
- **Coin Shimmer**: Continuous bounce/shimmer loop

See `src/hooks/useAnimations.js` for implementation details.

## 🔊 Sound Hooks

Sound hooks are prepared (not yet wired):

- `useCoinSound()` - Coin drop sound
- `useCelebrationSound()` - Celebration sound
- `useLeaderChangeSound()` - Leader change sound

See `src/hooks/useSound.js` for implementation details.

## 🔌 Integration Points

### Future CSV Upload
- Add upload modal component
- Wire to `App.jsx` state management
- Trigger scoring service on upload

### Future Scoring Logic
- Replace dummy data in `App.jsx`
- Connect to scoring service
- Update podium and leaderboard data

### Future Auto-Refresh
- Add refresh interval in `App.jsx`
- Trigger data recalculation
- Update UI with animations

## 📝 CSS Class Naming

- **Component**: `.parchment-scroll`, `.podium-section`
- **Element**: `.scroll-title`, `.podium-base`, `.leader-badge`
- **Modifier**: `.podium-gold`, `.podium-silver`, `.podium-bronze`
- **State**: `.animate-in`, `.glow-pulse`, `.shimmer-loop`

## 🎯 Design Assumptions

1. **Single Screen**: No scrolling, all content fits in viewport
2. **Event-Ready**: Designed for projectors/TV screens
3. **Responsive**: Scales down for smaller screens
4. **Asset Fallbacks**: Emoji fallbacks if images missing
5. **Animation-Ready**: Keyframes defined, hooks prepared

## 🚧 Next Steps

1. Add image assets to `public/assets/`
2. Implement CSV parsing service
3. Implement scoring calculation service
4. Wire data binding to components
5. Connect animation triggers to data updates
6. Connect sound triggers to events
7. Add CSV upload UI
8. Add auto-refresh functionality

## 📄 License

Internal project - All rights reserved

