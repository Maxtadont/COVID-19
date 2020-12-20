export const CASES_COLOR = "#FFFF00";
export const DEATHS_COLOR = "#FF0000";
export const RECOVERS_COLOR = "#008000";

export class DataType {
  #dataType = [
    {
      "name": "CASES", 
      "color": CASES_COLOR, 
      "type": "TotalConfirmed", 
      "globalTitle": "Global cases", 
      "countryTitle": "Cases",
      "code": 1
    },
    {
      "name": "DEATHS", 
      "color": DEATHS_COLOR, 
      "type": "TotalDeaths", 
      "globalTitle": "Global deaths", 
      "countryTitle": "Deaths",
      "code": 2
    },
    {
      "name": "RECOVERED", 
      "color": RECOVERS_COLOR, 
      "type": "TotalRecovered", 
      "globalTitle": "Global recovered", 
      "countryTitle": "Recovered",
      "code": 3
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