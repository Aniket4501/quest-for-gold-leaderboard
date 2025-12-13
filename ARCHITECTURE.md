# Quest for Gold - Architecture & Structure

## High-Level Component Structure

```
App (Root)
├── PasswordGuard (Conditional Wrapper)
│   └── MainContainer
│       ├── Header
│       │   ├── Title
│       │   └── ThemeDecorations (Compass, Hourglass)
│       ├── CSVUploader
│       │   ├── PasswordInput
│       │   ├── FileInput
│       │   └── UploadButton
│       ├── LeaderboardContainer
│       │   ├── Top3Podium
│       │   │   ├── PodiumSlot (Rank 1 - Gold)
│       │   │   ├── PodiumSlot (Rank 2 - Silver)
│       │   │   └── PodiumSlot (Rank 3 - Bronze)
│       │   ├── LeaderOfTheDay (Badge for Rank 1)
│       │   └── LeaderboardTable
│       │       └── LeaderboardRow (for each participant)
│       ├── AutoRefreshIndicator (Optional visual feedback)
│       └── BackgroundElements (Map texture, decorative elements)
```

## Suggested Folder Structure

```
quest-for-gold/
├── public/
│   ├── sounds/
│   │   └── coin-sound.mp3
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Leaderboard/
│   │   │   ├── Top3Podium.jsx
│   │   │   ├── PodiumSlot.jsx
│   │   │   ├── LeaderboardTable.jsx
│   │   │   ├── LeaderboardRow.jsx
│   │   │   └── LeaderOfTheDay.jsx
│   │   ├── CSVUploader/
│   │   │   ├── CSVUploader.jsx
│   │   │   └── PasswordGuard.jsx
│   │   ├── Theme/
│   │   │   ├── ThemeDecorations.jsx
│   │   │   ├── CoinAnimation.jsx
│   │   │   └── BackgroundElements.jsx
│   │   └── Common/
│   │       ├── Header.jsx
│   │       └── AutoRefreshIndicator.jsx
│   ├── services/
│   │   ├── scoringService.js
│   │   └── csvParser.js
│   ├── hooks/
│   │   ├── useLeaderboard.js
│   │   ├── useAutoRefresh.js
│   │   └── useSound.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── soundManager.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Leaderboard.css
│   │   ├── Theme.css
│   │   ├── Animations.css
│   │   └── CSVUploader.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Component Responsibilities

### 1. **App.jsx** (Root Component)
**Responsibilities:**
- Initialize application state
- Manage global leaderboard data
- Coordinate password authentication state
- Handle CSV upload and parsing
- Manage auto-refresh lifecycle
- Provide context for theme and sound settings

**State Management:**
- `leaderboardData`: Array of participant objects
- `isAuthenticated`: Boolean for password guard
- `refreshInterval`: Number (default: 5000ms)
- `lastUpdated`: Timestamp for refresh tracking

---

### 2. **PasswordGuard.jsx**
**Responsibilities:**
- Render password input form when not authenticated
- Validate password (simple frontend check)
- Show main app content when authenticated
- Store authentication state (localStorage for persistence)

**Props:**
- `children`: Main app content
- `onAuthenticate`: Callback when password is correct

**Assumptions:**
- Password stored as constant in code (e.g., "admin123")
- No backend validation needed

---

### 3. **CSVUploader.jsx**
**Responsibilities:**
- Provide file input for CSV upload
- Parse uploaded CSV file
- Validate CSV structure
- Trigger scoring calculation
- Show upload status/feedback
- Play coin sound on successful upload

**Props:**
- `onDataUploaded`: Callback with parsed data
- `isAuthenticated`: Boolean to show/hide uploader

**CSV Expected Format:**
```csv
username,full_sessions,proactiveness,assessments_cleared_day3,highest_scorer_day3,mini_challenges,treasure_hunt_clues
john_doe,5,true,3,false,2,4
jane_smith,4,true,3,true,3,5
```

---

### 4. **Top3Podium.jsx**
**Responsibilities:**
- Display top 3 participants in podium layout
- Apply gold/silver/bronze styling
- Trigger entry animations (rise/scale)
- Show coin counts prominently
- Handle empty states (if < 3 participants)

**Props:**
- `topThree`: Array of top 3 participant objects
- `leaderOfTheDay`: Participant object for rank 1

**Visual Treatment:**
- Rank 1: Center, tallest podium, gold accent
- Rank 2: Left, medium height, silver accent
- Rank 3: Right, shortest, bronze accent

---

### 5. **PodiumSlot.jsx**
**Responsibilities:**
- Render individual podium position
- Display participant avatar/username
- Show coin count with animation
- Apply rank-specific styling
- Handle animation triggers

**Props:**
- `participant`: Participant object
- `rank`: Number (1, 2, or 3)
- `isLeader`: Boolean for special treatment

---

### 6. **LeaderboardTable.jsx**
**Responsibilities:**
- Display all participants in table format
- Show ranks 4+ (top 3 shown in podium)
- Auto-sort by total coins (descending)
- Highlight top performers
- Handle empty state

**Props:**
- `participants`: Array of all participant objects
- `topThree`: Array to exclude from table

**Columns:**
- Rank | Username | Total Coins

---

### 7. **LeaderboardRow.jsx**
**Responsibilities:**
- Render individual table row
- Display rank, username, coins
- Apply highlight styling for top performers
- Trigger coin animation on score change
- Handle row hover effects

**Props:**
- `participant`: Participant object
- `rank`: Number
- `isTopPerformer`: Boolean

---

### 8. **LeaderOfTheDay.jsx**
**Responsibilities:**
- Display "🔥 Leader of the Day" badge
- Apply glow animation
- Position near top 3 podium
- Show only when rank 1 exists

**Props:**
- `leader`: Participant object (rank 1)
- `isVisible`: Boolean

---

### 9. **ThemeDecorations.jsx**
**Responsibilities:**
- Render compass, hourglass, and other decorative elements
- Position elements around the UI
- Apply subtle animations
- Maintain treasure hunt aesthetic

---

### 10. **CoinAnimation.jsx**
**Responsibilities:**
- Trigger coin flip/spin animation
- Show when scores update
- Play sound effect
- Handle multiple simultaneous animations

**Props:**
- `trigger`: Boolean/Number to trigger animation
- `count`: Number of coins to animate

---

### 11. **BackgroundElements.jsx**
**Responsibilities:**
- Render parchment/scroll container
- Apply burnt/fire edge effects
- Display map-style background texture
- Maintain theme consistency

---

### 12. **AutoRefreshIndicator.jsx**
**Responsibilities:**
- Show refresh countdown or status
- Display last updated timestamp
- Optional: Allow manual refresh trigger

**Props:**
- `refreshInterval`: Number
- `lastUpdated`: Timestamp
- `onManualRefresh`: Callback

---

## Service Layer

### 1. **scoringService.js**
**Responsibilities:**
- Centralized scoring calculation logic
- Calculate total coins for each participant
- Apply all scoring rules:
  - Full sessions: +1 coin each
  - Proactiveness: +2 coins
  - Assessments cleared by Day 3: +1 coin each
  - Highest scorer in assessments by Day 3: +2 coins
  - Mini challenges: +1 coin each
  - Treasure hunt clues: +1 coin per clue
- Return sorted leaderboard with ranks

**Functions:**
```javascript
calculateScore(participantData) → number
calculateAllScores(participantsData) → array
sortAndRank(participants) → array
```

---

### 2. **csvParser.js**
**Responsibilities:**
- Parse CSV file content
- Validate CSV structure
- Convert CSV rows to participant objects
- Handle parsing errors gracefully

**Functions:**
```javascript
parseCSV(file) → Promise<array>
validateCSVStructure(data) → boolean
```

**Dependencies:**
- `papaparse` (lightweight CSV parser library)

---

## Custom Hooks

### 1. **useLeaderboard.js**
**Responsibilities:**
- Manage leaderboard state
- Handle score calculations
- Auto-sort and rank participants
- Track score changes for animations

**Returns:**
- `leaderboard`: Sorted array with ranks
- `topThree`: Top 3 participants
- `leaderOfTheDay`: Rank 1 participant
- `updateLeaderboard`: Function to update data

---

### 2. **useAutoRefresh.js**
**Responsibilities:**
- Manage auto-refresh interval
- Trigger leaderboard refresh
- Allow interval configuration
- Clean up on unmount

**Parameters:**
- `refreshInterval`: Number (default: 5000)
- `onRefresh`: Callback function

**Returns:**
- `isRefreshing`: Boolean
- `lastRefresh`: Timestamp
- `setRefreshInterval`: Function to update interval

---

### 3. **useSound.js**
**Responsibilities:**
- Play coin sound effects
- Manage audio instances
- Handle browser audio restrictions
- Optional: Play celebration sounds

**Functions:**
- `playCoinSound()`: Play coin sound
- `playCelebrationSound()`: Play celebration (optional)

---

## Utility Files

### 1. **constants.js**
**Responsibilities:**
- Store configuration constants
- Default refresh interval
- Password for admin access
- Scoring rules configuration
- Theme colors and styling constants

**Exports:**
```javascript
REFRESH_INTERVAL_DEFAULT
ADMIN_PASSWORD
SCORING_RULES
THEME_COLORS
```

---

### 2. **soundManager.js**
**Responsibilities:**
- Manage audio file loading
- Handle audio playback
- Prevent multiple simultaneous sounds
- Handle browser audio restrictions

---

## Styling Architecture

### 1. **App.css**
- Global styles
- CSS reset/normalize
- Root variables (CSS custom properties)
- Container layouts

### 2. **Theme.css**
- Treasure hunt theme styles
- Parchment/scroll container
- Burnt edge effects
- Map background
- Gold coin visuals
- Color palette

### 3. **Leaderboard.css**
- Table styles
- Podium layout
- Row styling
- Highlight effects

### 4. **Animations.css**
- Keyframe animations
- Coin flip/spin
- Podium entry animations
- Glow effects
- Rise/scale transitions

### 5. **CSVUploader.css**
- Upload form styles
- File input styling
- Button styles
- Status feedback

---

## Data Flow

```
1. Admin uploads CSV
   ↓
