let Offer = function(data){
  this.type = '?';
  this.id = getUniqueID();
  this.name = '?';

  Object.keys(data).forEach(k=>{
    this[k] = data[k];
  })
};

let AccordionItem = function(data){
  this.id = getUniqueID();
  this.title = '?';
  this.description = '';

  Object.keys(data).forEach(k=>{
    this[k] = data[k];
  })
};

let Bait = {};
// import UsrMsg from "../../components/UsrMsg";

Bait.payload = {};
Bait.payload.offers = {};
Bait.payload.offers.list = [
  {
    type: 'Daily Bonus'
  },
  {
    type: 'Calendar'
  },
  {
    type: 'Open Block'
  },
  {
    type: 'Open Block'
  },
  {
    type: 'Open Block'
  },
  {
    type: 'Open Block'
  },
  {
    type: 'Open Block'
  }
];
Bait.payload.offers.summary = function(){

  let summary = {

  };
  let total = 0;
  Bait.payload.offers.list.forEach( o => {
    let _offer = new Offer(o);
    summary[_offer.type] = summary[_offer.type] || {
      count: 0
    };
    summary[_offer.type].count++;
    total++;
    summary[_offer.type].title = `<div class="d-flex"><span>${_offer.type}</span><span class="badge badge-secondary ml-auto">${summary[_offer.type].count}</span></div>`;
  });

  summary.total = {
    count: total
  };
  summary.total = {
    title: `<div class="d-flex"><span>Total</span><span class="badge badge-secondary ml-auto">${summary.total.count}</span></div>`,
  };

  return summary;
};

function getUniqueID(){
  window.uniqueIDs = window.uniqueIDs || [];
  let prefix = 'unique-ID';
  let suffix = 0;
  let UID = `${prefix}-${suffix}`;
  while(document.getElementById(UID) !== null || window.uniqueIDs.indexOf(UID) !== -1){
    suffix++;
    UID = `${prefix}-${suffix}`;
  }
  window.uniqueIDs.push(UID);
  return UID;
}

Vue.filter('slugify', function (value) {
  if (!value) return ''
  value = value.toLowerCase();
  return value.replace(/[^\w]/gm,'-');
});

Vue.prototype.$debugger = function(){
  debugger;
};

Vue.component('v-accordion', {
  template: `
  <div>
    <h4 v-if="title" class="w-100 text-center">{{title}}</h4>
    <div class="accordion w-100" :id="parentID">
        <div v-for="(value, key, index) in items" class="card">
            <div class="card-header">
                <h2 class="mb-0 d-flex">
                    <button class="btn btn-link collapsed col text-left" type="button" data-toggle="collapse" :data-target="key+'-'+index | slugify" v-html="value.title">{{value.title}}</button>
                </h2>
            </div>
            <div :id="key+'-'+index | slugify" class="collapse" :data-parent="'#'+parentID" v-if="value.description">
                <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
            </div>
        </div>
    </div>
  </div>`,
  data: function () {
    return {
      parentID: this.$attrs.parentID || getUniqueID(),
      title: this.$attrs.title || '',
      items: this.$attrs.items || [],
    }
  }
});


Vue.component('v-table',{
  template: `
    <table class="table table-hover">
      <thead>
        <tr>
          <th v-for="(value, key, index) in items" scope="col">{{key}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key, index) in items">
          <th v-for="(v, k, i) in value" v-html="v"></th>
        </tr>
      </tbody>
  </table>`,
  data: function () {
    return {
      items: this.$attrs.items || []
    }
  }
});
let vOptions = {
  el: '#app',
  data: function(){

    let data = Bait;
    // data.offerSummary = Bait.payload.offers.summary.map(_=>new AccordionItem(_));
    return data;
  }
};

let app;
document.addEventListener('DOMContentLoaded', function(){
  app = new Vue(vOptions);
});
