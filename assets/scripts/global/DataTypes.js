export const CASES_COLOR = "#FFFF00";
export const DEATHS_COLOR = "#FF0000";
export const RECOVERS_COLOR = "#00FF00";

export class TotalData {
  #dataTotal = null;
  #dataAllCountries = null;
  constructor() {
  }

  setTotal(data) {
    this.#dataTotal = data;
  }

  setCountries(data) {
    this.#dataAllCountries = data;
  }

  getTotal() {
    return this.#dataTotal;
  }

  getCountries() {
    return this.#dataAllCountries;
  }

  filterCountries(text) {
    const countryRegExp = new RegExp(text.toUpperCase(), "g");
    const result = this.getCountries().filter(element => countryRegExp.exec(element.Country.toUpperCase()));
    return result;
  }
}

export class DataType {
  #dataType = [
    {
      "name": "CASES", 
      "color": CASES_COLOR, 
      "type": "TotalConfirmed", 
      "globalTitle": "Global cases", 
      "countryTitle": "Cases",
      "code": 0
    },
    {
      "name": "DEATHS", 
      "color": DEATHS_COLOR, 
      "type": "TotalDeaths", 
      "globalTitle": "Global deaths", 
      "countryTitle": "Deaths",
      "code": 1
    },
    {
      "name": "RECOVERED", 
      "color": RECOVERS_COLOR, 
      "type": "TotalRecovered", 
      "globalTitle": "Global recovered", 
      "countryTitle": "Recovered",
      "code": 2
    }
  ];
  constructor() {
  }

  getDataType(name) {
    const result = this.#dataType.find(element => element.name === name || element.globalTitle === name);
    return result;
  }

  getDataTypeIdx(name) {
    const element = this.getDataType(name);
    const result = this.#dataType.indexOf(element);
    return result;
  }

  getNextType(name) {
    const index = this.getDataTypeIdx(name);
    if (index >= 0) {
      return index + 1 < this.#dataType.length ? this.#dataType[index + 1] : this.#dataType[0];
    }
    return null;
  }
 }