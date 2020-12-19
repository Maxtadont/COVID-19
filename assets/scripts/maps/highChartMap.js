export const insertMap = function (data,mapObj){
    Highcharts.mapChart(`map_${mapObj.name}`, {
        chart: {
            borderWidth: 1,
            map: 'custom/world',
        },
        title: {
            text: 'COVID-19 distribution map'
        },
    
        subtitle: {
            text: mapObj.text
        },
    
        legend: {
            enabled: false
        },
    
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
    
        series: [{
            name: 'Countries',
            color: 'blue',
            enableMouseTracking: true
        }, {
            type: 'mapbubble',
            name: mapObj.text,
            joinBy: ['iso-a3', 'code3'],
            data: data,
            color: mapObj.color,
            minSize: 4,
            maxSize: '15%',
        }],
    })
}
    