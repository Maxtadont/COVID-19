import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
import {InteractiveMap} from "./assets/scripts/maps/maps.js";

/** Code for charts */
import { Chart } from "./assets/scripts/charts/chart.js";
const newChart = new Chart(); /** Создание пустого объекта чарта, один раз при загрузке страницы */
newChart.getChart("AL", 1/**, "yellow" */); /** Отрисовка чарта. Все параметры необязательные */

export const wrapBtn = new FullscreenBtnWrap("[data-wrap]");
export const countryBtn = new FullscreenBtnCountry("[data-btn-country]", "[data-country]").showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap("[data-btn-map]", "[data-map]").showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable("[data-btn-table]", "[data-table]").showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart("[data-btn-chart]", "[data-chart]").showHideBtn().toggleFullscreen();
export const map = new InteractiveMap().createMapWrap().renderMap();
