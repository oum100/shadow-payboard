<template>
    <!-- <div class="row justify-center q-px-sm">
        <div class="col-xs-12 col-sm-6 col-md-4 q-pr-sm">
            <q-card class="text-white" >
                <q-card-section>
                  <ClientOnly>
                    <apexchart type="pie"  height="220" :options="chart1" :series="chart1.series"></apexchart>
                  </ClientOnly>
                    
                </q-card-section>
            </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 q-px-xs">
            <q-card class="text-white">
                <q-card-section>
                  <ClientOnly>
                    <apexchart type="bar" height="207" 
                      :options="chart2" :series="chart2.series"></apexchart>
                  </ClientOnly>
                    
                </q-card-section>
            </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 q-pl-sm">
            <q-card class="text-white">
                <q-card-section>
                  <ClientOnly>
                    <apexchart type="donut" height="220" :options="chart3" :series="chart3.series"></apexchart>
                  </ClientOnly>
                    
                </q-card-section>
            </q-card>
        </div>    
    </div> -->
    <div class = "row q-my-sm justify-center">
      <div class="col-md-10">
        <q-card>
          <q-card-section>
            <ClientOnly>
              <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
            </ClientOnly>
          </q-card-section>
        </q-card>
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>    

    <div class = "row q-my-sm justify-center">
      <div class="col-md-4">
        <q-card>
          <q-card-section>
            <ClientOnly>
              <apexchart type="radar" height="350" :options="chartOptions1" :series="series1"></apexchart>
            </ClientOnly>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card>
          <q-card-section>
            <ClientOnly>
              <apexchart type="radar" height="350" :options="chartOptions2" :series="series2"></apexchart>
            </ClientOnly>
          </q-card-section>
        </q-card>
      </div>
    </div>      

        


</template>

<script setup lang="ts">
    var chart1 = {
        series: [76, 67, 61, 90],
        chart: {
          height: 200,
          type: 'pie',
        },
        chartOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              offsetX: -8,
              fontSize: '16px',
              formatter: function(seriesName:any, opts:any) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
            },
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
    };

    const chart3 = {
        series: [4, 3, 13, 20, 3, 1],
          plotOptions: {
            chart: {
              height:300,
              width: 300,
              type: 'pie',
            },
            title: {text:"Total"},
            // colors:['#1ab7ea', '#0084ff', '#39539E', '#0077B5','#045500'],
            labels: ['User', 'Shop', 'Asset', 'Machine', 'Product', 'Config'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            // tooltip: {
            //   y: {
            //     formatter: function (val:any) {
            //       return "$ " + val + "Baht"
            //     }
            //   }
            // },
          },
    }   
    const chart2 = {
        series: [{
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
    } 

    
    const series = [
    {
            name: 'Total',
            type: 'area',
            data: [3681, 4520, 4144, 3910, 4193, 3827, 4740, 4484, 2938, 4390, 4062, 4409, 4335, 2714, 2417, 2209, 3255, 3592, 3235, 3610, 3513, 2885, 2506, 4237]
          },
          {
            name: 'Washer',
            type: 'area',
            data: [
              1640,2407,1023,1137,667,2777,1736,865,2724,780,1579,2622,
              1305,961,1505,2240,2636,2423,2441,1781,686,2220,2320,2000
            ]
          }, {
            name: 'Dryer',
            type: 'area',
            data: [661, 1772, 1588, 577, 1470, 706, 1422, 458, 685, 712, 1822, 1488, 919, 1889, 1630, 407, 759, 518, 1620, 566, 632, 609, 1593, 1697]
          }, {
            name: 'QRCode',
            type: 'area',
            data: [1160, 1910, 1147, 911, 593, 496, 165, 1460, 127, 233, 100, 1474, 408, 1422, 574, 841, 382, 432, 409, 1059, 1582, 1601, 1245, 1346]
          },
          {
            name: 'Cash',
            type: 'area',
            data: [1032, 441, 1190, 1400, 567, 975, 592, 206, 736, 742, 611, 1547, 1225, 212, 859, 296, 534, 380, 695, 261, 1048, 1229, 1210, 982]
          }
        ]

    const chartOptions = {
            chart: {
              height: 350,
              type: 'line',
              stacked: false,
            },
            stroke: {
              width: [3, 3, 3, 3, 3],
              curve: 'smooth',
              dashArray: [0,0,4,6,8]
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            },
            
            fill: {
              opacity: [0.5,0.5, 0.5, 0.5, 0.3],
              gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
              }
            },
            labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
              '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003','12/01/2003',
              '13/01/2003', '14/01/2003', '15/01/2003', '16/01/2003', '17/01/2003', '18/01/2003', '19/01/2003',
              '20/01/2003', '21/01/2003', '22/01/2003', '23/01/2003','24/01/2003'
            ],
            markers: {
              size: 0
            },
            xaxis: {
              type: 'date'
            },
            yaxis: {
              title: {
                text: 'Revenue',
              }
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                  }
                  return y;
            
                }
              }
            }
          }      

    const series1= [
          {
            name: '2023',
            data: [80, 50, 30, 40, 100, 20, 45, 55, 30, 64, 88, 70],
          },
          {
            name: '2024',
            data: [76, 30, 54, 40, 60, 16, 54, 89, 61, 77, 59, 81],
          }
        ]

    const chartOptions1 = {
            chart: {
              height: 350,
              type: 'radar',
            },
            title: {
              text: 'Basic Radar Chart'
            },
            yaxis: {
              stepSize: 20
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
          }

          const series2= [
          {
            name: 'W1',
            data: [80, 50, 100, 20, 55, 30, 70],
          },
          {
            name: 'W2',
            data: [40, 60, 54, 89, 77, 59, 81],
          },
          {
            name: 'W3',
            data: [49, 8, 49, 96, 96, 57, 71],
          },
          {
            name: 'W4',
            data: [13, 52, 64, 56, 38, 59, 93],
          },
          {
            name: 'W5',
            data: [96, 10, 74, 51, 68, 30, 45],
          }
        ]

    const chartOptions2 = {
            chart: {
              height: 350,
              type: 'radar',
            },
            title: {
              text: 'Day in week'
            },
            yaxis: {
              stepSize: 20
            },
            xaxis: {
              categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
          }          
   
</script>
