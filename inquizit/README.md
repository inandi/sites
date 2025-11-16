# Site Template - Variable Replacement Guide

This template contains placeholder variables that need to be replaced when creating a new site. Follow the steps below to customize the template for your site.

## Variables to Replace

### 1. `InQuizIt - Android App`
**What it is:** The title of your site/application  
**Where to replace:** All HTML files (`.html`) and `assets/main.js`  
**Example:**
- Template: `InQuizIt - Android App`
- Replace with: `Water Boy - Android App` or `Smoking Tracker` or `My Awesome App`

### 2. `2025`
**What it is:** The year the site was created (used for copyright)  
**Where to replace:** All HTML files (`.html`) and `assets/main.js`  
**Example:**
- Template: `2025`
- Replace with: `2025` or `2024`

### 3. `inquizit`
**What it is:** The directory/folder name of your site (used in the GitHub Pages URL)  
**Where to replace:** `assets/main.js` (line 63)  
**Example:**
- Template: `this.hostURL = "https://inandi.github.io/sites/inquizit/";`
- Replace with: `this.hostURL = "https://inandi.github.io/sites/water_boy/";` or `this.hostURL = "https://inandi.github.io/sites/my_app/";`

### 4. Logo File
**What it is:** The favicon/logo image displayed in browser tabs  
**Where to replace:** `assets/logo.png` (replace the entire file)  
**Example:**
- Template: `assets/logo.png` (default placeholder logo)
- Replace with: Your own logo file (keep the same filename: `logo.png`)
- **Note:** The logo should be a PNG image. All HTML files reference `assets/logo.png`, so keep this filename.