export function initChart(country, chart) {
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