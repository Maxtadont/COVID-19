import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
import {InteractiveMap} from "./assets/scripts/maps/maps.js";
import {MapTab} from "./assets/scripts/maps/maps.js";
import {mapsData} from "./assets/scripts/maps/maps.js";
import {MapArea} from "./assets/scripts/maps/maps.js";
import {DataType} from "./assets/scripts/global/DataTypes.js";
import {Table} from "./assets/scripts/table/countryTable.js"
import {TotalData} from "./assets/scripts/global/DataTypes.js";
import * as CountryTotal from "./assets/scripts/CountryTotal.js";
import * as dataAPI from "./assets/scripts/global/APIdata.js";
import {Keyboard} from "./assets/scripts/keyboard.js";

import { Chart } from "./assets/scripts/charts/chart.js";
export const newChart = new Chart();
newChart.getChart("WD", 0);

export const wrapBtn = new FullscreenBtnWrap("[data-wrap]");
export const countryBtn = new FullscreenBtnCountry("[data-btn-country]", "[data-country]").showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap("[data-btn-map]", "[data-map]").showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable("[data-btn-table]", "[data-table]").showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart("[data-btn-chart]", "[data-chart]").showHideBtn().toggleFullscreen();

export const mapArea = new MapArea().createMapContainer();
export const mapConfirmedCases = new InteractiveMap(mapsData.cases).createMapWrap().renderMap();
export const tabConfirmedCases = new MapTab(mapsData.cases).createTab();
export const mapConfirmedDeaths = new InteractiveMap(mapsData.deaths).createMapWrap().renderMap();
export const tabConfirmedDeaths = new MapTab(mapsData.deaths).createTab();
export const mapConfirmedRecovered = new InteractiveMap(mapsData.recovered).createMapWrap().renderMap();
export const tabConfirmedRecovered = new MapTab(mapsData.recovered).createTab();

export const globalDataType = new DataType();
export const globalTotalData = new TotalData();
export const totalAPI = new dataAPI.APIData(globalTotalData, globalDataType);
totalAPI.requestTotal();
export const blockCountry = document.querySelector("[data-country]");
export const totalContainer = new CountryTotal.Container("totalContainer", [ "countryContainer" ], blockCountry);
export const totalBlock = 
  new CountryTotal.CountryBlock("totalBlock", [ "countryTotal" ], totalContainer.domElement);
export const searchContainer = new CountryTotal.Container("searchContainer", [ "countryContainer" ], blockCountry);
export const searchField = new CountryTotal.SearchBlock("searchBlock", [ "countrySearch" ], searchContainer.domElement);
export const tableContainer = new CountryTotal.Container("tableContainer", [ "countryTableContainer" ], blockCountry);
export const totalTable = new CountryTotal.CountryTable("countryTable", [ "countryTable" ], tableContainer.domElement);
export const keyboard = new Keyboard("keyboardBlock", searchField.searchInput.domElement, document.querySelector("body"));
export const indicatorTable = new Table();
indicatorTable.createTable();