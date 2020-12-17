export class Chart {
    constructor() {
        this.chartWindow = document.querySelector('[data-chart]');

        this.chartFigure = document.createElement('figure');
        this.chartFigure.classList.add('highcharts-figure');
        this.chartWindow.appendChild(this.chartFigure);

        this.chartContainer = document.createElement('div');
        this.chartContainer.setAttribute('id','container');
        this.chartFigure.appendChild(this.chartContainer);

        this.chartDescription = document.createElement('p');
        this.chartDescription.classList.add('highcharts-description');
        this.chartDescription.innerText = 'cases';
        this.chartFigure.appendChild(this.chartDescription);
    }
    getData(country, resolve) {
        const url = country === 'WD' ? 'https://covid19-api.org/api/timeline' : `https://covid19-api.org/api/timeline/${country}`
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.data = data;
            console.log(this.data);
        })
        .then(() => {
            return resolve()
        })
    }
    getCases() {
        this.cases = []
        this.data.forEach((el, i) => {
            this.cases.unshift(this.data[i].cases || this.data[i].total_cases || 0)
        })
        console.log(this.cases)
    }
    getDeaths() {
        this.deaths = []
        this.data.forEach((el, i) => {
            this.deaths.unshift(this.data[i].deaths || this.data[i].total_deaths || 0)
        })
        console.log(this.deaths)
    }
    getRecovered() {
        this.recovered = []
        this.data.forEach((el, i) => {
            this.recovered.unshift(this.data[i].recovered || this.data[i].total_deaths || 0)
        })
        console.log(this.recovered)
    }
    changeChartType() {
        const chartTypeArr = [
            {type: 'cases', color: 'rgba(255, 255, 0, ', chartData: this.cases},
            {type: 'deaths', color: 'rgba(255, 0, 0, ', chartData: this.deaths},
            {type: 'recovered', color: 'rgba(0, 255, 0, ', chartData: this.recovered},
            -1
        ]

        const changeChartTypeByClick = () => {
            chartTypeArr[3] = (chartTypeArr[3] += 1) % 3
            this.chartDescription.innerText = chartTypeArr[chartTypeArr[3]].type;
            this.createChart(chartTypeArr[chartTypeArr[3]].chartData, chartTypeArr[chartTypeArr[3]].color)
        }
        changeChartTypeByClick()

        this.chartDescription.removeEventListener('click', changeChartTypeByClick)
        this.chartDescription.addEventListener('click', changeChartTypeByClick)
    }
    createChart(data, color) {
        Highcharts.chart('container', {
            /** General options for the chart */
            chart: {
                backgroundColor: '#32476b',
                type: 'area'
            },
            /** Options for configuring accessibility for the chart */
            accessibility: {
                description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
            },
            /** Title */
            title: {
                text: 'Title'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
                accessibility: {
                    rangeDescription: 'Range: 1940 to 2017.'
                }
            },
            yAxis: {
                title: {
                    text: 'text'
                }
            },
            /** Options for the tooltip that appears when the user hovers over a series or point */
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            /** The plotOptions is a wrapper object for config objects for each series type. The config objects for each series can also be overridden for each series item as given in the series array */
            plotOptions: {
                area: {
                    //pointStart: 2020,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    },
                    fillColor: `${color}0.5)`,
                    color: `${color}1)`
                }
            },
            /** Series options for specific data and the data itself. In TypeScript you have to cast the series options to specific series types, to get all possible options for a series */
            series: [{
                name: 'Rus',
                data: data
            }]
        });
    }
}















