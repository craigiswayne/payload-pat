var PanelWindow;

chrome.devtools.network.onRequestFinished.addListener(function(request) {
    if( !PanelWindow ){
      return;
    }

    PanelWindow['payloads'] = PanelWindow['payloads'] || [];

    const regex = /\/api\/messages\/([0-9]{2,3})-([0-9]{4,})/gm;
    if( !request.request.url.match(regex) ){
      return;
    }

    //Only Cater for Get methods
    if( request.request.method !== 'GET'){
      return;
    }

    let payload = new Payload(request);
    payload.getContent = request.getContent;

    PanelWindow.payloads.push(payload);
    // debugger;
    // request.getContent(function(body){
    //   debugger;
    //     PanelWindow.payloads.push(new Payload(body));
    // });
});

chrome.devtools.panels.create('HLS', '/assets/images/logo.png', 'panel.html',
  function(extensionPanel) {
    extensionPanel.onShown.addListener(function(panelWindow) {
        PanelWindow = panelWindow;
    });
});