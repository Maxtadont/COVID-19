export class Table {
    constructor() {
        this.tableContainer = document.querySelector('[data-table]')
        this.dataBuffer = null;
    }
    async getJSONData() {
        var requestOptions = { 
            method: 'GET',
            redirect: 'follow'
          };
           const response = await fetch("https://api.covid19api.com/summary", requestOptions)
           this.dataBuffer = await response.json()
           return this.dataBuffer
    }
    createTable() {
        this.getJSONData()
        .then(() => this.addGlobalIndicators(this.dataBuffer.Global))
    }
    addGlobalIndicators(obj) {
        const countryObj = obj;
        for(let indicator in countryObj) {
            this.tableContainer.appendChild(new Indicator(indicator,countryObj[indicator]).creatGlobalIndicator())
        }
    }
    addTogglers() {
        
    }
}

export class Indicator {
    constructor(name,value){
        this.name = name;
        this.value = value
    }
    creatGlobalIndicator() {
        const row = document.createDocumentFragment()
        const indicator = document.createElement('div')
        indicator.innerHTML = `<span>${this.name}</span><span>${this.value/100000}</span>`
        row.appendChild(indicator)
        return row
    }

    
}

export class Toggler {
    constructor(){

    } 
}