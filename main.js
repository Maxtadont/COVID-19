import {FullscreenBtnCountry} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnMap} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnTable} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnChart} from "./assets/scripts/fullscreen.js";
import {FullscreenBtnWrap} from "./assets/scripts/fullscreen.js";
import {InteractiveMap} from "./assets/scripts/maps/maps.js";

/** Code for charts */
import {Chart} from "./assets/scripts/charts/chart.js";
//const countryInit = 'RU'
const countryInit = 'WD'
const chart = new Chart();
function initChart(country) {
    function load() {
        return new Promise((resolve) => {
            chart.getData(country, resolve)
        })
    }
    load()
    .then(() => {
        chart.getCases()
        chart.getDeaths()
        chart.getRecovered()
    })
    .then(() => chart.changeChartType())
    .then(() => chart.createChart(chart.cases, 'rgba(255, 255, 0, '))
}
initChart(countryInit)

const xxxx = document.querySelector('[data-country]')
xxxx.addEventListener('click', () => {
    initChart('RU')
})

export const wrapBtn = new FullscreenBtnWrap('[data-wrap]');
export const countryBtn = new FullscreenBtnCountry('[data-btn-country]', '[data-country]').showHideBtn().toggleFullscreen();
export const mapBtn = new FullscreenBtnMap('[data-btn-map]', '[data-map]').showHideBtn().toggleFullscreen();
export const tableBtn = new FullscreenBtnTable('[data-btn-table]', '[data-table]').showHideBtn().toggleFullscreen();
export const chartBtn = new FullscreenBtnChart('[data-btn-chart]', '[data-chart]').showHideBtn().toggleFullscreen();
export const map = new InteractiveMap().createMapWrap().renderMap()
