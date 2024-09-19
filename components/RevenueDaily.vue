<template>
    <div class="q-pa-md">
        <div class="row q-mt-sm items-start" style="height:300px;">
        <div id="ShowRevenueNumber" class="col-12 col-md-3 show-revenue-number">
            <div class="col q-px-md">
                <q-card class="text-white"
                    style="background: radial-gradient(circle, #787777 20%,#403e3f 80%); height:150px">
                    <q-card-section>
                        <div class="row q-pa-sm">
                            <div class="col-6 q-px-md">
                                <div class="text-center"><q-icon name="account_balance" size="40px"></q-icon></div>
                                <div class="text-subtitle1 text-center">Revenue</div>
                                <div class="text-h4 text-center">{{ revenueTotal }}</div>
                            </div>

                            <div class="column col-6">
                                <div class="row items-center" style="height: 50px;">
                                    <q-tooltip>QR Revenue</q-tooltip>
                                    <div class="col-6 column items-center">
                                        <q-icon name="qr_code_2" size="md"></q-icon>
                                    </div>
                                    <div class="col-6 column items-center">
                                        <div class="text-h6">{{ revenueQR }}</div>
                                    </div>
                                </div>
                                <q-separator color="white" size="2px" inset />
                                <div class="row items-center" style="height: 50px;">
                                    <q-tooltip>Cash Revenue</q-tooltip>
                                    <div class="col-6 column items-center">
                                        <q-icon name="paid" size="md"></q-icon>
                                    </div>
                                    <div class="col-6 column items-center">
                                        <div class="text-h6">{{ revenueCash }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </q-card-section>
                </q-card>
            </div>
            <div class="col q-mt-sm q-px-md">
                <q-card class="text-white"
                    style="background: radial-gradient(circle, #35a2ff 20%, #014a88 100%); height:150px">
                    <q-card-section>
                        <div class="row q-pa-sm">
                            <div class="col-6 q-px-md">
                                <div class="text-center"><q-icon name="receipt_long" size="40px"></q-icon></div>
                                <div class="text-subtitle1 text-center">Transactions</div>
                                <div class="text-h4 text-center">{{ transTotal }}</div>
                            </div>

                            <div class="column col-6" style="border:1px dashed">
                                <div class="row items-center" style="height: 50px;">
                                    <q-tooltip>QR Transaction</q-tooltip>
                                    <div class="col-6 column items-center">
                                        <q-icon name="qr_code_2" size="md"></q-icon>
                                    </div>
                                    <div class="col-6 column items-center">
                                        <div class="text-h6">{{ counterQR }}</div>
                                    </div>
                                </div>
                                <q-separator color="white" size="2px" inset />
                                <div class="row items-center" style="height: 50px;">
                                    <q-tooltip>Cash Transaction</q-tooltip>
                                    <div class="col-6 column items-center">
                                        <q-icon name="paid" size="md"></q-icon>
                                    </div>
                                    <div class="col-6 column items-center">
                                        <div class="text-h6">{{ counterCash }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </q-card-section>
                </q-card>
            </div>
        </div>

        <div id="MiddleChart" class="col-12 col-md-6 machine-chart">
            <div class="q-px-md">
                <q-card style="height:310px">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6">Revenue by machine type</div>
                        <ClientOnly>
                            <apexchart type="bar" height="250" :options="chartOptionsByType" :series=seriesRevenue>
                            </apexchart>
                        </ClientOnly>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <div id="SelectDate" class="col-12 col-md-3 items-center select-date" style="height:350px;">
            <div class="column items-center">
                <div class="col">
                    <div class="q-mb-md">
                        <div class="column col-12 col-md-4 q-pr-sm items-end">
                            <q-btn-toggle v-model="toggleSW" color="blue-6" text-color="white" toggle-color="blue-8"
                                toggle-text-color="white" rounded unelevated glossy size="0.72rem" :options="btnOptions" />
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="q-guttar-md col-xs-12 col-md-6">
                        <q-select filled dense v-model="branchSelected" :options="listBranchOption" label="Branch"
                            style="width:250px" @update:model-value="onStartDate" />

                        <div v-if="toggleSW == 'daily'" class="q-mt-md q-gutter-md">
                            <div class="q-mb-md col-xs-12 col-md-6" style="max-width: 250px;">
                                <DatePicker v-model:selectedDate="startDate" :time="false" @updated="onUpdate" />
                            </div>
                        </div>

                        <div v-else-if="toggleSW == 'weekly'" class="q-mt-md q-gutter-md">
                            <q-select filled dense v-model="selectedWeek" :options="optionsWeek">
                                <template v-slot:prepend>
                                    <q-icon name="event" />
                                </template>
                            </q-select>
                        </div>

                        <div v-else-if="toggleSW == 'monthly'" class="q-mt-md q-gutter-md">
                            <q-select filled dense v-model="selectedMonth" :options="optionsMonth">
                                <template v-slot:prepend>
                                    <q-icon name="event" />
                                </template>
                            </q-select>
                        </div>

                        <div v-else-if="toggleSW == 'yearly'" class="q-mt-md q-gutter-md">
                            {{ toggleSW }}
                        </div>

                        <div v-else-if="toggleSW == 'range'" class="q-mt-md q-gutter-md">
                            <div class="q-mb-md" style="max-width: 250px; width:100%">
                                <q-input filled dense v-model="startDate" label="Start Date">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm:ss" format24h
                                                    @update:model-value="onStartDate">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>

                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="startDate" mask="YYYY-MM-DD HH:mm:ss" format24h
                                                    @update:model-value="onStartDate">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="q-mx-md q-guttar-md" style="max-width: 250px; width:100%">
                                <q-input filled dense v-model="endDate" label="End Date">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm:ss" format24h
                                                    @update:model-value="onStartDate">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>

                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="endDate" mask="YYYY-MM-DD HH:mm:ss" format24h
                                                    @update:model-value="onStartDate">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        </div>
        <div class="row q-mt-md revenue-chart">
            <div class="col-12 col-md-10">
                <q-card>
                    <q-card-section>
                        <ClientOnly>
                            <apexchart type="area" height="330" width="100%" :options="chartOptions" :series=revenueData>
                            </apexchart>
                        </ClientOnly>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>  
</template>





<script setup lang="ts">
import { date } from 'quasar'
import moment from "moment-timezone";


let toggleSW = ref('daily')
const selectedWeek = ref({ "label": "Week1", "value": "W1" })
const selectedMonth = ref({ "label": "August", "value": "AUG" })
const selectedYear = ref('2024')
const startDate = ref()
const startDay = ref()
const endDate = ref()
const endDay = ref()
const totalDay = ref()
let branchSelected = ref('ALL')
let listBranchOption = ref(['ALL'])
let revenueData = ref()
let transactionData = ref()
let seriesRevenue = ref()
var aax: any = null
const dateClosePopup = ref(false)

const revenueTotal = ref('');
const revenueWasher = ref('')
const revenueDryer = ref('')
const transTotal = ref('')
const transWasher = ref('')
const transDryer = ref('')

const counterQR = ref('')
const counterCash = ref('')
const revenueQR = ref('')
const revenueCash = ref('')

const revenueMachine = Array(9).fill(0);
const revenueMachineQR = Array(9).fill(0);
const revenueMachineCash = Array(9).fill(0);

const optionChart = ref(['op1'])
const optionsChart1 = ref([
    { label: 'Machine', value: 'op1' },
    { label: 'Shop', value: 'op2' },
])

const btnOptions = ref([
    { label: 'Daily', value: 'daily' },
    { label: 'Range', value: 'range' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },

])

const optionsWeek = ref([
    { label: 'Week1', value: 'W1' },
    { label: 'Week2', value: 'W2' },
    { label: 'Week3', value: 'W3' },
    { label: 'Week4', value: 'W4' },
    { label: 'Week5', value: 'W5' }
])

const optionsMonth = ref([
    { label: 'January', value: 'JAN' },
    { label: 'February', value: 'FEB' },
    { label: 'March', value: 'MAR' },
    { label: 'April', value: 'APR' },
    { label: 'May', value: 'MAY' },
    { label: 'June', value: 'JUN' },
    { label: 'July', value: 'JUL' },
    { label: 'August', value: 'AUG' },
    { label: 'September', value: 'SEP' },
    { label: 'October', value: 'OCT' },
    { label: 'November', value: 'NOV' },
    { label: 'December', value: 'DEC' },
])


const today = moment(String(new Date(Date.now()))).tz("Asia/Bangkok")
console.log("Today: ", today)

!startDate.value ? startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("Start Date: ", startDate.value)
console.log("Start Date: ", startDate.value)
!endDate.value ? endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("End Date: ", endDate.value)
console.log("End Date: ", endDate.value)


const optionList = await $fetch('/api/transaction/listBranchOption')
// console.log("listBranchOption",optionList)

listBranchOption = ref(['ALL'])
optionList.forEach((item: any) => {
    listBranchOption.value.push(item.branchName)
})

//-----------------------------------------
const chartOptionsByType = ref({
    chart: {
        type: 'area',
        height: 350,
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '30%',
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
    colors: ['#005eff', '#00ffd9', '#fa64f2'],
    xaxis: {
        categories: ['Washer', 'Dryer', 'Water', 'Vending', 'Charger', 'Toy', 'GAS', 'CarWash', 'Coffee'],
    },
    yaxis: {
        title: {
            text: 'Baht'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val: any) {
                return "$ " + val + " Baht"
            }
        }
    }
})

const chartOptions = ref({
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
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '40%',
            // endingShape: 'rounded'
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    width: '100%',
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
        {
            breakpoint: 768,
            options: {
                chart: {
                    width: '90%',
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
        {
            breakpoint: 600,
            options: {
                chart: {
                    width: '100%',
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
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
    colors: ['#959a9c', '#005eff', '#00ffd9', '#fa64f2', '#07aaf5'], //
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
            opacityTo: 0.7,
            stops: [0, 90, 100],
        },
    },

})


const totalResult = await getRowsNumberCount(branchSelected.value)
// console.log("totalResult: ", totalResult)

transTotal.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._count)
transWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._count)
transDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._count)

// revenue.value = totalResult.total._sum.amount
revenueTotal.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._sum.amount)

revenueWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._sum.amount)
revenueDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._sum.amount)

