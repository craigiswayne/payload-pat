class Offer {
  guid;

  name;
  type;

  content = {
    type: null,
    ID: null
  };

  productType;

  languageISO;
  optedIN = false;
  carouselText = 'Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.Lots of text that should be wrapped.';

  atomURL = 'https://atom.green.cpt';
  mriURL = 'https://mri-unreg.whlbase.cpt';
  refineryURL = 'https://kibana.orange.cpt';

  raw;

  //raw input comes straight from payload
  constructor( raw = {} ){
    this.raw = raw;

    this.guid = raw.PromoGuid;

    this.name = raw.Data.PromotionContent.PromoName;
    this.type = raw.Data.PromotionContent.PromotionDetails.EligibilityType;
    this.content.type = raw.Data.PromotionContent.PromotionDetails.ContentType;
    this.content.ID = raw.Data.ContentId;

    this.productType = raw.Data.PromotionContent.PromotionDetails.ProductType;
  }
}

class User {
  //from payload
  gamingSystemID = null;
  userID = null;
  sessionID = null;

  //from session
  languageISO = null;
  countryISO = null;

  //from ui
  balance;
  username;

  constructor(data = {}){
    Object.keys(data).forEach(k=>{
      this[k] = data[k];
    });

    this.username = document.querySelector(".username") ? document.querySelector(".username").innerText : null;
    this.balance =  document.querySelector(".navbar-balance-amount") ? document.querySelector(".navbar-balance-amount").innerText : null;

    this.languageISO = window.sessionStorage.language;
    this.countryISO = window.sessionStorage.sessionCountry;

    if( chrome && chrome.tabs && chrome.query ){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "getSessionInfo"});
      });
    }
  }
}

//All info fetched from session storage
class Product {
  name = null;
  company = null;
  area = null;

  constructor(){
    this.name = window.sessionStorage.brandName;
    this.company = window.sessionStorage.company;
    this.area = window.sessionStorage.casinoState;
  }
}

class Payload {
  //auto generated
  timestamp;

  //from payload
  offers = [];

  _offerSummary;
  get offerSummary(){

    if( this._offerSummary ){
      return this._offerSummary;
    }

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

    this._offerSummary = summary.sort( (a,b) => a.count < b.count ? -1 : 1);
    return this._offerSummary;
  };

  offerGroups = [];

  //from payload
  userInfo = {
    userID: null,
    gamingSystemID: null,
    sessionID: null
  };

  _productInfo;
  get productInfo(){
    if( this._productInfo ){
      return this._productInfo;
    }

    this._productInfo = new Product();
    return this._productInfo;
  };

  builtInChecks = {
    'All Offers In Same Language': true,
    'All Offers for Same Product': true,
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
  }

  init(){
    this.getBody();
  }

  getBody(){

    if( !!this.raw.body ){
      this.interpretBody();
      return this.raw.body;
    }

    //get the content
    this.getContent( body => {
        try{
          this.raw.body = JSON.parse(body);
          this.interpretBody();
        }catch{
          console.warn("Could not parse body");
        }
    });
  }

  interpretBody(){

    if( !this.raw.body.hasOwnProperty('list') ){
      return this.offers;
    }

    const playeroffers = this.raw.body.list.find( i => i.hasOwnProperty('modelType') && i.modelType === 'playeroffers' );

    if( !playeroffers ){
        console.error("Could not find the playeroffers response");
        return;
    }

    let json;
    try{
      json = JSON.parse(playeroffers.body);
    }catch{
      console.error("Failed to parse JSON");
      return;
    }


    //User Info
    this.userInfo = new User();
    this.userInfo.userID  = json.PlayerKey.UserId;
    this.userInfo.gamingSystemID  = json.PlayerKey.GamingSystemId;
    this.userInfo.sessionID = playeroffers.sessionId;

    this.offers = [];
    
    json.PlayerOffers.forEach( o => {
      this.offers.push( new Offer(o) );
    });
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
