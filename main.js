import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
import {InteractiveMap} from "./assets/scripts/maps/maps.js";
import {CountryBlock} from "./assets/scripts/CountryGlobalData.js";
import {CountryBlockTitle} from "./assets/scripts/CountryGlobalData.js";

export const wrapBtn = new FullscreenBtnWrap('[data-wrap]');
export const countryBtn = new FullscreenBtnCountry('[data-btn-country]', '[data-country]').showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap('[data-btn-map]', '[data-map]').showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable('[data-btn-table]', '[data-table]').showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart('[data-btn-chart]', '[data-chart]').showHideBtn().toggleFullscreen();
export const map = new InteractiveMap().createMapWrap().renderMap();
export const countryData = document.querySelector('[data-country]');
export const countryGlobalData = new CountryBlock('[data-country-global-data]', countryData);
export const countryGlobalDataTitle = new CountryBlockTitle('[data-country-global-data]', '');