counterQR.value = totalResult.total.countQR._count
counterCash.value = totalResult.total.countCash._count

revenueQR.value = new Intl.NumberFormat('en-US').format(totalResult.total.countQR._sum.amount)
revenueCash.value = new Intl.NumberFormat('en-US').format(totalResult.total.countCash._sum.amount)

revenueMachine[0] = totalResult.washer.countAll._sum.amount == null ? 0 : totalResult.washer.countAll._sum.amount
revenueMachineQR[0] = totalResult.washer.countQR._sum.amount == null ? 0 : totalResult.washer.countQR._sum.amount
revenueMachineCash[0] = totalResult.dryer.countCash._sum.amount == null ? 0 : totalResult.dryer.countCash._sum.amount

revenueMachine[1] = totalResult.dryer.countAll._sum.amount == null ? 0 : totalResult.dryer.countAll._sum.amount
revenueMachineQR[1] = totalResult.dryer.countQR._sum.amount == null ? 0 : totalResult.dryer.countQR._sum.amount
revenueMachineCash[1] = totalResult.dryer.countCash._sum.amount == null ? 0 : totalResult.dryer.countCash._sum.amount

seriesRevenue.value = [
    {
        name: 'Total',
        group: 'revenue',
        data: revenueMachine
    },
    {
        name: 'QR',
        group: 'payBy',
        data: revenueMachineQR
    },
    {
        name: 'Cash',
        group: 'payBy',
        data: revenueMachineCash
    }
]

