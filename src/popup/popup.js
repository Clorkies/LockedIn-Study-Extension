document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('study-mode-toggle');
  
  chrome.storage.local.get(['studyMode'], function(data) {
    toggle.checked = data.studyMode !== false;
  });
  
  toggle.addEventListener('change', function() {
    chrome.storage.local.set({ studyMode: toggle.checked });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('study-mode-toggle');
  
  chrome.storage.local.get(['studyMode'], function(data) {
    toggle.checked = data.studyMode !== false;
  });
  
  toggle.addEventListener('change', function() {
    chrome.storage.local.set({ studyMode: toggle.checked });
  });
});
