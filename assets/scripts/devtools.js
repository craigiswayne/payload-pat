chrome.devtools.network.onRequestFinished.addListener(function(request) {
        logger(request.request.url);
});

function logger(data){
  chrome.devtools.inspectedWindow.eval(
      'console.log("Logger: ", unescape("' +escape(data) + '"))');
}


var PanelWindow;

chrome.devtools.network.onRequestFinished.addListener(function(request) {
    if( !PanelWindow ){
      return;
    }

    let preText = PanelWindow.document.body.appendChild(document.createElement('pre'));
    preText.innerHTML = JSON.stringify(request);

    PanelWindow.document.body.appendChild(document.createElement("br"));

    request.getContent(function(c, e){
        let preText2 = PanelWindow.document.body.appendChild(document.createElement('pre'));
        preText2.innerHTML = c;
    })

    PanelWindow.document.body.appendChild(document.createElement("hr"));
});


chrome.devtools.panels.create("Pascal", "/assets/images/icon.png", "panel.html",
  function(extensionPanel) {
    extensionPanel.onShown.addListener(function(panelWindow) {
        PanelWindow = panelWindow;
    });
});