2. CSV parsed by csvParser.js
   ↓
3. Raw data passed to scoringService.js
   ↓
4. Scores calculated for each participant
   ↓
5. Participants sorted and ranked
   ↓
6. Leaderboard state updated
   ↓
7. Components re-render with new data
   ↓
8. Animations triggered (coin sounds, visual effects)
   ↓
9. Auto-refresh timer continues cycle
```

---

## Assumptions & Decisions

### 1. **CSV Structure Assumptions**
- CSV must have headers matching expected field names
- Boolean values represented as "true"/"false" strings or 1/0
- Numeric values for counts (sessions, challenges, clues)
- Username is unique identifier

### 2. **Password Protection**
- Simple frontend password check (not secure, but sufficient for Phase 1)
- Password stored as constant (can be moved to env variable later)
- Authentication persists in localStorage

### 3. **Scoring Logic**
- All scoring rules are additive
- No negative scores
- Ties handled by maintaining original order (or alphabetical by username)

### 4. **Auto-Refresh**
- Refreshes existing data (no new CSV upload needed)
- Can be paused/disabled
- Visual indicator shows refresh status

### 5. **Animations**
- CSS-based animations for performance
- Sound effects optional (can be muted)
- Animations trigger on score changes, not on every render

### 6. **Browser Compatibility**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid/Flexbox for layouts
- FileReader API for CSV parsing

### 7. **Performance**
- Virtual scrolling not needed (assumes < 100 participants)
- Memoization for expensive calculations
- Debounced refresh if needed

### 8. **Extensibility**
- Scoring rules easily configurable in constants
- Component structure allows easy addition of new features
- Service layer separated for future backend integration

---

## Dependencies (Expected)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "papaparse": "^5.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

---

## Future Extensibility (Phase 2+)

1. **Backend Integration**
   - Replace CSV upload with API calls
   - Real-time WebSocket updates
   - Database persistence

2. **Additional Features**
   - Historical leaderboard views
   - Individual participant profiles
   - Achievement badges
   - Team/group leaderboards

3. **Enhanced Gamification**
   - Power-ups
   - Streak tracking
   - Daily challenges
   - Social features

---

## Success Metrics

- ✅ Clean, modular component structure
- ✅ Centralized scoring logic
- ✅ Easy CSV upload and parsing
- ✅ Auto-refresh functionality
- ✅ Engaging treasure hunt theme
- ✅ Smooth animations and effects
- ✅ Top 3 podium display
- ✅ Leader of the Day badge
- ✅ Password-protected admin access
- ✅ Ready for Phase 2 backend integration

