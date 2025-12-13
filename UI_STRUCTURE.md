# Quest for Gold - UI Structure & Integration Points

## DOM Structure Overview

The HTML follows a layered approach with fixed positioning:

```
<body>
  ├── .background-layer (Layer 1: Fixed, z-index 1)
  ├── .fire-overlay-top (Layer 2: Fixed, z-index 2)
  ├── .fire-overlay-bottom (Layer 2: Fixed, z-index 2)
  └── .parchment-scroll (Layer 3: Fixed, z-index 3)
      ├── .decorative-compass (Absolute positioned)
      ├── .decorative-hourglass (Absolute positioned)
      ├── .decorative-coins (Absolute positioned)
      ├── .scroll-header
      ├── .podium-section
      ├── .leaderboard-section
      └── .gamification-footer
```

## CSS Class Naming Convention

### BEM-Inspired Naming
- **Component**: `.parchment-scroll`, `.podium-section`
- **Element**: `.scroll-title`, `.podium-base`, `.table-row`
- **Modifier**: `.podium-gold`, `.podium-silver`, `.podium-bronze`
- **State**: `.podium-slot[data-rank="1"]` (uses data attributes)

### Layer Prefixes
- Background: `.background-layer`
- Fire overlays: `.fire-overlay`, `.fire-overlay-top`, `.fire-overlay-bottom`
- Scroll container: `.parchment-scroll`
- Scroll content: `.scroll-header`, `.scroll-title`, `.scroll-subtitle`

### Section Prefixes
- Podium: `.podium-section`, `.podium-container`, `.podium-slot`, `.podium-base`
- Leaderboard: `.leaderboard-section`, `.leaderboard-table`, `.table-row`
- Gamification: `.gamification-footer`, `.leader-badge`, `.coin-pile`

## Integration Points for Future Logic

### 1. Top-3 Podium Data Binding
**Location**: `.podium-section > .podium-container > .podium-slot`

**Current State**: Static dummy data (Explorer One, Two, Three)

**Future Integration**:
```javascript
// Pseudo-code for future implementation
const topThree = calculateTopThree(leaderboardData);
topThree.forEach((participant, index) => {
  const slot = document.querySelector(`[data-rank="${index + 1}"]`);
  slot.querySelector('.podium-name').textContent = participant.username;
  slot.querySelector('.coin-count').textContent = participant.totalCoins;
});
```

**Animation Hook**: 
- Add class `.animate-in` to `.podium-slot` elements
- Animation CSS is ready in comments (see `podiumRise` keyframes)

### 2. Leaderboard Table Population
**Location**: `#leaderboard-tbody`

**Current State**: Static dummy rows (ranks 4-8)

**Future Integration**:
```javascript
// Pseudo-code for future implementation
const tbody = document.getElementById('leaderboard-tbody');
tbody.innerHTML = ''; // Clear existing

leaderboardData.slice(3).forEach((participant, index) => {
  const row = createTableRow(participant, index + 4);
  tbody.appendChild(row);
});
```

**Dynamic Row Creation**:
- Use template or clone existing `.table-row` structure
- Apply alternating row classes for styling
- Add highlight class for top performers

### 3. Leader of the Day Badge
**Location**: `#leader-badge`

**Current State**: Always visible (static)

**Future Integration**:
```javascript
// Pseudo-code for future implementation
const leader = getLeaderOfTheDay(leaderboardData);
const badge = document.getElementById('leader-badge');

if (leader) {
  badge.style.display = 'inline-flex';
  badge.querySelector('.badge-text').textContent = 
    `Leader of the Day: ${leader.username}`;
} else {
  badge.style.display = 'none';
}
```

**Animation Hook**:
- Add class `.glow-pulse` to `#leader-badge`
- Animation CSS is ready in comments (see `glowPulse` keyframes)

### 4. Coin Count Updates
**Location**: `.podium-coins .coin-count` and `.cell-coins`

**Current State**: Static numbers

