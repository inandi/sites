"use strict";

/**
 * @class LoadJs
 * @description Handles loading and rendering page content, including title, version information, and copyright text.
 * @param {string} pageTitle - The title of the page.
 * @param {string} pageName - The name of the page.
 * @param {string} thisPageCreationYear - The year of page creation.
 * @param {boolean} isLatest - Indicates whether this is the latest version.
 * @param {string} selfVersion - The version of the current page.
 * @param {string} fileName - The filename or dir name of page e.g. policy, terms, about
 * 
 * @author Gobinda Nandi
 */
class LoadJs {

    /**
     * @constructor
     * @param {string} pageTitle 
     * @param {string} pageName 
     * @param {string} thisPageCreationYear 
     * @param {bool} isLatest 
     * @param {string} selfVersion 
     * @param {string} fileName 
     */
    constructor(pageTitle, pageName, thisPageCreationYear, isLatest, selfVersion, fileName) {
        this.pageTitle = pageTitle;
        this.pageName = pageName;
        this.thisPageCreationYear = thisPageCreationYear;
        this.isLatest = isLatest;
        this.selfVersion = selfVersion;
        this.fileName = fileName;
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
        liElement.innerHTML = `<a href="${this.hostURL}${this.fileName}.html">${this.latestVersion} (latest)</a>`;
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
            liElement.innerHTML = `<a href="${this.hostURL}url/${this.fileName}/version/${hyphenatedVersion}/${this.fileName}.html">${version}</a>`;
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
            text += this.thisPageCreationYear;
        }
        document.getElementById('page-copyright-text').textContent = text;
    }
}
