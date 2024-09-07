<template>
    <ClientOnly>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </ClientOnly>
</template>

<script setup lang="ts">

const  series = ref([
        {
            name: 'Week1',
            data: [44, 55, 57, 56, 61, 58, 63]
          }, {
            name: 'Week2',
            data: [76, 85, 101, 98, 87, 105, 91]
          }, {
            name: 'Week3',
            data: [35, 41, 36, 26, 45, 48, 52]
          },
          {
          name: 'Week4',
            data: [76, 85, 101, 98, 87, 105, 91]
          }, 
          {
            name: 'Week5',
            data: [35, 41, 36, 26, 45, 48, 52]
          }   
])

const chartOptions = ref({
            chart: {
              type: 'bar',
              height: 350
            },
            title: {
                text: 'Weakly Transactions'
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            colors: ['#5c595c', '#005eff', '#00ffd9', '#fa64f2', '#f5dd58'],
            xaxis: {
              categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr','Fri','Sat'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " Times"
                }
              }
            }
          })

</script>