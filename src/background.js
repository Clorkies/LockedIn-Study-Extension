chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ studyMode: true });
});