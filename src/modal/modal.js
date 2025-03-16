class LockedInModal {
    constructor() {
        this.overlay = null;
    }

    async initialize() {
        if (document.getElementById("lockedin-popup")) {
            return;
        }
        await this.createModal();
        this.setupEventListeners();
    }

    async createModal() {
        const response = await fetch(chrome.runtime.getURL('src/modal/modal.html'));
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        this.overlay = doc.getElementById('lockedin-popup');
        
        this.fixImagePaths();
        document.body.appendChild(this.overlay);
    }

    fixImagePaths() {
        const images = this.overlay.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src.startsWith('../assets/')) {
                img.src = chrome.runtime.getURL('src/' + src.replace('../', ''));
            }
        });
    }

    setupEventListeners() {
        document.getElementById("lockedin-close-btn").addEventListener("click", () => {
            this.close();
        });
        
        document.getElementById("lockedin-proceed-btn").addEventListener("click", () => {
            this.close();
        });
        
        const siteButtons = document.querySelectorAll(".lockedin-site");
        siteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const url = button.getAttribute("data-url");
                if (url) {
                    window.open(url, "_blank");
                }
            });
        });
    }

    close() {
        this.overlay.remove();
    }
}

// Export for use in contentScript.js
window.LockedInModal = LockedInModal;
