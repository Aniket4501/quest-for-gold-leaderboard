# Leaderboard Fix Explanation

## Why the Previous Approach Failed

### Problem 1: Text on Parchment Texture
**Previous Issue:** The leaderboard table was placed directly on the scroll's parchment texture background. The textured, mottled background created visual noise that made text hard to read, especially:
- Rank numbers blended into the texture
- Explorer names lacked contrast
- Gold coin values were faint and unreadable

**Solution:** Wrapped the entire leaderboard in a dedicated `leaderboard-panel` with a semi-opaque light parchment background (`rgba(255, 244, 210, 0.88)`). This creates a clean, readable surface that sits above the scroll texture.

### Problem 2: Table Layout Alignment Issues
**Previous Issue:** Using HTML `<table>` elements with percentage-based column widths (`15%`, `55%`, `30%`) caused alignment problems:
- Rank column drifted left
- Total Gold Coins column wasn't properly right-aligned
- Rows didn't align perfectly under headers
- Browser table rendering inconsistencies

**Solution:** Replaced table structure with CSS Grid using fixed column widths:
- `80px` for Rank (fixed width, left-aligned)
- `1fr` for Explorer Name (flexible, takes remaining space)
- `160px` for Total Gold Coins (fixed width, right-aligned)

Grid guarantees that header and data rows share the exact same column structure, ensuring perfect alignment.

### Problem 3: Insufficient Text Contrast
**Previous Issue:** Text colors were too similar to the background:
- Used CSS variables that didn't provide enough contrast
- Text shadows weren't strong enough
- Background texture interfered with readability

**Solution:** 
- Used explicit dark colors: `#3b2a14` for headers, `#2e1f0f` for data
- Dark gold color `#8a5c00` for coin values (high contrast)
- Increased font weights (700 for headers and coins, 600 for rank)
- Added semi-opaque white background panel to separate text from texture

### Problem 4: Column-Specific Styling
**Previous Issue:** Table cells didn't have proper column-specific alignment and styling:
- Rank wasn't consistently left-aligned
- Coins column used flexbox which could cause alignment issues
- Name column had no left padding

**Solution:**
- `.leaderboard-rank`: Left-aligned, bold (600), dark brown
- `.leaderboard-name`: Left-aligned with 12px padding, medium weight
- `.leaderboard-coins`: Right-aligned, bold (700), dark gold color, flexbox for icon+number alignment

## Implementation Details

### Structure Change
**Before:** HTML table (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`)
**After:** CSS Grid divs (`.leaderboard-panel` > `.leaderboard-row`)

### Key CSS Features
1. **Grid Layout:** `grid-template-columns: 80px 1fr 160px` ensures consistent column widths
2. **Panel Background:** `rgba(255, 244, 210, 0.88)` provides clean reading surface
3. **Border:** `1px solid rgba(160, 120, 60, 0.6)` defines panel edges
4. **Alternating Rows:** Even rows have subtle white background for separation
5. **Hover Effect:** Rows highlight on hover for interactivity

## Success Criteria Met

✅ Rank numbers are immediately readable (dark brown, bold, left-aligned)
✅ Explorer names are clearly visible (dark text on light panel)
✅ Total Gold Coins column is aligned and bold (right-aligned, dark gold, 700 weight)
✅ Text does NOT blend into background (semi-opaque panel separation)
✅ Leaderboard looks clean and ceremonial (bordered panel, proper spacing)

## Why This Approach Works

1. **Visual Separation:** The panel creates a distinct reading area separate from the scroll texture
2. **Grid Precision:** CSS Grid guarantees pixel-perfect column alignment
3. **Color Contrast:** Explicit dark colors on light background ensure readability
4. **Fixed Widths:** Rank and Coins columns use fixed widths, preventing drift
5. **Projector-Friendly:** High contrast, bold text, clean layout works well on large displays