// console.log("seriesRevenue", seriesRevenue.value)

//Call api direct
const result: any = await $fetch('/api/transaction/groupByHour?filter='
    + branchSelected.value + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

// console.log("series data1", result.data)
revenueData.value = result.data.revenue
transactionData.value = result.data.transaction


async function getRevenue(branchSelected: string) {
    const totalResult = await getRowsNumberCount(branchSelected)
    // console.log("totalResult: ", totalResult)

    transTotal.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._count)
    transWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._count)
    transDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._count)

    // revenue.value = totalResult.total._sum.amount
    revenueTotal.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._sum.amount)

    revenueWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._sum.amount)
    revenueDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._sum.amount)

    counterQR.value = totalResult.total.countQR._count
    counterCash.value = totalResult.total.countCash._count

    revenueQR.value = new Intl.NumberFormat('en-US').format(totalResult.total.countQR._sum.amount)
    revenueCash.value = new Intl.NumberFormat('en-US').format(totalResult.total.countCash._sum.amount)

    revenueMachine[0] = totalResult.washer.countAll._sum.amount
    revenueMachineQR[0] = totalResult.washer.countQR._sum.amount
    revenueMachineCash[0] = totalResult.washer.countCash._sum.amount

    revenueMachine[1] = totalResult.dryer.countAll._sum.amount
    revenueMachineQR[1] = totalResult.dryer.countQR._sum.amount
    revenueMachineCash[1] = totalResult.dryer.countCash._sum.amount


    // revenueMachine[0] = 5000
    // revenueMachineQR[0] = 3000
    // revenueMachineCash[0] = 20

    // revenueMachine[1] = 200
    // revenueMachineQR[1] = 4000
    // revenueMachineCash[1] = 20

    seriesRevenue.value = [
        {
            name: 'Total',
            data: revenueMachine
        },
        {
            name: 'QR',
            data: revenueMachineQR
        },
        {
            name: 'Cash',
            data: revenueMachineCash
        }
    ]

    // console.log("seriesRevenue", seriesRevenue.value)

    // //Call api direct
    // const result:any = await $fetch('/api/transaction/groupByHour?filter='
    //     + branchSelected.value + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    // console.log("series data1", result.data.revenue)
    // series.value = result.data.revenue
}