**Future Integration**:
```javascript
// Pseudo-code for future implementation
function updateCoinCount(element, newCount, oldCount) {
  const coinElement = element.querySelector('.coin-count') || element;
  
  // Trigger coin animation
  coinElement.classList.add('coin-animate');
  
  // Update count with transition
  animateValue(coinElement, oldCount, newCount, 500);
  
  // Remove animation class after animation
  setTimeout(() => {
    coinElement.classList.remove('coin-animate');
  }, 600);
}
```

**Animation Hook**:
- Add class `.coin-animate` to coin elements
- Animation CSS is ready in comments (see `coinFlip` keyframes)

### 5. CSV Upload Integration
**Location**: Future modal/overlay (not yet in HTML)

**Future Structure**:
```html
<!-- To be added -->
<div class="upload-modal" id="upload-modal">
  <div class="upload-form">
    <input type="file" id="csv-file-input" accept=".csv">
    <button id="upload-submit">Upload</button>
  </div>
</div>
```

**Integration Point**:
- Parse CSV → Calculate scores → Update leaderboard
- Trigger refresh of all data-bound elements
- Play coin sound on successful upload

### 6. Auto-Refresh Integration
**Location**: Global (no UI element yet, but can add indicator)

**Future Integration**:
```javascript
// Pseudo-code for future implementation
setInterval(() => {
  // Recalculate scores from current data
  const updatedData = recalculateScores(currentData);
  
  // Update UI elements
  updatePodium(updatedData);
  updateLeaderboard(updatedData);
  updateLeaderBadge(updatedData);
  
  // Optional: Play subtle refresh sound
  playRefreshSound();
}, refreshInterval);
```

**Visual Indicator** (Optional):
- Add `.auto-refresh-indicator` element
- Show countdown or last refresh time
- Subtle pulse animation during refresh

## CSS Layout Rules

### Positioning Strategy
1. **Fixed Layers**: Background, fire overlays, and scroll use `position: fixed`
2. **Absolute Decoratives**: Compass, hourglass, coins use `position: absolute` within scroll
3. **Flexbox Layout**: Scroll content uses flexbox for vertical stacking
4. **Grid/Table**: Leaderboard uses native table layout

### Z-Index Hierarchy
- Layer 1 (Background): `z-index: 1`
- Layer 2 (Fire Overlays): `z-index: 2`
- Layer 3 (Scroll Container): `z-index: 3`
- Decoratives: `z-index: 4`
- Content Sections: `z-index: 5`

### Responsive Breakpoints
- **Desktop**: Default (1200px+)
- **Tablet**: `@media (max-width: 1200px)`
- **Mobile**: `@media (max-width: 768px)`

### Single Screen Constraint
- `body`: `overflow: hidden`
- `.parchment-scroll`: `overflow: hidden`
- `.leaderboard-table-container`: `overflow-y: auto` (only scrollable area)
- All content sized to fit within viewport

## Animation Integration Points

### Ready-to-Use Animation Classes
1. **Podium Entry**: `.animate-in` on `.podium-slot`
2. **Gold Glow**: `.glow-pulse` on `.leader-badge`
3. **Coin Flip**: `.coin-animate` on coin elements

### Animation Implementation Steps
1. Uncomment keyframe definitions in CSS
2. Add JavaScript to apply animation classes
3. Remove classes after animation completes
4. Optional: Add sound effects synchronized with animations

## Styling Assumptions

1. **Font Loading**: Google Fonts (Cinzel + Crimson Text) loaded in `<head>`
2. **Image Fallbacks**: Emoji characters used if images missing
3. **Color Scheme**: CSS custom properties in `:root` for easy theming
4. **Browser Support**: Modern browsers (CSS Grid, Flexbox, custom properties)
5. **Accessibility**: Semantic HTML, proper contrast ratios, focus states

## Future Enhancements

### Phase 2 Additions
- CSV upload modal with password protection
- Real-time score updates with animations
- Sound effects on interactions
- Celebration effects for leader changes
- Historical data visualization

### Performance Optimizations
- Image lazy loading for decorative elements
- CSS containment for scroll container
- Will-change hints for animated elements
- Debounced refresh intervals

