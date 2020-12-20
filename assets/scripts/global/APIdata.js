import * as MainElements from "../../../main.js"

export class APIData {
  constructor() {
    this.requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    this.urlSummary = "https://api.covid19api.com/summary";
    this.dataTotal = null;
    this.countries = null;
  }

  getAPIData(data) {
    this.dataTotal = data.Global;
    this.countries = data.Countries;    
    const dataType = MainElements.globalDataType.getDataType("CASES");
    MainElements.totalBlock.setDataType(dataType, this.dataTotal[`${dataType.type}`]);
    MainElements.totalTable.addCountries(this.countries, dataType);  
  }

  requestTotal() {
    fetch(this.urlSummary, this.requestOptions)
      .then(response => response.json())
      .then((data) => {        
        this.getAPIData(data);        
      })
      .catch((error) => {
        console.log("error:" + error);
        this.error = error;
      });
  }
}
