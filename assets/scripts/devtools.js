let PanelWindow;

chrome.devtools.network.onRequestFinished.addListener(function(request) {
  if (!PanelWindow) {
    return;
  }

  PanelWindow['HLS'] = PanelWindow['HLS'] || {
    payloads: [],
    // must match the one used in panel.js
    regex: /\/api\/messages\/([0-9]{2,3})-([0-9]{4,})/gm
  };

  if ( !request.request.url.match(PanelWindow.HLS.regex) ) {
    return;
  }

  // Only Cater for Get methods
  if (request.request.method !== 'GET') {
    return;
  }

  const payload = new Payload(request);
  payload.getContent = request.getContent;

  PanelWindow.HLS.payloads.push(payload);
  // debugger;
  // request.getContent(function(body){
  //   debugger;
  //     PanelWindow.payloads.push(new Payload(body));
  // });
});

const Panel = {
  name: 'HLS',
  icon: '/assets/images/logo.png',
  view: 'views/panel.html'
};

chrome.devtools.panels.create(Panel.name, Panel.icon, Panel.view,
    function(extensionPanel) {
      extensionPanel.onShown.addListener(function(panelWindow) {
        PanelWindow = panelWindow;
      });
    });
