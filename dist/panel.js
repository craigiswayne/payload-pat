function copyVariable(variable){
  variable = variable || Net.selected;
  let textarea = document.body.appendChild(document.createElement('textarea'));
  textarea.value = JSON.stringify(variable, undefined, 2);
  textarea.select();
  document.execCommand('copy');
  textarea.parentNode.removeChild(textarea);
  alert('Copied!');
}

function slugify(val){
  return val.toLowerCase().replace(' ','-');
}

function isURL(val){
  let out = val.toString();
  const regex = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
  return out.match(regex) !== null;
}

function humanize( value ){
  if (!value) return null;

  if( isURL(value) ){
    return `<a href="${value}">link</a>`
  }

  //Boolean checks
  if( value == 'true' || value === true ){
    return '<span class="fa fa-check"></span>';
  }

  if( value == 'false' || value === false){
    return '<span class="fa fa-times"></span>';
  }

  if( value === '?'){
    return '<span class="fa fa-question"></span>';
  }

  return value;
}

function viewPayload(event){
  const payload = window.payloads[event.srcElement.selectedIndex];
  payload.init();
  Net.selected = payload;
}

function addTestPayload(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(this.responseText);
      const payload = new Payload();
      payload.raw.body = json
      window.payloads.push(payload);
    }
  };
  xhttp.open("GET", "./assets/payload.json", true);
  xhttp.send();
}

//ensure that the payloads store is available and ready to accept new values
window['payloads'] = window['payloads'] || [];

const Net = {
  selected: null,
  sessionInfo: {}
};

const vOptions = {
    el: '#app',
    data: function () {
        return {
            Net: Net,
            payloads: window.payloads,
            slugify: slugify,
            humanize: humanize,
            copyVariable: copyVariable,
            viewPayload: viewPayload,
            addTestPayload: addTestPayload
        };
    }
};

let app;
document.addEventListener('DOMContentLoaded', function () {
    app = new Vue(vOptions);
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "sessionInfo" ) {
      Net.sessionInfo = request.sessionInfo
    }
  }
)