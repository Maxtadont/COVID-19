import {setNewName} from './handlingData.js'
import {getMainProperties} from './handlingData.js'
import {indicatorTable} from '../../../main.js'
import {apiReserv} from "./APIreserv.js"
export class Table {
    constructor() {
        this.tableContainer = document.querySelector('[data-table]')
        this.tableContent = document.createElement('div')
        this.tableHeading = document.createElement('h1')
        this.subHeading = document.createElement('h3')
        this.dataBuffer = null;
        this.handledData = {};
        this.unitsMeasures = 'person'
        this.currentCode = null;
        this.hiddenToggler = document.querySelector('[data-table-backtoggler]')
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
        this.tableContent.setAttribute('data-table-content','')
        this.tableHeading.setAttribute('data-table-heading','')
        this.tableContainer.appendChild(this.tableHeading)
        this.tableContainer.appendChild(this.subHeading)
        this.tableContainer.appendChild(this.tableContent)
        this.addTogglers()
        this.getJSONData()
        .then(() => this.handleData())
        .then(() => this.addGlobalIndicators(this.handledData.Global))
        .catch(error => {
            this.dataBuffer = apiReserv
            this.handleData()
            this.addGlobalIndicators(this.handledData.Global)
            console.log('error', error)
        });
    }
    addGlobalIndicators(obj) {
        this.tableContent.innerHTML = ''
        this.subHeading.textContent = `unit of measures, ${this.unitsMeasures}`
        this.tableHeading.textContent = 'Global COVID-19 statistic'
        this.hideToggler(document.querySelector('[data-table-backtoggler]'))
        const globalObj = obj;
        for(let indicator in globalObj) {
            this.tableContent.appendChild(new Indicator(indicator,globalObj[indicator],globalObj['Population']).createIndicator())
        }
    }
    addCountryIndicators(code) {
        this.tableContent.innerHTML = ''
        this.currentCode = code;
        this.subHeading.textContent = `unit of measures, ${this.unitsMeasures}`
        const countryObj = this.handledData.Countries
        this.makeVisibleToggler(document.querySelector('[data-table-backtoggler]'))
        for(let country in countryObj) {
            if(countryObj[country].code === code){
                this.tableHeading.textContent = 'COVID-19 statistics by country'
                for(let indicator in countryObj[country]){
                    if(indicator !== 'code' && indicator !== 'country'){
                        this.tableContent.appendChild(new Indicator(indicator,countryObj[country][indicator],countryObj[country]['Population']).createIndicator())
                    }
                }
            }
        }
    }
    addTogglers() {
        const toggler = new Toggler().createToggler()
        return toggler
    }
    hideToggler(toggler) {
        toggler.style.display = 'none';
    }
    makeVisibleToggler(toggler) {
        toggler.style.display = 'flex'
    }
    handleData() {
        this.handledData.Global = setNewName(this.dataBuffer.Global)
        this.handledData.Countries = getMainProperties(this.dataBuffer.Countries)
    }
}

export class Indicator {
    constructor(name,value,population){
        this.name = name;
        this.value = value
        this.population = population
    }
    createIndicator() {
        if(indicatorTable.unitsMeasures === 'cases per 100k persons') {
            this.value = ((this.value/parseFloat(this.population)) * 100000).toFixed(2)
            
        }
        const row = document.createDocumentFragment()
        const indicator = document.createElement('div')
        if(this.name !== 'Population' ) {
            indicator.innerHTML = `<div class=${this.name.toLowerCase()}>${this.name}<div><div class=${this.name.toLowerCase()}>${this.value}</div>`
        }
        row.appendChild(indicator)
        return row
    }


    
}

export class Toggler {
    constructor(){
        this.tableContainer = document.querySelector('[data-table]')
    } 
    createToggler() {
        const toggler = document.createElement('div')
        toggler.setAttribute('data-table-togglers', '')
        const backToggler = '<div data-table-backtoggler><span data-table-toggler-subtitle>Back to global indicators</span><i class="fas fa-chevron-circle-left" data-table-backtoggler-btn ></i></div>'
        const unitToggler ='<div data-table-unittoggler><span data-table-toggler-subtitle>Change unit of measure</span><i class="fas fa-chevron-circle-right" data-table-unittoggler-btn ></i></div>'
        toggler.innerHTML = backToggler + unitToggler
        this.setEventListenerForToggling(this.tableContainer)
        this.tableContainer.appendChild(toggler)
        return this
    }
    setEventListenerForToggling(parent) {
        parent.addEventListener('click', (e) => {
            if(e.target === document.querySelector('[data-table-backtoggler-btn]')) {
                this.backToGlobalIndicators(e.target);
            }
            else if(e.target === document.querySelector('[data-table-unittoggler-btn]')){
                this.changeUnit()
            }
            
        })
    }
    changeUnit() {
    
        if(indicatorTable.unitsMeasures === 'person') {
            indicatorTable.unitsMeasures = 'cases per 100k persons';
        } else {
            indicatorTable.unitsMeasures = 'person';
        }
        if(indicatorTable.tableHeading.textContent === 'Global COVID-19 statistic'){
            indicatorTable.addGlobalIndicators(indicatorTable.handledData.Global)
        } else {
            indicatorTable.addCountryIndicators(indicatorTable.currentCode)
        }
    }
    backToGlobalIndicators(target) {
        indicatorTable.addGlobalIndicators(indicatorTable.handledData.Global)
        indicatorTable.hideToggler(target.parentNode)
        indicatorTable.hiddenToggle = target.parentNode;
    }
    
                                                   
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               