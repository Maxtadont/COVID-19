import { countryList } from "./chartCountries.js";
export class Chart {
	constructor() {
		this.chartWindow = document.querySelector("[data-chart]");

		this.chartFigure = document.createElement("figure");
		this.chartFigure.classList.add("highcharts-figure");
		this.chartWindow.appendChild(this.chartFigure);

		this.chartContainer = document.createElement("div");
		this.chartContainer.setAttribute("id", "container");
		this.chartFigure.appendChild(this.chartContainer);

		this.chartDescription = document.createElement("p");
		this.chartDescription.classList.add("highcharts-description");
		this.chartFigure.appendChild(this.chartDescription);

	}

	getChart(country = "WD", type = 0, customColor) {
		const url = country === "WD" ? "https://covid19-api.org/api/timeline" : `https://covid19-api.org/api/timeline/${country}`;
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.getCountry(country);
				this.transformData(data);
				this.changeChartType(type, customColor);
				this.drawChart(this.getChartType(type).data, this.dates, this.country, this.getChartType(type).color, this.getChartType(type).type, customColor);
			})
			.catch(() => {
				console.log("Error: data");
			});
	}

	getChartType(typeNumber) {
		const charTypes = [
			{ type: "cases", color: "rgba(255, 255, 0, ", data: this.cases },
			{ type: "deaths", color: "rgba(255, 0, 0, ", data: this.deaths },
			{ type: "recovered", color: "rgba(0, 255, 0, ", data: this.recovered }
		];
		return charTypes[typeNumber];
	}

	transformData(data) {
		this.cases = [];
		this.deaths = [];
		this.recovered = [];
		this.dates = [];
		data.forEach((el, i) => {
			this.cases.unshift(data[i].cases || data[i].total_cases || 0);
		});
		data.forEach((el, i) => {
			this.deaths.unshift(data[i].deaths || data[i].total_deaths || 0);
		});
		data.forEach((el, i) => {
			this.recovered.unshift(data[i].recovered || data[i].total_recovered || 0);
		});
		data.forEach((el, i) => {
			this.dates.unshift(data[i].last_update || 0);
		});
	}

	getCountry(country) {
		this.country = country !== "WD" ? countryList.find((el) => el.alpha2 === country).name : "World";
	}

	changeChartType(type, customColor) {
		const changeChartTypeByClick = () => {
			type = (type + 1) % 3;
			this.drawChart(this.getChartType(type).data, this.dates, this.country, this.getChartType(type).color, this.getChartType(type).type, customColor);
		};
		this.chartDescription.removeEventListener("click", changeChartTypeByClick);
		this.chartDescription.addEventListener("click", changeChartTypeByClick);
	}

	drawChart(data, dates, country, color, type, lineColor = "#b9b9b9") {
		this.chartDescription.innerText = type;
		this.chartDescription.style.color = lineColor;
		Highcharts.chart("container", {
			credits: { enabled: false },
			chart: { 
				backgroundColor: "#32476b", 
				type: "area"
			},
			title: {
				style: { "color": lineColor, "fontSize": "14px", fontFamily: "Montserrat" },
				text: country
			},
			xAxis: {
				lineWidth: 2,
				allowDecimals: false,
				lineColor: lineColor,
				tickColor: lineColor,
				labels: {
					style: {
						color: lineColor,
						fontSize: "11px",
						fontFamily: "Montserrat"
					},
					formatter: function () {
						const options = {
							month: "long"
						};
						const time = new Date(dates[this.value]).toLocaleString("en", options);
						return `${time}`;
					}
				}
			},
			yAxis: {
				lineWidth: 2,
				lineColor: lineColor,
				gridLineColor: lineColor,
				title: { text: "" },
				labels: {
					style: {
						color: lineColor,
						fontSize: "11px",
						fontFamily: "Montserrat"
					},
				}
			},
			tooltip: {
				formatter: function () {
					const options = {
						year: "numeric",
						month: "long",
						day: "numeric"
					};
					const time = new Date(dates[this.x]).toLocaleString("en", options);
					return `<b>${time}</b><br>${type.charAt(0).toUpperCase() + type.slice(1)}: <b>${this.y}</b>`;
				},
			},
			plotOptions: {
				area: { pointStart: 0, pointInterval: 1, fillColor: `${color}0.5)`, color: `${color}1)` }
			},
			series: [
				{ name: type, data: data, showInLegend: false }
			]
		});
	}
}















