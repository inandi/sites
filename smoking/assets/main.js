"use strict";

/**
 * @class LoadJs
 * @description Handles loading and rendering page content, including title, version information, and copyright text.
 * @param {string} pageTitle - The title of the page.
 * @param {string} pageName - The name of the page.
 * @param {string} thisPolicyCreationURL - The URL for policy creation.
 * @param {boolean} isLatest - Indicates whether this is the latest version.
 * @param {string} selfVersion - The version of the current page.
 * 
 * @author Gobinda Nandi
 */
class LoadJs {

    /**
     * @constructor
     * @param {string} pageTitle 
     * @param {string} pageName 
     * @param {string} thisPolicyCreationURL 
     * @param {bool} isLatest 
     * @param {string} selfVersion 
     */
    constructor(pageTitle, pageName, thisPolicyCreationURL, isLatest, selfVersion) {
        this.pageTitle = pageTitle;
        this.pageName = pageName;
        this.thisPolicyCreationURL = thisPolicyCreationURL;
        this.isLatest = isLatest;
        this.selfVersion = selfVersion;
        this.hostURL = "https://inandi.github.io/sites/smoking/";

        /**
         * @todo Update when new page adds/modifies e.g. v1.0 or v1.1 or v1.2
         */
        this.latestVersion = 'v1.0';
    }

    /**
     * Loads and renders the page content.
     */
    load() {
        document.title = this.pageTitle;
        document.getElementById('page-name').textContent = this.pageName;
        document.getElementById('page-version-name').textContent = `verion ${this.selfVersion}`;
        this.prepCopyright();
        this.createVersionList()
    }

    /**
     * Creates the version list, including the latest version and older versions.
     */
    createVersionList() {
        const ulElement = document.getElementById('versionList');
        // handle latest version
        const hyphenatedVersion = this.convertToHyphenatedVersion(this.latestVersion);
        const liElement = document.createElement('li');
        liElement.className = `version--${hyphenatedVersion}`;
        if (this.isLatest) {
            liElement.className += ' active ';
        }
        liElement.innerHTML = `<a href="${this.hostURL}policy.html">${this.latestVersion}</a>`;
        ulElement.appendChild(liElement);

        // handle old version
        const oldVersionsArray = this.oldVersions();
        oldVersionsArray.forEach(version => {
            const hyphenatedVersion = this.convertToHyphenatedVersion(version);
            const liElement = document.createElement('li');

            liElement.className = `version--${hyphenatedVersion}`;
            if (version == this.selfVersion) {
                liElement.className += ' active ';
            }
            liElement.innerHTML = `<a href="${this.hostURL}url/policy/version/${hyphenatedVersion}/policy.html">${version}</a>`;
            ulElement.appendChild(liElement);
        });
    }

    /**
     * @todo Keep adding old versions at the first index of the array.
     * @returns {string[]} An array of old versions.
     */
    oldVersions() {
        return [
            'v0.1',
        ];
    }

    /**
     * Converts a version string to a hyphenated format.
     * @param {string} version - The version string.
     * @returns {string} The hyphenated version.
     */
    convertToHyphenatedVersion(version) {
        if (!version.startsWith('v')) {
            return 'Invalid version format';
        }
        const versionParts = version.substring(1).split('.');
        const hyphenatedVersion = versionParts.join('-');
        return 'v-' + hyphenatedVersion;
    }

    /**
     * Prepares the copyright text.
     */
    prepCopyright() {
        let text = this.pageTitle + ` © `;
        let current = new Date().getFullYear();
        if (this.isLatest) {
            text += current;
        } else {
            text += this.thisPolicyCreationURL;
        }
        document.getElementById('page-copyright-text').textContent = text;
    }
}