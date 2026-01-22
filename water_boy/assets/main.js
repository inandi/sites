"use strict";

/**
 * ============================================================================
 * Static Page Loader and Version Manager
 * ============================================================================
 * 
 * @file main.js
 * @description Core JavaScript file for managing static HTML pages with version control
 * 
 * This script handles:
 * - Dynamic page metadata (title, version, copyright)
 * - Version navigation sidebar generation
 * - Automatic copyright year updates
 * - Support/donation link insertion
 * 
 * @author Gobinda Nandi
 * @version 1.0
 * @since 1.0 (2025)
 */

/**
 * @class LoadJs
 * @description Handles loading and rendering page content, including title, version information, and copyright text.
 *              This class provides a centralized way to manage static page metadata and dynamic version navigation.
 * 
 * @param {string} pageTitle - The title of the page (e.g., "Quit Smoking - Android App")
 * @param {string} pageName - The name/type of the page (e.g., "Privacy Policy", "Terms & Conditions")
 * @param {string} thisPageCreationYear - The year this specific page version was created
 * @param {boolean} isLatest - Indicates whether this is the latest/current version of the page
 * @param {string} selfVersion - The version of the current page (e.g., "v1.0", "v0.1")
 * @param {string} fileName - The filename or directory name of page (e.g., "policy", "terms", "about")
 * 
 * @author Gobinda Nandi
 * @version 1.0
 * @since 1.0 (2025)
 */
class LoadJs {


    /**
     * Constructor - Initializes the LoadJs instance with page metadata
     * 
     * @constructor
     * @param {string} pageTitle - Full title of the application/page
     * @param {string} pageName - Display name for the page type
     * @param {string} thisPageCreationYear - Year of page creation (for copyright)
     * @param {boolean} isLatest - Flag indicating if this is the latest version
     * @param {string} selfVersion - Current page version identifier
     * @param {string} fileName - Base filename for URL construction
     */
    constructor(pageTitle, pageName, thisPageCreationYear, isLatest, selfVersion, fileName) {
        // Store page metadata
        this.pageTitle = pageTitle;
        this.pageName = pageName;
        this.thisPageCreationYear = thisPageCreationYear;
        this.isLatest = isLatest;
        this.selfVersion = selfVersion;
        this.fileName = fileName;
        
        // Base URL for the hosted pages - used to generate version links
        this.hostURL = "https://inandi.github.io/sites/water_boy/";

        /**
         * Latest version identifier - IMPORTANT: Update this when publishing new versions
         * @todo Update when new page adds/modifies (e.g., v1.0 → v1.1 → v1.2)
         * @type {string}
         */
        this.latestVersion = 'v1.1';
    }

    /**
     * Loads and renders the page content
     * 
     * Main entry point that orchestrates the page initialization:
     * 1. Sets the browser tab title
     * 2. Updates page header with page name
     * 3. Displays current version
     * 4. Generates copyright text
     * 5. Creates version navigation links
     * 6. Adds donation/support link
     * 
     * @public
     * @returns {void}
     */
    load() {
        // Set the browser tab/window title
        document.title = this.pageTitle;
        
        // Set the page name in the sidebar header
        document.getElementById('page-name').textContent = this.pageName;
        
        // Display the current version number in the content area
        document.getElementById('page-version-name').textContent = `verion ${this.selfVersion}`;
        
        // Generate and display copyright information
        this.prepCopyright();
        
        // Build the version navigation sidebar
        this.createVersionList();
        
        // Add the donation/coffee link
        this.donationTag();
    }

    /**
     * Creates and displays the donation/support link
     * 
     * Generates a "Buy me coffee" link in the footer to support the developer.
     * The link is styled to be centered and displayed as a block element.
     * 
     * @private
     * @returns {void}
     */
    donationTag() {
        // Get the donation container element from the DOM
        const donationContainer = document.getElementById('donation');
        
        // Create a new anchor element for the donation link
        const anchor = document.createElement('a');
        anchor.href = `https://www.buymeacoffee.com/iGobinda`;
        anchor.text = `Buy me coffee`;
        
        // Style the link to be centered and on its own line
        anchor.style.display = 'block';
        anchor.style.textAlign = 'center';
        
        // Append the link to the donation container
        donationContainer.append(anchor);
    }

