export const insertMap = function (data){
    Highcharts.mapChart('map', {
        chart: {
            borderWidth: 1,
            map: 'custom/world',
        },
        title: {
            text: 'COVID-19 distribution map'
        },
    
        subtitle: {
            text: 'Confirmed cases'
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
            name: 'Confirmed cases',
            joinBy: ['iso-a3', 'code3'],
            data: data,
            color: 'red',
            minSize: 4,
            maxSize: '15%',
        }],
    })
}
    