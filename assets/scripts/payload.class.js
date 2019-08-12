class Offer {
  type = '?';
  name = '?';

  contentID = '?';
  contentType = '?';
  languageISO = '?';
  optedIN = false;
  carouselText = 'Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.';

  atomURL = 'https://atom.green.cpt';
  mriURL = 'https://mri-unreg.whlbase.cpt';
  refineryURL = 'https://kibana.orange.cpt';

  constructor( type, name ){
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

  constructor(data){
    Object.keys(data).forEach(k=>{
      this[k] = data[k];
    });
  }
}

class Product {
  name = null;
  company = null;
  area = null;

  constructor(data){
    Object.keys(data).forEach(k=>{
      this[k] = data[k];
    });
  }
}

class Payload {
  timestamp;
  body;

  offers = [];
  offerSummary;
  offerGroups = [];


  userInfo;
  productInfo;

  builtInChecks = {
    'All Offers In Same Language': true,
    'All Offers have carousel text': false,
    'Content Exists in Atom': null,
    'No Duplicate Offers': true
  };

  raw = {
    request: null,
    body: null
  }

  constructor(body = {}){
    this.timestamp = new Date();
    // this.raw.request = body;
    this.raw.body = body;

    this.offers = body.offers || [];
    this.offerSummary = this._offerSummary();
    this.userInfo = this._userInfo();
    this.productInfo = this._productInfo();
  }

  async init(){

    //get the content
    if( !this.body ){
      await this.getContent( body => {
          this.body = body;
          try{
            this.body = JSON.parse(body);
          }catch{
            console.warn("Could not parse body");
          }
      });
    }s
  }

  _offerSummary(){
      const summary = [];

      this.offers.forEach( offer => {
        let summaryItem = summary.filter( _ =>  _.type == offer.type )[0];
        let group;
        if( !summaryItem ){
          group  = {type: offer.type, offers: []};
          this.offerGroups.push(group);

          summaryItem = {type: offer.type, count: 0};
          summary.push(summaryItem);
        }

        group = this.offerGroups.filter( g => g.type === offer.type )[0];
        group.offers.push( offer );
        summaryItem['count']++;
      });

      return summary.sort( (a,b) => a.count < b.count ? -1 : 1);
    }

  _productInfo(){
    return new Product({
      name: 'jackpotcity',
      company: 'BRE',
      area: 'casino'
    });
  }

  _userInfo(){
    return new User({
      gamingSystemID: '42',
      userID: '8947858',
      sessionID: '00000000-0000-0000-0000-000000000000',
      balance: '$80.84',
      languageISO: 'en',
      countryISO: 'BMU',
      username: 'meltest3'
    });
  }

}