    /**
     * Creates the version navigation list in the sidebar
     * 
     * Builds a list of clickable version links, including:
     * - The latest version (with "latest" label)
     * - All archived/old versions
     * 
     * The current page's version is highlighted with an 'active' class.
     * Each version link uses the hyphenated format for URL construction.
     * 
     * @private
     * @returns {void}
     */
    createVersionList() {
        // Get the version list container from the sidebar
        const ulElement = document.getElementById('versionList');
        
        // ============================================
        // HANDLE LATEST VERSION
        // ============================================
        
        // Convert version format from "v1.0" to "v-1-0" for URL
        const hyphenatedVersion = this.convertToHyphenatedVersion(this.latestVersion);
        
        // Create anchor element for the latest version
        const listAnchorElement = document.createElement('a');
        listAnchorElement.className = `version--${hyphenatedVersion}`;
        
        // Highlight if this is the current page being viewed
        if (this.isLatest) {
            listAnchorElement.className += ' active ';
        }
        
        // Set display text with "latest" indicator
        listAnchorElement.innerHTML = `${this.latestVersion} (latest)`;
        
        // Set URL to the root-level page (e.g., /policy.html)
        listAnchorElement.href = `${this.hostURL}${this.fileName}.html`;
        
        // Add to the version list
        ulElement.appendChild(listAnchorElement);

        // ============================================
        // HANDLE OLD/ARCHIVED VERSIONS
        // ============================================
        
        // Get array of all old versions
        const oldVersionsArray = this.oldVersions();
        
        // Create a link for each old version
        oldVersionsArray.forEach(version => {
            // Convert version to hyphenated format
            const hyphenatedVersion = this.convertToHyphenatedVersion(version);
            
            // Create anchor element for this version
            const listAnchorElement = document.createElement('a');
            listAnchorElement.className = `version--${hyphenatedVersion}`;
            
            // Highlight if this version matches the current page
            if (version == this.selfVersion) {
                listAnchorElement.className += ' active ';
            }
            
            // Set display text (just the version number)
            listAnchorElement.innerHTML = `${version}`;
            
            // Set URL to the versioned path (e.g., /url/policy/version/v-0-1/policy.html)
            listAnchorElement.href = `${this.hostURL}url/${this.fileName}/version/${hyphenatedVersion}/${this.fileName}.html`;
            
            // Add to the version list
            ulElement.appendChild(listAnchorElement);
        });
    }

    /**
     * Returns an array of all archived/old page versions
     * 
     * This array should be maintained in reverse chronological order
     * (newest old version first, oldest last).
     * 
     * IMPORTANT: When publishing a new version:
     * 1. Add the previous latest version to the BEGINNING of this array
     * 2. Update this.latestVersion in the constructor
     * 
     * Example: When v1.0 becomes old and v1.1 is latest:
     * - Add 'v1.0' to the start of this array
     * - Update constructor's latestVersion to 'v1.1'
     * 
     * @todo Keep adding old versions at the first index of the array when new versions are released
     * @private
     * @returns {string[]} Array of old version strings in "vX.Y" format
     */
    oldVersions() {
        return [
            'v0.1',  // First version (oldest)
            'v1.0',
            // Add newer versions here as they become archived
        ];
    }

    /**
     * Converts a version string from dot notation to hyphenated format
     * 
     * This conversion is necessary for URL/filesystem compatibility.
     * Dots in URLs can cause issues, so we use hyphens instead.
     * 
     * Examples:
     * - "v1.0" → "v-1-0"
     * - "v2.5" → "v-2-5"
     * - "v1.2.3" → "v-1-2-3"
     * - "invalid" → "Invalid version format"
     * 
     * @private
     * @param {string} version - The version string in "vX.Y" or "vX.Y.Z" format
     * @returns {string} The hyphenated version string in "v-X-Y" format, or error message if invalid
     */
    convertToHyphenatedVersion(version) {
        // Validate that version starts with 'v'
        if (!version.startsWith('v')) {
            return 'Invalid version format';
        }
        
        // Remove the 'v' prefix and split by dots
        const versionParts = version.substring(1).split('.');
        
        // Join the parts with hyphens
        const hyphenatedVersion = versionParts.join('-');
        
        // Return with 'v-' prefix
        return 'v-' + hyphenatedVersion;
    }

    /**
     * Generates and displays the copyright text in the footer
     * 
     * Creates a copyright notice with the appropriate year:
     * - For the latest version: Uses the current year (dynamically updated)
     * - For archived versions: Uses the year the page was created (static)
     * 
     * Format: "[Page Title] © [Year]"
     * Example: "Quit Smoking - Android App © 2025"
     * 
     * @private
     * @returns {void}
     */
    prepCopyright() {
        // Start with the page title followed by copyright symbol
        let text = this.pageTitle + ` © `;
        
        // Get the current year
        let current = new Date().getFullYear();
        
        // Choose year based on whether this is the latest version
        if (this.isLatest) {
            // Latest version: Use current year (stays up-to-date automatically)
            text += current;
        } else {
            // Archived version: Use the year it was created (frozen in time)
            text += this.thisPageCreationYear;
        }
        
        // Display the copyright text in the footer
        document.getElementById('page-copyright-text').textContent = text;
    }
}
