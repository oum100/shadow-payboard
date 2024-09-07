<template>
    <ClientOnly>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </ClientOnly>
</template>

<script setup lang="ts">


const series = ref([
            {
              name: 'Total',
              group: 'transaction',
              data: [63, 55, 41, 67, 22, 43]
            },
            {
              name: 'Washer',
              group: 'machine',
              data: [45, 40, 45, 50, 13, 25]
            },
            {
              name: 'Dryer',
              group: 'machine',
              data: [18, 15, 6, 17, 9, 18]
            },
            {
              name: 'Qr',
              group: 'payby',
              data: [63, 55, 41, 67, 22, 40]
            },
            {
              name: 'cash',
              group: 'payby',
              data: [0, 0, 0, 0, 0, 3]
            }
        ])


const chartOptions = ref({
    chart: {
              type: 'bar',
              height: 350,
              stacked: true,
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            // dataLabels: {
            //   formatter: (val) => {
            //     return val / 1000 + 'K'
            //   }
            // },
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            xaxis: {
              categories: [
                'D1',
                'D2',
                'D3',
                'D4',
                'D5',
                'D6'
              ]
            },
            fill: {
              opacity: 1
            },
            colors: ['#5c595c', '#008FFB', '#00cf60', '#fa64f2', '#f5dd58'],
            yaxis: {
              labels: {
                formatter: (val:any) => {
                  return val
                }
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left'
            }
          })

</script>