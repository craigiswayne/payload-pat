function copyVariable(variable){
  variable = variable || window.HLS.selected;
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

function viewPayload(index){
  const payload = window.HLS.payloads[index];
  payload.init();
  window.HLS.selected = payload;
  window.HLS.selectedIndex = index+1;
}

function addTestPayload(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(this.responseText);
      const payload = new Payload();
      payload.raw.body = json
      window.HLS.payloads.push(payload);
    }
  };
  xhttp.open("GET", "./assets/payload.json", true);
  xhttp.send();
}

//ensure that the payloads store is available and ready to accept new values
window['HLS'] = window['HLS'] || {
  payloads: [],
  regex: /\/api\/messages\/([0-9]{2,3})-([0-9]{4,})/gm, //must match the one used in devtools.js
  selected: null,
  selectedIndex: null,
  sessionInfo: {}
};

Vue.filter('niceTime', function(value) {
  if (!value) {
    return value;
  }

  return `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
});

const vOptions = {
    el: '#app',
    data: function () {
        return {
            HLS: window.HLS,
            payloads: window.HLS.payloads,
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

if( chrome && chrome.runtime && chrome.onMessage ){
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "sessionInfo" ) {
        window.HLS.sessionInfo = request.sessionInfo
      }
    }
  )
}
