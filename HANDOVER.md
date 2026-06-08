# Handover Summary - First Year Foundations Separator Fix

## Current Status
The site has a **separator display issue** in navigation and content. The goal is to display hyphens (e.g., "0-3 Months" instead of "03 Months") using an encoding method that doesn't cause rendering corruption.

## Problem Statement
- **Issue**: Navigation and footer links are missing visual separators in month ranges (shows "03 Months" instead of "0-3 Months")
- **Root cause**: Previous attempts to use regular hyphens caused UTF-8 encoding corruption
- **Solution attempted**: Use HTML entities `&#45;` (safe encoding) to display regular hyphens
- **Current blocker**: Some files (faq.html, terms.html, privacy.html, etc.) were corrupted by malformed sed command

## Critical Files Status

### ✅ CORRECTLY UPDATED (HTML entities properly applied)
- `index.html` - Navigation and footer use `&#45;` entities correctly
- `0-3-months.html` - Hero label: "0&#45;3 Months · $14.99 · Instant PDF Download"
- `3-6-months.html` - Same format applied
- `6-9-months.html` - Same format applied  
- `9-12-months.html` - Same format applied
- `bundle.html` - Guide cards and text updated
- `about.html` - Footer links updated

### ❌ CORRUPTED (Need fixing - sed command went wrong)
- `faq.html` - Navigation shows: `0>03 Months<#45;3 Months` (mangled)
- `terms.html` - Same corruption pattern
- `privacy.html` - Same corruption pattern
- `disclaimer.html` - Same corruption pattern
- `free.html` - Same corruption pattern
- `blog.html` - Same corruption pattern
- `blog-tummy-time.html` - Same corruption pattern
- `blog-rolling.html` - Same corruption pattern

### Example of Corruption
**Current (broken):**
```html
<li><a href="/0-3-months.html">0>03 Months<#45;3 Months</a></li>
```

**Should be:**
```html
<li><a href="/0-3-months.html">0&#45;3 Month Guide</a></li>
```

## What Needs to Be Done (Next Session)

### Priority 1: Fix Corrupted Files
For each corrupted file (faq.html, terms.html, privacy.html, disclaimer.html, free.html, blog.html, blog-tummy-time.html, blog-rolling.html):

1. **Navigation links** - Replace corrupted month patterns with correct HTML entities:
   - `0>03 Months<#45;3 Months` → `0&#45;3 Months`
   - `3>36 Months<#45;6 Months` → `3&#45;6 Months`
   - `6>69 Months<#45;9 Months` → `6&#45;9 Months`
   - `9>912 Months<#45;12 Months` → `9&#45;12 Months`

2. **Footer links** - Ensure footer guide sections use:
   - `0&#45;3 Month Guide`
   - `3&#45;6 Month Guide`
   - `6&#45;9 Month Guide`
   - `9&#45;12 Month Guide`

### Priority 2: Verify All Pages Display Correctly
After fixing, verify via live site (https://first-years-foundations.com):
- Navigation shows: "0-3 Months", "3-6 Months", "6-9 Months", "9-12 Months" (with visible hyphens)
- Footer links show same format with "Month Guide" suffix
- Hero labels show: "0-3 Months · $14.99 · Instant PDF Download" with visible dots and hyphens
- No garbled characters or HTML entities visible in browser

### Priority 3: Text Separators
Keep the following separator formats which are working fine:
- Em-dashes for text: `— ` (renders as proper dash)
- Middle dots for lists: ` · ` (renders as bullet point)

## Tools & Approach

**❌ DO NOT use:** `sed` with complex regex substitutions (causes corruption)

**✅ DO use:** 
1. Edit tool with exact string matching for each file
2. Manual replacement of corrupted patterns
3. Verify changes in browser before declaring done

## Encoding Strategy (What Works)

| Use Case | Format | Notes |
|----------|--------|-------|
| Month ranges in nav/footer | `&#45;` | HTML entity for hyphen - safe, displays as "-" |
| Text separators between items | ` · ` | Unicode middle dot - works fine |
| Text separators between clauses | ` — ` | Em-dash - works fine |
| Regular hyphens in URLs | `-` | Keep as-is in href attributes |

## Files to Check/Fix
1. faq.html - Navigation corrupted, footer links likely need checking
2. terms.html - Same issues
3. privacy.html - Same issues  
4. disclaimer.html - Same issues
5. free.html - Same issues
6. blog.html - Same issues
7. blog-tummy-time.html - Same issues
8. blog-rolling.html - Same issues

## Expected End Result
All navigation and guide links should display exactly like index.html currently does:
- Clean hyphens visible between numbers
- No HTML entity codes visible in browser
- Consistent formatting across all pages
- No UTF-8 encoding corruption
