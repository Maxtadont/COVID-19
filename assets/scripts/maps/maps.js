import { mapArea } from "../../../main.js";
import { newChart } from "../../../main.js";
import { codes } from "./countryCodes.js";
import { insertMap } from "./highChartMap.js";

export const mapsData = { 
    cases: { 
        'name': 'confirmed_cases',
        'text': 'Confirmed cases', 
        'json': 'TotalConfirmed', 
        'color': '#FFFF00', 'state':'active' 
    },
    deaths: { 
        'name': 'confirmed_deaths', 
        'text': 'Confirmed deaths',
        'json': 'TotalDeaths',
        'color': '#FF0000',
        'state': 'none' 
    },
    recovered: { 
        'name': 'confirmed_recovered',
        'text': 'Confirmed recovered', 
        'json': 'TotalRecovered',
        'color': '#008000',
        'state': 'none' 
    }
}
export class MapArea { 
    constructor() { 
        this.mapArea = document.querySelector('[data-map]')
    }
    createMapContainer() { 
        const mapContainer = document.createElement('div')
        mapContainer.setAttribute('data-map-container','')
        this.mapArea.appendChild(mapContainer)
        return this
    }
    changeMap(currentMap) { 
        this.deactivateAnotherMap()
        this.activateCurrentMap(currentMap)
    }
    activateCurrentMap(currentMap) {
        currentMap.classList.add('active_map')
    }
    deactivateAnotherMap() { 
        const activeMap = document.querySelector('.active_map')
        activeMap.classList.remove('active_map')
    }
    chooseCountry(code) { 
        document.querySelectorAll('.chosen_country').forEach(item => item.classList.remove('chosen_country'))
        const countries = document.querySelectorAll(`[data-country = ${ code }]`)
        countries.forEach(item => item.classList.add('chosen_country'))
        newChart.getChart(code)
    }
}
export class InteractiveMap { 
    constructor(mapObj) { 
        this.mapObj = mapObj
        this.mapContainer = document.querySelector('[data-map-container]')
        this.mapWrap = document.createElement('div')
        this.name = this.mapObj.name;
        this.json = this.mapObj.json;
        this.color = this.mapObj.color;
        this.data = null;
        this.buffer = null;
        this.state = this.mapObj.state;
    }
    createMapWrap() { 
        this.mapWrap.setAttribute(`data-map-${ this.name }`,'')
        this.mapContainer.appendChild(this.mapWrap) 
        const mapWrap = document.querySelector(`[data-map-${ this.name }]`)
        this.activateDefaultMap(mapWrap)
        return this
    }
    renderMap() { 
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
              this.setCodes()
              this.setEventListenerForChoosingBubble()
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
            for (let handle of handledData) {
                for (let code of codes) {
                    if (handle.code === code.code) {
                        handle.code3 = code.code3
                    }
              }
            }
            this.data = handledData.filter(item => item.code3 !== '')
    }
    activateDefaultMap (map) { 
        this.state === 'active' ? map.classList.add('active_map') : null;
    }
    setCodes() { 
        const bubbles = document.querySelectorAll("g.highcharts-series.highcharts-series-1.highcharts-mapbubble-series.highcharts-tracker");
        bubbles[bubbles.length - 1].childNodes.forEach(item => {  
            item.setAttribute('data-country',`${ item.point.code }`)
        })
    }
    setEventListenerForChoosingBubble() { 
        const bubbles = document.querySelectorAll("g.highcharts-series.highcharts-series-1.highcharts-mapbubble-series.highcharts-tracker");
        bubbles[bubbles.length - 1].addEventListener('click', (e) => { 
            mapArea.chooseCountry(e.target.dataset.country)
        })
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
        this.activateDefaultTab(tab)
        this.mapContainer.appendChild(tab)
        this.setEventListenerForMapChange(this.name)
        return this
    }
    setEventListenerForMapChange(tabName) { 
        const currentTab = document.querySelector(`a[data-tab = "${ tabName }"]`)
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
    deactivateAnotherTab() { 
        const activeTab = document.querySelector('.active')
        activeTab.classList.remove('active')
    }
    chooseAnotherTab(currentTab) { 
        this.deactivateAnotherTab()
        this.activateCurrentTab (currentTab)
        const currentMap = document.querySelector(`[data-map-${ currentTab.dataset.tab }]`)
        mapArea.changeMap(currentMap)
    }
}

 