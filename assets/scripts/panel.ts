import { copyVariable, slugify, isURL, humanize } from './helper.service';

interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}

class Offer {
  type: string = '?';
  name: string = '?';

  contentID: string = '?';
  contentType: string = '?';
  languageISO: string = '?';
  optedIN: boolean = false;
  carouselText = 'Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.';

  atomURL = 'https://atom.green.cpt';
  mriURL = 'https://mri-unreg.whlbase.cpt';
  refineryURL = 'https://kibana.orange.cpt';

  constructor( type:string, name: string ){
    this.name = name;
    this.type = type;
  }
}

class User {
  gamingSystemID = null;
  userID = null;
  sessionID = null;
  balance = null;
  languageISO = null;
  countryISO = null;
  username = null;
}

class Product {
  name = null;
  company = null;
  area = null;
}

class PayLoad {}

class Bait {
  offers: Offer[] = [
    new Offer( 'Calendar', 'Calendar FLG Unlimited 1' ),
    new Offer( 'Calendar', 'Calendar FLG Unlimited 1' ),
    new Offer( 'DailyBonus', 'Daily Bonus 1' ),
    new Offer( 'Calendar', 'Calendar FLG Unlimited 2' ),
    new Offer( 'OpenBlock', 'FLG OpenBlock 1' ),
    new Offer( 'OpenBlock', 'FLG OpenBlock 2' ),
    new Offer( 'OpenBlock', 'FLG OpenBlock 3' ),
    new Offer( 'OpenBlock', 'FLG OpenBlock 4' ),
    new Offer( 'OpenBlock', 'FLG OpenBlock 5' )
  ];

//
//
//   offerGroups: [],

//   _offerSummary: function(){
//     const summary = [];
//
//     Bait.offers.forEach( offer => {
//       let summaryItem = summary.filter( _ =>  _.type == offer.type );
//       let group;
//       if( !summaryItem ){
//         group  = {type: offer.type, offers: []};
//         Bait.offerGroups.push(group);
//
//         summaryItem = {type: offer.type, count: 0};
//         summary.push(summaryItem);
//       }
//
//       group = Bait.offerGroups.find( g => g.type === offer.type );
//       group.offers.push( offer );
//       summaryItem['count']++;
//     });
//
//     summary.push( {type: 'total', count: Bait.offers.length } );
//     return summary.sort( (a,b) => a.count < b.count ? -1 : 1);
//   },
//   // offerSummary: ._offerSummary(),
//
//   productInfo: new Product({
//     name: 'jackpotcity',
//     company: 'BRE',
//     area: 'casino'
//   }),
//
//   userInfo: new User({
//     gamingSystemID: '42',
//     userID: '8947858',
//     sessionID: '00000000-0000-0000-0000-000000000000',
//     balance: '$80.84',
//     languageISO: 'en',
//     countryISO: 'BMU',
//     username: 'meltest3'
//   }),
//
//   builtInChecks: {
//     'All Offers In Same Language': true,
//     'All Offers have carousel text': false,
//     'Content Exists in Atom': null,
//     'No Duplicate Offers': true
//   }
// };
//
// const vOptions = {
//   el: '#app',
//   data: function(){
//     return {
//       offers: Bait.offers,
//       offerSummary: Bait._offerSummary(), //todo, use Bait.offerSummary instead which is already a constructor
//       userInfo: Bait.userInfo,
//       productInfo: Bait.productInfo,
//       builtInChecks: Bait.builtInChecks,
//       slugify: slugify,
//       humanize: humanize,
//       copyPayload: copyPayload
//     }
//   }
};

let app;
document.addEventListener('DOMContentLoaded', function(){
//   app = new Vue(vOptions);
});
