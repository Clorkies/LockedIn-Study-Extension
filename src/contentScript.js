chrome.storage.local.get(["studyMode"], (data) => {
  const showPopup = data.studyMode !== false;
  
  if (showPopup) {
    const modal = new LockedInModal();
    modal.initialize();
  }
});

async function createWarningPopup() {
  if (document.getElementById("lockedin-popup")) {
    return; 
  }
  const response = await fetch(chrome.runtime.getURL('src/modal/modal.html'));
  const html = await response.text();
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const overlay = doc.getElementById('lockedin-popup');
  
  const images = overlay.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src.startsWith('../assets/')) {
      img.src = chrome.runtime.getURL('src/' + src.replace('../', ''));
    }
  });
  
  document.body.appendChild(overlay);
  
  document.getElementById("lockedin-close-btn").addEventListener("click", () => {
    overlay.remove();
  });
  
  document.getElementById("lockedin-proceed-btn").addEventListener("click", () => {
    overlay.remove();
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