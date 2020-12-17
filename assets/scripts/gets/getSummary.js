export class APIdata {
  constructor() {
    this.requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    this.urlSummary = "https://api.covid19api.com/summary";
    this.total = null;
  }

  getTotal() {
    let dt;
    fetch(this.urlSummary, this.requestOptions)
      .then(response => response.json())
      .then(result => {
        this.total = result;       
      })
      .catch(error => {
        this.total = error
      });
    return this.total;
  }
}
