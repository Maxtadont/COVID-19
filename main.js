import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
import {InteractiveMap} from "./assets/scripts/maps/maps.js";
import {MapTab} from "./assets/scripts/maps/maps.js";
import {mapsData} from "./assets/scripts/maps/maps.js";
import {MapArea} from "./assets/scripts/maps/maps.js";





export const wrapBtn = new FullscreenBtnWrap('[data-wrap]');
export const countryBtn = new FullscreenBtnCountry('[data-btn-country]', '[data-country]').showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap('[data-btn-map]', '[data-map]').showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable('[data-btn-table]', '[data-table]').showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart('[data-btn-chart]', '[data-chart]').showHideBtn().toggleFullscreen();

export const mapArea = new MapArea().createMapContainer()
export const mapConfirmedCases = new InteractiveMap(mapsData.cases).createMapWrap().renderMap()
export const tabConfirmedCases = new MapTab(mapsData.cases).createTab()
export const mapConfirmedDeaths = new InteractiveMap(mapsData.deaths).createMapWrap().renderMap()
export const tabConfirmedDeaths = new MapTab(mapsData.deaths).createTab()
export const mapConfirmedRecovered = new InteractiveMap(mapsData.recovered).createMapWrap().renderMap()
export const tabConfirmedRecovered = new MapTab(mapsData.recovered).createTab()




