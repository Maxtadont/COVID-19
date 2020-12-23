export const insertMap = function (data,mapObj) {
    const elementDOM = document.querySelector(`[data-map-${ mapObj.name }]`);
    Highcharts.mapChart(elementDOM, {
        credits: { 
            enabled: false 
        },
        chart: {
            borderWidth: 1,
            map: "custom/world",
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
        },
        title: {
            text: "COVID-19 distribution map",
            style: { 
                "color": "#b9b9b9",
                "fontSize": "18px",
                "fontFamily": "Montserrat"
            }
        },
        subtitle: {
            text: mapObj.text,
            style: { 
                "color": "#b9b9b9",
                "fontSize": "12px",
                "fontFamily": "Montserrat"
            }
        },
        legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'vertical',
                valueDecimals: 0,
                backgroundColor: 'rgba(255,255,255,0.0)',
                itemStyle: {
                    fontFamily: "Montserrat",
                    color: 'white',
                    textDecoration: 'none'
                },
                itemHoverStyle: {
                    textDecoration: 'underline'
                }
            
        },
        plotOptions: {
            map: {
                opacity: "0"
            },
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom"
            }
        },
        series: [ {
            name: "Countries",
            enableMouseTracking: true,
            opacity: "0.5",
            showInLegend: false
        }, {
            type: "mapbubble",
            name: `${mapObj.text}, person`,
            joinBy: [ "iso-a3", "code3" ],
            data: data,
            animation: true,
            color: mapObj.color,
            minSize: 4,
            maxSize: "15%",
            opacity: "1"
        } ],
    });
};
    