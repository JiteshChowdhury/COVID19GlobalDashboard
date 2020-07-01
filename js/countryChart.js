export var chart1;

export function drawChart(label,activeCases,confirmedCases,recoveredCases,deceasedCases){
    var ctx1 = document.getElementById('casesChartCountry').getContext('2d');
    chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Active Cases',
                borderColor: 'rgba(102, 102, 102, 1)',
                data: activeCases,
                fill: false
            },
            {
                label: 'Confirmed Cases',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: confirmedCases,
                fill: false
            },
            {
                label: 'Recovered Cases',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: recoveredCases,
                fill: false
            },
            {
                label: 'Deceased Cases',
                borderColor: '#181818',
                data: deceasedCases,
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
                hover: {
                mode: 'nearest',
                intersect: true
            },
            title: {
                display: true,
                text: 'COVID-19 Cases',
                fontSize: 14

            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    },
                    gridLines: {
                        display:false
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}