var PanelWindow;

chrome.devtools.network.onRequestFinished.addListener(function(request) {
    if( !PanelWindow ){
      return;
    }

    PanelWindow['HLS'] = PanelWindow['HLS'] || {
      payloads: [],
      regex: /\/api\/messages\/([0-9]{2,3})-([0-9]{4,})/gm //must match the one used in panel.js
    };

    if( !request.request.url.match(PanelWindow.HLS.regex) ){
      return;
    }

    //Only Cater for Get methods
    if( request.request.method !== 'GET'){
      return;
    }

    let payload = new Payload(request);
    payload.getContent = request.getContent;

    PanelWindow.HLS.payloads.push(payload);
    // debugger;
    // request.getContent(function(body){
    //   debugger;
    //     PanelWindow.payloads.push(new Payload(body));
    // });
});

chrome.devtools.panels.create('HLS', '/assets/images/logo.png', 'views/panel.html',
  function(extensionPanel) {
    extensionPanel.onShown.addListener(function(panelWindow) {
        PanelWindow = panelWindow;
    });
});
