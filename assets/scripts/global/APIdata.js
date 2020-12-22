import * as MainElements from "../../../main.js";
import * as LocalData from "./countries_test.js";
export class APIData {
  constructor(dataStore, dataType) {
    this.requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    this.urlSummary = "https://api.covid19api.com/summary";
    this.dataStore = dataStore;
    this.dataType = dataType;
  }

  getAPIData(data) {
    this.dataStore.setTotal(data.Global);
    this.dataStore.setCountries(data.Countries);
    const dataTotal = this.dataStore.getTotal();
    const dataCountries = this.dataStore.getCountries();
    const dataType = this.dataType.getDataType("CASES");
    MainElements.totalBlock.setDataType(dataType, dataTotal[`${dataType.type}`]);
    MainElements.totalTable.addCountries(dataCountries, dataType);  
  }

  requestTotal() {
    fetch(this.urlSummary, this.requestOptions)
      .then(response => response.json())
      .then((data) => {        
        this.getAPIData(data);        
      })
      .catch((error) => {
        this.getAPIData(LocalData.coutriesTst);
        console.log("error:" + error);
        this.error = error;
      });
  }
}
