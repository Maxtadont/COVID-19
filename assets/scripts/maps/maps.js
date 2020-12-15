import {codes} from "./countryCodes.js";
import {insertMap} from "./highChartMap.js";
export class InteractiveMap {
    constructor(json){
        this.mapWindow = document.querySelector('[data-map]')
        this.mapWrap = document.createElement('div')
        this.json = json;
        this.data = null;
        this.buffer = null;
    }
    createMapWrap() {
        this.mapWrap.setAttribute('id','map')
        this.mapWindow.appendChild(this.mapWrap) 
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
              insertMap(this.data)
              this.buffer = null;
            })
          .catch(error => console.log('error', error));
    }
    handleData() {
            var handledData = this.buffer.map(item => item = {
                code3: '',
                z: item.TotalConfirmed,
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