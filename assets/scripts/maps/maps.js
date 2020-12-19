import { mapArea } from "../../../main.js";
import {codes} from "./countryCodes.js";
import {insertMap} from "./highChartMap.js";

export const mapsData = {
    cases: {'name':'confirmed_cases', 'text':'Confirmed cases','json':'TotalConfirmed','color':'red', 'state':'active'},
    deaths: {'name':'confirmed_deaths', 'text':'Confirmed deaths','json':'TotalDeaths','color':'black','state':'none'},
    recovered:{'name':'confirmed_recovered', 'text':'Confirmed recovered','json':'TotalRecovered','color':'green','state':'none'}
}
export class MapArea {
    constructor()  {
        this.mapArea = document.querySelector('[data-map]')
    }
    createMapContainer() {
        const mapContainer = document.createElement('div')
        mapContainer.setAttribute('data-map-container','')
        this.mapArea.appendChild(mapContainer)
        return this
    }
    changeMap(){
        console.log('Change map!')
    }

}
export class InteractiveMap {
    constructor(mapObj){
        this.mapObj = mapObj
        this.mapContainer = document.querySelector('[data-map]')
        this.mapWrap = document.createElement('div')
        this.name = this.mapObj.name;
        this.json = this.mapObj.json;
        this.color = this.mapObj.color;
        this.data = null;
        this.buffer = null;
        
    }
    createMapWrap() {
        this.mapWrap.setAttribute('id',`map_${this.name}`)
        this.mapContainer.appendChild(this.mapWrap) 
        return this
    }
    renderMap(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        fetch("https://api.covid19api.com/summary", requestOptions)
          .then(response => response.json())
          .then(json => this.buffer = json.Countries)
          .then(() => this.handleData())
          .then(() => {
              insertMap(this.data,this.mapObj)
              this.buffer = null;
            })
          .catch(error => console.log('error', error));
    }
    handleData() {
            var handledData = this.buffer.map(item => item = {
                code3: '',
                z: item[this.json],
                code: item.CountryCode,
            })
            for(let i = 0; i < handledData.length;i++) {
                for(let j = 0; j < codes.length; j++){
                    if(handledData[i].code === codes[j].code) {
                    handledData[i].code3 = codes[j].code3
                    }
                }
            }
            this.data = handledData.filter(item => item.code3 !== '')
    }

}
export class MapTab {
    constructor(objMap){
        this.obj = objMap 
        this.name = objMap.name;
        this.text = objMap.text;
        this.state = objMap.state;
        this.mapContainer= document.querySelector('[data-map-container]')
    }
    createTab() {
        const tab = document.createElement('a')
        tab.setAttribute('data-tab',this.name)
        tab.textContent = this.text;
        this.activateDefaultTab (tab)
        // tab.href = "#";
        this.mapContainer.appendChild(tab)
        this.setEventListenerForMapChange(this.name)
        return this
    }
    setEventListenerForMapChange(tabName){
        const currentTab = document.querySelector(`a[data-tab = "${tabName}"]`)
        currentTab.addEventListener('click', () => {
            this.chooseAnotherTab(currentTab)
        })
    }
    activateDefaultTab (tab) {
        this.state === 'active' ? tab.classList.toggle('active') : null;
    }
    activateCurrentTab (currentTab) {
        currentTab.classList.add('active')
    }
    deactivateAnotherTab(){
        const activeTab = document.querySelector('.active')
        activeTab.classList.remove('active')
    }
    chooseAnotherTab(currentTab) {
        this.deactivateAnotherTab()
        this.activateCurrentTab (currentTab)
        console.log(mapArea.changeMap())
    }


}