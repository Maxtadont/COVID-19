export const insertMap = function (data,mapObj) {
    const elementDOM = document.querySelector(`[data-map-${ mapObj.name }]`)
    Highcharts.mapChart(elementDOM, {
        chart: {
            borderWidth: 1,
            map: 'custom/world',
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
        },
        title: {
            text: 'COVID-19 distribution map',
            style: { 
                "color": "#b9b9b9",
                "fontSize": "18px" 
            }
        },
        subtitle: {
            text: mapObj.text,
            style: { 
                "color": "#b9b9b9",
                "fontSize": "12px" }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            map: {
                opacity:'0'
            },
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        series: [{
            name: 'Countries',
            enableMouseTracking: true,
            opacity: '0.5'
        }, {
            type: 'mapbubble',
            name: mapObj.text,
            joinBy: ['iso-a3', 'code3'],
            data: data,
            animation: true,
            color: mapObj.color,
            minSize: 4,
            maxSize: '15%',
            opacity: '1'
        }],
    })
}
    