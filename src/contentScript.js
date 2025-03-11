chrome.storage.local.get(["studyMode"], (data) => {
  const showPopup = data.studyMode !== false;
  
  if (showPopup) {
    createWarningPopup();
  }
});

function createWarningPopup() {
  if (document.getElementById("lockedin-popup")) {
    return; 
  }

  const overlay = document.createElement("div");
  overlay.id = "lockedin-popup";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "9999999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  
  const popupContainer = document.createElement("div");
  popupContainer.style.width = "400px";
  popupContainer.style.height = "450px";
  popupContainer.style.backgroundColor = "#12141f";
  popupContainer.style.borderRadius = "8px";
  popupContainer.style.color = "white";
  popupContainer.style.fontFamily = "'Poppins', sans-serif";
  popupContainer.style.display = "flex";
  popupContainer.style.flexDirection = "column";
  popupContainer.style.padding = "16px";
  
  popupContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div class="logo"><img src="${chrome.runtime.getURL('assets/locked_in.png')}" alt="Locked in logo" style="width: 24px; height: 20px;" ></div>
      <button id="lockedin-close-btn" style="color: white; font-size: 24px; background: none; border: none; cursor: pointer;">✕</button>
    </div>
    
    <div style="height: 1px; background-color: #333; margin: 0 auto 5px; width: 100%;"></div>
    
    <div style="background-color: #1a1e32; border-radius: 12px; padding: 16px; display: flex; align-items: center; margin-bottom: 16px;">
      <div style="background-color: #c14646; width: 90px; height: 60px; border-radius: 8px; display: flex; justify-content: center; align-items: center; margin-right: 16px;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" style="width: 40px; height: 40px;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 4px;">WARNING</h2>
        <p style="font-size: 14px; opacity: 0.9;">You are entering a 'locked out' website while on study mode.</p>
      </div>
    </div>
    
    <div style="margin-top: 15px; margin-bottom: 12px;">
      <h3 style="font-size: 16px; margin-bottom: 12px;">Recommended websites</h3>
      <div style="display: flex; gap: 2px; overflow-x: auto; justify-content: space-between;">
        <button class="lockedin-site" data-url="https://lair.education" style="min-width: 65px; height: 65px; background-color: #e1e1e1; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 5px; border: none; cursor: pointer;">
          <img src="${chrome.runtime.getURL('assets/recommended/lair-logo.png')}" alt="Lair Icon" style="width: 30px; height: 30px; margin-bottom: 4px;">
          <span style="color: #444; font-size: 11px; font-weight: 500; text-align: center;">LAIR</span>
        </button>
        <button class="lockedin-site" data-url="https://codechum.com" style="min-width: 65px; height: 65px; background-color: #e1e1e1; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 5px; border: none; cursor: pointer;">
          <img src="${chrome.runtime.getURL('assets/recommended/codechum-logo.ico')}" alt="Codechum Icon" style="width: 30px; height: 30px; margin-bottom: 4px;">
          <span style="color: #444; font-size: 11px; font-weight: 500; text-align: center;">Code</span>
        </button>
        <button class="lockedin-site" data-url="https://teams.microsoft.com" style="min-width: 65px; height: 65px; background-color: #e1e1e1; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 5px; border: none; cursor: pointer;">
          <img src="${chrome.runtime.getURL('assets/recommended/teams-logo.png')}" alt="Teams Icon" style="width: 30px; height: 30px; margin-bottom: 4px;">
          <span style="color: #444; font-size: 11px; font-weight: 500; text-align: center;">Teams</span>
        </button>
        <button class="lockedin-site" data-url="https://notion.so" style="min-width: 65px; height: 65px; background-color: #e1e1e1; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 5px; border: none; cursor: pointer;">
          <img src="${chrome.runtime.getURL('assets/recommended/notion-logo.png')}" alt="Notion Icon" style="width: 30px; height: 30px; margin-bottom: 4px;">
          <span style="color: #444; font-size: 11px; font-weight: 500; text-align: center;">Notion</span>
        </button>
        <button class="lockedin-site" data-url="https://calendar.google.com" style="min-width: 65px; height: 65px; background-color: #e1e1e1; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 5px; border: none; cursor: pointer;">
          <img src="${chrome.runtime.getURL('assets/recommended/gcalendar-logo.png')}" alt="GCalendar Icon" style="width: 30px; height: 30px; margin-bottom: 4px;">
          <span style="color: #444; font-size: 11px; font-weight: 500; text-align: center;">Calendar</span>
        </button>
      </div>
    </div>
    
    <button id="lockedin-proceed-btn" style="background-color: #c14646; color: white; border: none; border-radius: 30px; padding: 8px 0; font-size: 26px; font-weight: bold; cursor: pointer; width: 200px; margin: 8px auto; margin-top: 40px; text-align: center;">
      PROCEED
      <div style="font-weight: 1; color: white; font-size: 12px; opacity: 0.8; text-align: center;">Not recommended</div>
    </button>
  `;
  
  overlay.appendChild(popupContainer);
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