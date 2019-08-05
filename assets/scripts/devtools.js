// //test
//
// let panel = chrome.devtools.panels.create("Bait", "assets/images/logo.png", "panel.html", function(panel) {
//
// });
//
// console.log("Panel", panel);
//
// chrome.devtools.network.onRequestFinished.addListener(function(result) {
//
//     let regEx = `/api/messages/([0-9]{2,3})-([0-9]{4,})`;
//     if( result.request.url.match(regEx) ){
//       debugger;
//     }
//     chrome.devtools.inspectedWindow.eval('console.log("Request Finished: " + unescape("' +escape(result.request.url) + '"))');
// });
//
// // chrome.webRequest.onBeforeRequest.addListener(function(details) {
// //
// //     console.log("Bait", details);
// //     return {l
// //       cancel: details.url.indexOf("://www.evil.com/") != -1
// //     };
// // },
// // {urls: ["<all_urls>"]},
// // ["blocking"]);

chrome.devtools.network.onRequestFinished.addListener(function(request) {
        logger(request.request.url);
});

function logger(data){
  chrome.devtools.inspectedWindow.eval(
      'console.log("Logger: ", unescape("' +escape(data) + '"))');
}


var PanelWindow;

function requestToDetails(){
  let accordion = PanelWindow.document.createElement('details');
  let summary = accordion.appendChild(PanelWindow.document.createElement('summary'));
  summary.innerHTML = request.request.url;
  let preText = accordion.appendChild(PanelWindow.document.createElement('pre'));
  preText.setAttribute("style", "max-height:200px");
  preText.innerHTML = JSON.stringify(request, undefined, 2);
  return accordion;
}

chrome.devtools.network.onRequestFinished.addListener(function(request) {
    if( !PanelWindow ){
      return;
    }

    // const regex = /\/api\/messages\/([0-9]{2,3})-([0-9]{4,})/gm;
    //
    // if( !request.request.url.match(regex) ){
    //   return;
    // }

    let accordion = PanelWindow.document.createElement('details');
    let summary = accordion.appendChild(PanelWindow.document.createElement('summary'));
    summary.innerHTML = request.request.url;
    let preText = accordion.appendChild(PanelWindow.document.createElement('pre'));
    preText.setAttribute("style", "max-height:200px");
    preText.innerHTML = JSON.stringify(request, undefined, 2);



    PanelWindow.document.body.appendChild(accordion);
    PanelWindow.document.body.appendChild(document.createElement("br"));
    PanelWindow.document.body.appendChild(document.createElement("hr"));

    // request.getContent(function(c, e){
    //     let preText2 = PanelWindow.document.body.appendChild(document.createElement('pre'));
    //     preText2.innerHTML = c;
    // })


});


chrome.devtools.panels.create("Pascal", "/assets/images/logo.png", "panel.html",
  function(extensionPanel) {
    extensionPanel.onShown.addListener(function(panelWindow) {
        PanelWindow = panelWindow;
    });
});
