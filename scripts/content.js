chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received', request, sender, sendResponse );
  if (request.message === 'clicked_browser_action') {
    const firstAnchor = document.querySelector('a[href^="http"]');
    firstHref = firstAnchor.getAttribute('href');
    chrome.runtime.sendMessage({'message': 'open_new_tab', 'url': firstHref});
  }

  if (request.message === 'getSessionInfo') {
    chrome.runtime.sendMessage({
      'message': 'sessionInfo', 'value': window.sessionStorage
    });
  }
});
