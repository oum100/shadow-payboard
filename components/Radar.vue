<template>
    <ClientOnly>
        <div class="row juistify-around">
            <div id="chart" class="col-4">
            <apexchart type="heatmap" height="200" :options="chartOptions" :series="testData"></apexchart>
        </div>
        </div>

    </ClientOnly>
</template>

<script setup lang="ts">
const series = [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20, 23],
}, {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80, 90],
}, {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10, 34],
}]

const testData = [
    {
        name: 'Total',
     
        data: [1500, 1260, 1400, 1380, 1999, 2520, 1490]
    },
    {
        name: 'Washer',
    
        data: [900, 860, 1000, 1080, 1500, 2120, 1100]
    },
    {
        name: 'Dryer',
      
        data: [600, 400, 400, 300, 499, 400, 390]
    },
    {
        name: 'SkyView',
      
        data: [1140, 900, 1200, 1100, 1600, 2400, 1000]
    },
    {
        name: 'RGB-18',
       
        data: [360, 360, 200, 280, 399, 120, 490]
    }
]

const chartOptions = {
    chart: {
        height: 200,
        type: 'heatmap',
    },
    title: {
        text: 'Radar Chart - Multi Series'
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    markers: {
        size: 0
    },
    yaxis: {
        stepSize: 10
    },
    xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
}

</script>
