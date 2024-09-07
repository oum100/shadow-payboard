<template>
    <div class="row q-pb-lg justify-center">
        <q-toggle v-model="dataset" label="Data Set 2" />
        <!-- <q-toggle v-model="denseOpts" label="Dense options" /> -->
    </div>
    <div v-if="dataset" class="row q-pa-md justify-center items-center">
        <q-card style="width:1000px">
            <q-card-section>
                <ClientOnly>
                    <apexchart type="area" height="330" :options="revenueChartOptions" :series="series2"></apexchart>
                </ClientOnly>
            </q-card-section>
        </q-card>
    </div>
    <div v-else class="row q-pa-md justify-center items-center">
        <q-card style="width:1000px">
            <q-card-section>
                <ClientOnly>
                    <apexchart type="area" height="330" :options="revenueChartOptions" :series="series1"></apexchart>
                </ClientOnly>
            </q-card-section>
        </q-card>
    </div> 
</template>


<script setup lang="ts">
import moment from "moment-timezone";

const startDate = ref()
const endDate = ref()
const dataset = ref(false)

const startDay = ref()
const endDay = ref()

//Set date timezone to Thailand
const today = moment(String(new Date(Date.now()))).tz("Asia/Bangkok")
console.log("Today: ", today)

const month =   moment().month(today.month()).format('MMMM-YYYY')
console.log("This Month: ", month)

!startDate.value ? startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("Start Date: ", startDate.value)
console.log("Start Date: ", startDate.value)
!endDate.value ? endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("End Date: ", endDate.value)
console.log("End Date: ", endDate.value)


const showSeries:any = ref([])

const series1 = ref([
    {
        name: 'Total',
        type: 'line',
        data:[ 7, 20, 27, 65, 75, 98, 101, 103, 122, 125, 131, 147, 151, 154, 171, 179, 196, 206, 211, 214, 229, 231, 233, 244, 245, 259, 264, 267, 268, 275, 294]
    },
    {
        name: 'Washer',
        type: 'area',
        data:[ 6, 12, 37, 38, 53, 64, 66, 74, 82, 89, 107, 109, 111, 115, 129, 155, 159, 163, 197, 202, 206, 208, 228, 248, 261, 265, 276, 282, 283, 287, 293]
    },
])

const series2 = ref([
    {
        name: 'Website Blog',
        type: 'column',
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, 
    {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }
])

if(!dataset){
    showSeries.value = series1.value
}else{
    showSeries.value = series2.value
}


const revenueChartOptions = ref({
    chart: {
        id: 'RevenueMonthly',
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
        text: 'Monthly Revenue'
    },
    yaxis: {
        stepSize: 50,
        title: {
            text: 'Amount (Baht)',
        },
    },
    xaxis: {

        categories: Array.from({ length: 31 }, (_, i) => `${i+1}`), // Labels for each hour of the day
        title: {
            text: `Date in ${month}`,
        },
    },
    colors: ['#5c595c', '#005eff', '#00ffd9'], //
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