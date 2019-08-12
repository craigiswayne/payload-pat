/****** START OF CLASSES *****************/

const Offer = function(data){
  this.type = data.type || '?';
  this.name = data.name || '?';

  this.contentID = getUniqueID();
  this.contentType = '?';
  this.languageISO = 'en';

  this.optedIN = true;
  this.carouselText = 'Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.';

  this.atomURL = '#';
  this.mriURL = '#';
  this.refineryURL = '#';

  Object.keys(data).forEach(k=>{
    this[k] = data[k];
  })
};

const User = function(data){
  this.gamingSystemID = data['gamingSystemID'];
  this.userID = data['userID'];
  this.sessionID = data['sessionID'];
  this.balance = data['balance'];
  this.languageISO = data['languageISO'];
  this.countryISO = data['countryISO'];
  this.username = data['username'] || null;

  Object.keys(data).forEach(k=>{
    this[k] = data[k];
  })
}

const Product = function(data){
  this.name = data['name'];
  this.company = data['company'];
  this.area = data['area'];

  Object.keys(data).forEach(k=>{
    this[k] = data[k];
  })
}

/****** START OF COMMON FUNCTIONS *******/
function copyPayload(){
  alert("TODO");
}

function slugify(val){
  return val.toLowerCase().replace(' ','-');
}


// let AccordionItem = function(data){
//   this.id = getUniqueID();
//   this.title = '?';
//   this.description = '';
//
//   Object.keys(data).forEach(k=>{
//     this[k] = data[k];
//   })
// };


let Bait = {
  offerGroups: [],

  offers: [
    new Offer({type:'Calendar'}),
    new Offer({type:'DailyBonus'}),
    new Offer({type:'Calendar'}),
    new Offer({type:'OpenBlock'}),
    new Offer({type:'OpenBlock'}),
    new Offer({type:'OpenBlock'}),
    new Offer({type:'OpenBlock'}),
    new Offer({type:'OpenBlock'})
  ],
  _offerSummary: function(){
    const summary = [];

    Bait.offers.forEach( offer => {
      let summaryItem = summary.find( _ =>  _.type == offer.type );
      let group;
      if( !summaryItem ){
        group  = {type: offer.type, offers: []};
        Bait.offerGroups.push(group);

        summaryItem = {type: offer.type, count: 0};
        summary.push(summaryItem);
      }

      group = Bait.offerGroups.find( g => g.type === offer.type );
      group.offers.push( offer );
      summaryItem.count++;
    });

    summary.push( {type: 'total', count: Bait.offers.length } );
    return summary.sort( (a,b) => a.count < b.count ? -1 : 1);
  },
  // offerSummary: ._offerSummary(),

  productInfo: new Product({
    name: 'jackpotcity',
    company: 'BRE',
    area: 'casino'
  }),

  userInfo: new User({
    gamingSystemID: '42',
    userID: '8947858',
    sessionID: '00000000-0000-0000-0000-000000000000',
    balance: '$80.84',
    languageISO: 'en',
    countryISO: 'BMU',
    username: 'meltest3'
  }),

  builtInChecks: {
    'All Offers In Same Language': true,
    'All Offers have carousel text': false,
    'Content Exists in Atom': null,
    'No Duplicate Offers': true
  }
};
// import UsrMsg from "../../components/UsrMsg";

// Bait.payload = {};
// Bait.payload.offers = {};
// Bait.payload.offers.list = [
//   {
//     type: 'Daily Bonus'
//   },
//   {
//     type: 'Calendar'
//   },
//   {
//     type: 'Open Block'
//   },
//   {
//     type: 'Open Block'
//   },
//   {
//     type: 'Open Block'
//   },
//   {
//     type: 'Open Block'
//   },
//   {
//     type: 'Open Block'
//   }
// ];
// Bait.payload.offers.summary = function(){
//
//   let summary = {
//
//   };
//   let total = 0;
//   Bait.payload.offers.list.forEach( o => {
//     let _offer = new Offer(o);
//     summary[_offer.type] = summary[_offer.type] || {
//       count: 0
//     };
//     summary[_offer.type].count++;
//     total++;
//     summary[_offer.type].title = `<div class="d-flex"><span>${_offer.type}</span><span class="badge badge-secondary ml-auto">${summary[_offer.type].count}</span></div>`;
//   });
//
//   summary.total = {
//     count: total
//   };
//   summary.total = {
//     title: `<div class="d-flex"><span>Total</span><span class="badge badge-secondary ml-auto">${summary.total.count}</span></div>`,
//   };
//
//   return summary;
// };
//
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
//
// Vue.filter('slugify', function (value) {
//   if (!value) return ''
//   value = value.toLowerCase();
//   return value.replace(/[^\w]/gm,'-');
// });
//
// Vue.prototype.$debugger = function(){
//   debugger;
// };
//
// Vue.component('v-accordion', {
//   template: `
//   <div>
//     <h4 v-if="title" class="w-100 text-center">{{title}}</h4>
//     <div class="accordion w-100" :id="parentID">
//         <div v-for="(value, key, index) in items" class="card">
//             <div class="card-header">
//                 <h2 class="mb-0 d-flex">
//                     <button class="btn btn-link collapsed col text-left" type="button" data-toggle="collapse" :data-target="key+'-'+index | slugify" v-html="value.title">{{value.title}}</button>
//                 </h2>
//             </div>
//             <div :id="key+'-'+index | slugify" class="collapse" :data-parent="'#'+parentID" v-if="value.description">
//                 <div class="card-body">
//                     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//                 </div>
//             </div>
//         </div>
//     </div>
//   </div>`,
//   data: function () {
//     return {
//       parentID: this.$attrs.parentID || getUniqueID(),
//       title: this.$attrs.title || '',
//       items: this.$attrs.items || [],
//     }
//   }
// });
//
//
// Vue.component('v-table',{
//   template: `
//     <table class="table table-hover">
//       <thead>
//         <tr>
//           <th v-for="(value, key, index) in items" scope="col">{{key}}</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr v-for="(value, key, index) in items">
//           <th v-for="(v, k, i) in value" v-html="v"></th>
//         </tr>
//       </tbody>
//   </table>`,
//   data: function () {
//     return {
//       items: this.$attrs.items || []
//     }
//   }
// });

function isURL(val){
  const regex = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
  return val.toString().match(regex) !== null;
}

Vue.filter('humanize', function (value,options = {}) {
  if (!value) return null;

  if( isURL(value) ){
    return `<a href="${value}">${options['linkText'] || 'link' }</a>`
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
});

let vOptions = {
  el: '#app',
  data: function(){
    return {
      offers: Bait.offers,
      offerSummary: Bait._offerSummary(), //todo, use Bait.offerSummary instead which is already a constructor
      userInfo: Bait.userInfo,
      productInfo: Bait.productInfo,
      builtInChecks: Bait.builtInChecks,
      slugify: slugify,
      copyPayload: copyPayload
    }
  }
};

let app;
document.addEventListener('DOMContentLoaded', function(){
  app = new Vue(vOptions);
});
