import * as Colors from "./assets/scripts/global/colors.js";
import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
//import {InteractiveMap} from "./assets/scripts/maps/maps.js";
import * as totalObjects from "./assets/scripts/CountryTotal.js";
//import * as API from "./assets/scripts/global/APIdata.js";
import * as Countries from "./assets/scripts/global/countries_test.js"

export const wrapBtn = new FullscreenBtnWrap("[data-wrap]");
export const countryBtn = new FullscreenBtnCountry("[data-btn-country]", "[data-country]").showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap("[data-btn-map]", "[data-map]").showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable("[data-btn-table]", "[data-table]").showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart("[data-btn-chart]", "[data-chart]").showHideBtn().toggleFullscreen();
//export const map = new InteractiveMap().createMapWrap().renderMap();

//блок CountryTotal
export const countryData = document.querySelector("[data-country]");
export const countryTotalContainer = new totalObjects.Container("[data-countryTotalContainer]", [ "countryContainer" ], countryData);
export const countryTotalBlock = new totalObjects.CountryBlock("[data-countryTotal]", [ "countryTotal" ], countryTotalContainer.domElement);
countryTotalBlock.valueBlock.setTextColor(Colors.CASES_COLOR);

export const countrySearchContainer = new totalObjects.Container("[data-countrySearchContainer]", [ "countryContainer" ], countryData);
export const countrySearchBlock = new totalObjects.SearchBlock("[data-countrySearch]", [ "countrySearch" ], countrySearchContainer.domElement);

export const countryTableContainer = new totalObjects.Container("[data-countryTableContainer]", [ "countryTableContainer" ], countryData);
export const countryTable = new totalObjects.CountryTable("[data-countryTable]", [ "countryTable" ], countryTableContainer.domElement);
countryTable.addCoutries(Countries.coutriesTst);
countryTable.addCoutries([]);

//const totalCases = new API.APIdata();


//dataObserver.broadcast()




