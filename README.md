# HintFill

HintFill is a Chrome extension that helps you quickly fill text fields with their own placeholder text — but **only when you want to**.

Instead of auto-filling every field on the page, HintFill gives you a small, unobtrusive suggestion next to focused inputs and lets you trigger the fill manually via:

- A small popup next to the focused field
- A keyboard shortcut
- A toolbar icon
- A right-click context menu

Perfect for testing, debugging forms, or quickly using placeholder content.

---

## Features

- Shows a small tooltip next to focused text fields: **“Fill with placeholder”**
- Fills only the currently focused input/textarea
- Works on most websites, including SPAs (React/Vue/etc.)
- Keyboard shortcut to fill the focused field
- Toolbar button to fill the focused field
- Right-click context menu item on editable fields
- Avoids sensitive/non-text fields (passwords, checkboxes, etc.)

---

## Files

- `manifest.json` – Chrome extension manifest (Manifest V3)
- `background.js` – Handles toolbar click, keyboard shortcut, and context menu
- `content.js` – Injected into pages, shows the tooltip and performs the fill
- `icon128.png` – Extension icon (optional but recommended)

---

## Installation (Developer Mode)

1. Clone or download this project into a folder, e.g.:

   ```text
   hintfill/
     manifest.json
     background.js
     content.js
     icon128.png (optional)
