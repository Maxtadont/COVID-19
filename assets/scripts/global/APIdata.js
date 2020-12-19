import {countries} from "./Countries.js";

export class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(data) {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}

export class APIdata {
  constructor() {
    this.requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    this.urlSummary = "https://api.covid19api.com/summary";
    
    this.dataAll = null;
    this.dataTotal = null;
    this.dataCountries = null;
  }

  getAPIData(data) {
    this.dataAll = data;
    this.dataTotal = data.Global;
    this.dataCountries = data.Countries;
    document.write(`<div>${JSON.stringify(this.dataCountries)}</div>`);
    //console.log(this.dataTotal.TotalConfirmed);
    //console.log(this.dataCountries[0]);
  }

  showAPIData(data) {
    return data;
  }

  async request() {
    await fetch(this.urlSummary, this.requestOptions)
      .then(response => response.json())
      .then((data) => {        
        localStorage.setItem("datajson", JSON.stringify(data));
        this.getAPIData(data);        
      })
      .catch((error) => {
        console.log("error:" + error);
        this.error = error;
      });
  }
}
