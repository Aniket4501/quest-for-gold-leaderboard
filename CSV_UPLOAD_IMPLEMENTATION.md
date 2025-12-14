# CSV Upload Implementation

## Summary

CSV upload functionality has been added to the Quest for Gold leaderboard application. The implementation is simple and focused: parse CSV data and display it exactly as provided, with no calculations or modifications.

## Files Created/Modified

### New Files
1. **src/utils/csvParser.js**
   - Simple CSV parser (no external dependencies)
   - Parses format: `rank,user_name,coins`
   - Validates data structure
   - Returns array of participant objects

2. **src/components/CSVUploader.jsx**
   - File upload component
   - Optional password protection (password: `admin123`)
   - Password persists in localStorage
   - Plays coin sound on successful upload
   - Error handling for invalid CSV

### Modified Files
1. **src/App.jsx**
   - Added state management for leaderboard data
   - Handles CSV data processing
   - Splits data into podium (ranks 1-3) and table (rank 4+)
   - Optional auto-refresh every 5 seconds
   - Falls back to dummy data if no CSV uploaded

2. **src/styles/App.css**
   - Added minimal styles for CSV uploader
   - Positioned in top-right corner
   - Matches treasure hunt theme

## CSV Format (Strict)

```
rank,user_name,coins
1,Explorer One,62
2,Explorer Two,45
3,Explorer Three,38
```

**Rules:**
- Header row is optional (auto-detected)
- `rank` must be a number
- `user_name` is a string
- `coins` must be a number
- Data is trusted as source of truth

## Functionality

### 1. Admin CSV Upload
- Click "Upload CSV" button (after password authentication)
- Select CSV file
- File is parsed and validated
- Data replaces mock data instantly
- Coin sound plays on success

### 2. Password Protection
- Default password: `admin123`
- Stored in localStorage for persistence
- "Lock" button to logout
- Simple frontend check (not secure, but sufficient for Phase 1)

### 3. UI Rendering
- **Podium**: Ranks 1-3
  - Rank 1 → Center (Gold)
  - Rank 2 → Left (Silver)
  - Rank 3 → Right (Bronze)
- **Leader Badge**: Always shows Rank 1
- **Leaderboard Table**: Ranks 4+ sorted ascending

### 4. Auto-Refresh (Optional)
- Re-renders every 5 seconds if data exists
- No recalculation, just refresh
- Prevents UI from going stale

### 5. Sound Effects
- Coin sound on CSV upload success
- Safe browser handling (catches autoplay errors)
- Gracefully fails if audio file missing

## Data Flow

```
1. Admin uploads CSV
   ↓
2. CSV parsed by csvParser.js
   ↓
3. Data validated
   ↓
4. State updated in App.jsx
   ↓
5. Data split: podium (1-3) and table (4+)
   ↓
6. Components re-render with new data
   ↓
7. Coin sound plays
```

## Success Criteria Met

✅ Admin can upload CSV
✅ UI updates instantly
✅ Podium matches CSV ranks (1 center, 2 left, 3 right)
✅ Leader badge shows correct user (rank 1)
✅ No visual regressions
✅ No calculations or modifications to CSV data
✅ Simple, maintainable code

## Usage

1. **Access Upload**: Click "Upload CSV" button (top-right)
2. **Enter Password**: `admin123` (if prompted)
3. **Select File**: Choose CSV file with format `rank,user_name,coins`
4. **View Results**: Leaderboard updates immediately

## Notes

- CSV data is trusted as-is (no validation of ranks or coins)
- No scoring engine or calculations
- UI remains unchanged (only data binding added)
- Password is simple frontend check (not secure)
- Auto-refresh is optional and can be disabled

