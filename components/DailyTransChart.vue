<template>
    <ClientOnly>
        <div id="chart">
            <apexchart type="radialBar" height="390" :options="chartOptions" :series="transSeries"></apexchart>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">

const transSeries = ref([75, 60, 15, 74, 1])

const chartLabel = ref([
    'Total', 'Washer', 'Dryer', 'Qrcode', 'Cash'
])
const chartOptions = ref({
    chart: {
        height: 390,
        type: 'radialBar',
        dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
        }
    },
    plotOptions: {
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
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
            },
        }
    },
    colors: ['#5c595c', '#005eff', '#00ffd9', '#fa64f2', '#f5dd58'],
    labels: chartLabel,
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
})


</script>