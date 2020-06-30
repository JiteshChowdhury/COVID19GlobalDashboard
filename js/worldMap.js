export function drawWorldMap(data){

    // var geoData = data.records;

    var chart = anychart.map(data);
    chart.geoData(anychart.maps.world);

    // specify the chart type and set the series 
    var series = chart.choropleth(data);

    var colorRange = chart.colorRange();
    colorRange.enabled(true);
    colorRange.labels().padding(3);

    series.labels(null);
    // series.geoIdField('iso_3166_2');
    series.hovered().stroke('1.5 white');
    series.stroke('0.1 white');
    series.selected()
        .fill('white')
        .stroke('0.1 black');
    series.colorScale(anychart.scales.linearColor('#999999', '#080808'));

    // set the container id
    chart.container('container');
    
    // draw the chart
    chart.draw();

}