async function fetchData(filter: string, startDate: string, endDate: string) {
    try {
        // Use template literals for better readability
        const result: any = await $fetch(`/api/transaction/groupByHour?filter=${filter}&startDate=${startDate}&endDate=${endDate}`);
        console.log("FetchData", result);
        return result;
    } catch (error) {
        // Handle any errors that might occur during the fetch
        console.error('Error fetching data:', error);
        throw error; // Re-throw error to handle it outside this function if needed
    }
}


async function onUpdate(val: any) {
    endDate.value = val
    const today = moment(endDate.value)
    console.log("Start Date Now: ", startDate.value)
    startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss")

    console.log("Now StartDate is", startDate.value)
    endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")
    console.log("endDate Now", endDate.value)

    getRevenue(branchSelected.value)
    const result: any = await $fetch('/api/transaction/groupByHour?filter='
        + branchSelected.value + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    // console.log("series data1", result.data.revenue)
    revenueData.value = result.data.revenue
}

async function onStartDate(value: any, reason: any, details: any) {
    dateClosePopup.value = true
    if (toggleSW.value !== 'range') {
        endDate.value = startDate.value

        // startDate.value = moment.tz(String(startBy), "Asia/Bangkok").toISOString()
        // endDate = today.clone().endOf('day').toISOString() 
        const today = moment(endDate.value)
        endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")

        // endDate.value = moment.tz(String(startDate.value), "Asia/Bangkok").toISOString()
        console.log("endDate Now", endDate.value)
    }

    if (startDay && endDay) {
        totalDay.value = endDay.value - startDay.value

        // console.log("onStartDate->TotalDay: ", totalDay)
    }

    getRevenue(branchSelected.value)
    const result: any = await $fetch('/api/transaction/groupByHour?filter='
        + branchSelected.value + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    // console.log("series data1", result.data.revenue)
    revenueData.value = result.data.revenue
}

async function onEndDate(value: any, reason: any, details: any) {
    if (startDay && endDay) {
        totalDay.value = endDay.value - startDay.value

        // console.log("onEndDate->TotalDay: ", totalDay)
    }
    getRevenue(branchSelected.value)
    const result: any = await $fetch('/api/transaction/groupByHour?filter='
        + branchSelected.value + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    console.log("series data1", result.data.revenue)
    revenueData.value = result.data.revenue
}


function onUpdateMonth(value: any, reason: any, details: any) {
    console.log("Month", value)
}

async function showTrans() {
    console.log("branchName: ", branchSelected.value)

    // tableRef.value.requestServerInteraction()
}



async function getRowsNumberCount(filter: any): Promise<any> {
    console.log("Filter Value: ", filter)

    if (!filter) {
        console.log("Filter without parameter: ")
        const rowsCount: any = await $fetch('/api/transaction/recordsCount')
        console.log("Result:", rowsCount)
        return rowsCount
    }

    const rowsCount: any = await $fetch('/api/transaction/recordsCount?filter='
        + filter + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    // console.log("rowCounts Result:", rowsCount)
    return rowsCount
}



</script>

<style scoped>
.stacked-to-hor{
    /* .row > div{
        padding: 10px 15px;
        background: rgba(#999,.15);
        border: 1px solid rgba(#999,.2);
    } */

    .row + .row{
        margin-top: 1rem;
    }
    
}

.select-date {
    order: 3;
}

.show-revenue-number {
    order: 1;
}

.machine-chart {
    order: 2;
}

.revenue-chart{
    order: 4;
    margin-top: 2rem;
}

/* Responsive for smaller screens */
@media (max-width: 800px) {
    .select-date {
        order: 1;
        max-height: 250px;
    }

    .show-revenue-number {
        order: 2;
    }

    .machine-chart {
        order: 3;
        margin-top: 1rem;
    }

    .revenue-chart{
        order: 4;
        padding:1rem;
        margin-top: 37rem;
    }
}
</style>