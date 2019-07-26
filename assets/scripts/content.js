// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = document.querySelector("a[href^='http']").getAttribute("href");

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});

    }
  }
);
