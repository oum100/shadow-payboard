<script setup lang="ts">
const chartOptions = {
    chart: {
        height: 350,
        type: 'radar',
    },
    stroke: {
        width: 2,
        // colors: ['#fff']
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
const series = [
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
</script>

<template>
    <ClientOnly>
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </ClientOnly>
</template>