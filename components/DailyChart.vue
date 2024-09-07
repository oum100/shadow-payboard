<template>
    <ClientOnly>
        <apexchart type="area" height="350" :options="chartOptionsDaily" :series="revenueSeries"></apexchart>
    </ClientOnly>
</template>
<script setup lang="ts">
    const revenueSeries = ref([
    {
                "name": "Total",
                "type": "line",
                "data": [
                    90,
                    60,
                    0,
                    0,
                    0,
                    0,
                    0,
                    40,
                    70,
                    0,
                    110,
                    70,
                    140,
                    190,
                    190,
                    70,
                    240,
                    80,
                    160,
                    40,
                    170,
                    190,
                    90,
                    330
                ]
            },
            {
                "name": "Washer",
                "type": "column",
                "data": [
                    90,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    40,
                    70,
                    0,
                    110,
                    20,
                    40,
                    190,
                    190,
                    30,
                    110,
                    40,
                    120,
                    0,
                    40,
                    190,
                    0,
                    150
                ]
            },
            {
                "name": "Dryer",
                "type": "column",
                "data": [
                    0,
                    60,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    50,
                    100,
                    0,
                    0,
                    40,
                    130,
                    40,
                    40,
                    40,
                    130,
                    0,
                    90,
                    180
                ]
            },
    ])

    const chartOptionsDaily = ref({
        chart: {
            id: 'Revenuedaily',
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false, // Disable data labels
        },
        stroke: {
            width: [4, 2, 2, 2, 2],
            // colors: ['transparent']
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left'
        },
        title: {
            text: 'Daily Revenue'
        },
        yaxis: {
            stepSize: 50,
            title: {
                text: 'Amount (Baht)',
            },
        },
        xaxis: {
            categories: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Labels for each hour of the day
            title: {
                text: 'Hours',
            },
        },
        colors: ['#5c595c', '#005eff', '#00ffd9', '#fa64f2', '#f5dd58'], //
        markers: {
            size: 4
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.8,
                gradientToColors: undefined, // Optional: Customize gradient
                inverseColors: true,
                opacityFrom: 0.8,
                opacityTo: 0.8,
                stops: [0, 90, 100],
            },
        },

    })
</script>
