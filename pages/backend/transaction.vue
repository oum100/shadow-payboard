<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="q-pa-md col-12 col-md-4">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="row">
                            <div class="col-12">
                                <div class="row text-h6">
                                    Transactions: &nbsp<span>{{ transTotal }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Washer</q-tooltip>
                                    <q-icon name="local_laundry_service" size="28px" />
                                    <span>&nbsp{{ transWasher }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Dryer</q-tooltip>
                                    <q-icon name="dry_cleaning" size="28px" />
                                    <span>&nbsp{{ transDryer }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Pay By QR</q-tooltip>
                                    <q-icon name="qr_code_2" size="28px" />
                                    <span>&nbsp{{ counterQR }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Pay By Cash</q-tooltip>
                                    <q-icon name="paid" size="28px" />
                                    <span>&nbsp{{ counterCash }}</span>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="q-pa-md col-12 col-md-4">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="row">
                            <div class="col-12">
                                <div class="row text-h6">
                                    <q-icon name="account_balance" size="32px" />
                                    &nbsp Revenue: &nbsp<span>{{ revenue }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Washer</q-tooltip>
                                    <q-icon name="local_laundry_service" size="28px" />
                                    <span>&nbsp{{ revenueWasher }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>Dryer</q-tooltip>
                                    <q-icon name="dry_cleaning" size="28px" />
                                    <span>&nbsp{{ revenueDryer }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>By QrCode</q-tooltip>
                                    <q-icon name="qr_code_2" size="28px" />
                                    <span>&nbsp{{ revenueQR }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-tooltip>By Cash</q-tooltip>
                                    <q-icon name="paid" size="28px" />
                                    <span>&nbsp{{ revenueCash }}</span>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <!-- <div class="q-pa-md col-xs-12 col-sm-12 col-md-4">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">Payment: &nbsp<span></span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">QR:&nbsp<span></span></div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">Cash:&nbsp<span></span></div>
                            </div>
                        </div>
                    
                    </q-card-section>
                </q-card>
            </div> -->
            <!-- <div class="q-pa-md col-xs-12 col-sm-12 col-md-4">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">Revenue: &nbsp<span></span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">QR:&nbsp<span></span></div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">Cash:&nbsp<span></span></div>
                            </div>
                        </div>
                    
                    </q-card-section>
                </q-card>
            </div> -->
        </div>
        <!-- @ts-expect-error -->
        <!-- <q-responsive :ratio="16 / 9"> -->
            <q-table class="my-sticky-dynamic" flat bordered ref="tableRef" title="Transactions" :rows="rows"
                :columns="columns" row-key="index" selection="multiple" virtual-scroll :virtual-scroll-item-size="48"
                :virtual-scroll-sticky-size-start="48" :rows-per-page-options="[10, 20, 30, 50, 100]"
                v-model:pagination="pagination" v-model:selected="selected" :filter="filter" binary-state-sort
                table-header-style="background: #999999" table-header-class="text-white" @request="onRequest">
                <!-- <template #header="props">
                <q-tr :props="props" >
                    <q-th
                        v-for = "col in props.cols"
                            :key ="col.name"
                            :props="props"
                            class="bg-grey-4"
                        >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template> -->


                <template #top>
                    <div class="row q-gutter-md" style="width:100%">
                        <div class="column col col-12 col-md-3 text-h4 text-blue">
                            {{ branchSelected }} Transactions 
                        </div>
                        <q-space />
                        <div class="col col-12 col-md-2" >
                            <q-select filled dense v-model="branchSelected" :options="listBranchOption" label="Branch"
                                @update:model-value="showTrans()" 
                            />
                        </div>

                        <div class="col col-12 col-md-2 mt-mobile" >
                            <DatePicker label="Start Date" v-model:selectedDate=startDate :time=true :range=false @updated="onStartDate"  />
                            <!-- <q-input filled dense v-model="startDate" label="Start Date">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm" format24h
                                                @update:model-value="onStartDate"
                                            >
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-time v-model="startDate" mask="YYYY-MM-DD HH:mm" format24h
                                                @update:model-value="onStartDate"
                                            >
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input> -->
                        </div>

                        <div class="col col-12 col-md-2 mt-mobile" >
                            <DatePicker label="End Date" v-model:selectedDate=endDate :time=true :range="false" @updated="onEndDate"  />
                            <!-- <q-input filled dense v-model="endDate" label="End Date">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm" format24h
                                                @update:model-value="onEndDate"
                                            >
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-time v-model="endDate" mask="YYYY-MM-DD HH:mm" format24h
                                                @update:model-value="onEndDate"
                                            >
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-time>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input> -->
                        </div>

                        <div class="col mt-mobile">
                            <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset
                                Filter</q-btn>
                        </div>
                    </div>
                </template>

                <!-- Customized field "Branch" -->
                <template #body-cell-branch="props">
                    <q-td :props="props">
                        {{ props.row.device.branch.branchName }}
                    </q-td>
                </template>

                <!-- Customized field "Asset" -->
                <template #body-cell-asset="props">
                    <q-td :props="props">
                        {{ props.row.device.deviceName }}
                    </q-td>
                </template>

                <!-- <template #body-cell-date="props">
                    <q-td :props="props" auto-width class="text-center">
                    </q-td>
                </template> -->

                <!-- Customized field "Machine" -->
                <template #body-cell-type="props">
                    <q-td :props="props">
                        {{ props.row.device.type }}
                    </q-td>
                </template>

                <template #body-cell-paymentBy="props">
                    <q-td :props="props" auto-width>
                        <div class="text-start">
                            <q-icon name="qr_code_2" v-if="props.row.paymentBy == 'qrcode'" size="2em" />
                            <q-icon name="monetization_on" v-else-if="props.row.paymentBy == 'cash'" size="2em" />
                            <q-icon name="undo" v-else-if="props.row.paymentBy == 'refund'" size="2em" />
                            <q-icon name="minimize" size="2em" v-else />
                        </div>
                    </q-td>
                </template>

                <template #body-cell-status="props">
                    <q-td :props="props" auto-width class="text-center">
                        <q-badge v-if="props.row.status === 'paid'" color="green-9"
                            class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                        <q-badge v-else-if="props.row.status === 'refund'" color="red"
                            class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                        <q-badge v-else-if="props.row.status == 'cancel'" color="grey-6"
                            class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                        <q-badge v-else-if="props.row.status == 'admin'" color="blue"
                            class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                    </q-td>
                </template>

                <template #body-cell-actions="props">
                    <q-td class="text-center">
                        <q-btn flat square size="md" icon="currency_exchange" color="blue" title="Refund" />
                        <q-btn flat square size="md" icon="cancel_presentation" color="red" title="Cancel"> </q-btn>
                    </q-td>
                </template>


            </q-table>
        <!-- </q-responsive> -->

        <!-- <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { date } from 'quasar'
import moment from 'moment-timezone'

const tableRef = ref()
const rows = ref()
const filter = ref('')
const selected = ref([])
let branchSelected = ref('ALL')
let listBranchOption = ref(['ALL'])
let vClosePopup = ref(false)
const dateClosePopup = ref(false)

const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 1
})

const revenue = ref('');
const revenueWasher = ref('')
const revenueDryer = ref('')
const transTotal = ref('')
const transWasher = ref('')
const transDryer = ref('')

const counterQR = ref('')
const counterCash = ref('')
const revenueQR = ref('')
const revenueCash = ref('')


let startDate = ref('')
const startDay = ref()
let endDate = ref('')
const endDay = ref()
const totalDay = ref()





const columns = [
    { name: 'index', label: 'No', field: 'index', align: 'left', sortable: true },
    { name: 'date', label: 'Date Time', field: 'createdAt', align: 'left', sortable: true },
    { name: 'branch', label: 'Branch', field: 'branch', align: 'left', sortable: false },
    { name: 'asset', label: 'Asset Name', field: 'asset', align: 'left', sortable: true },
    { name: 'type', label: 'Machine', field: 'type', align: 'left', sortable: true },
    { name: 'uuid', label: 'UUID', field: 'deviceUuid', align: 'left', sortable: false },
    { name: 'order', label: 'Order ID', field: 'order', align: 'left', sortable: true },
    { name: 'price', label: 'Price', field: 'amount', align: 'right', sortable: false },
    { name: 'paymentBy', label: 'Payment By', field: 'paymentBy', align: 'center', sortable: false },
    { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: false },
    { name: 'jobState', label: 'Job State', field: 'jobState', align: 'left', sortable: false },
    { name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false }
]







onMounted(() => {
    // get initial data from server (1st page)
    tableRef.value.requestServerInteraction()

})


async function onRequest(props: any) {
    //Step 1 get RowNumber Count 
    //Step 2 Fetch data from server
    //Step 3 set pagination parameter

    const { page, rowsPerPage, sortBy, descending } = props.pagination
    const filter = props.filter

    console.log("Execute here")

    //Set startDate and endDate is today        
    // let yourDate = new Date(Date.now())
    // console.log("yourDate A", yourDate)

    // if (!startDate.value) {
    //     yourDate.setHours(0)
    //     yourDate.setMinutes(0)
    //     startDate.value = date.formatDate(yourDate, 'YYYY-MM-DD HH:mm')
    //     console.log("Start Date: ", startDate.value)
    // }

    // if ((!endDate.value)) {
    //     yourDate.setHours(23)
    //     yourDate.setMinutes(59)
    //     endDate.value = date.formatDate(yourDate, 'YYYY-MM-DD HH:mm')
    //     console.log("End Date: ", endDate.value)
    // }

    // var thisDay = moment.tz(String(new Date(Date.now())), "Asia/Bangkok").toISOString();
    // const today = moment(thisDay)

    const today = moment(String(new Date(Date.now()))).tz("Asia/Bangkok")
    console.log("Today: ",today)
    !startDate.value?startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss"):console.log("Start Date: ", startDate.value) 
    console.log("Start Date: ", startDate.value)
    !endDate.value?endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss"):console.log("End Date: ", endDate.value)
    console.log("End Date: ", endDate.value)

    //Making Branch List
    const optionList = await $fetch('/api/transaction/listBranchOption')
    // console.log("listBranchOption",optionList)

    listBranchOption = ref(['ALL'])
    optionList.forEach((item: any) => {
        listBranchOption.value.push(item.branchName)
    })

    // startDate.value = nowToday
    // endDate.value = nowToday
    // endDate.value = today

    // console.log("page:",page)
    // console.log("rowsPerPage:",rowsPerPage)

    // Step1: getting rowsNumber
    const totalResult = await getRowsNumberCount(branchSelected.value)
    console.log("totalResult: ", totalResult)

    pagination.value.rowsNumber = totalResult.total.countAll._count
    console.log("pagination-rowsNumber: ", pagination.value.rowsNumber)

    transTotal.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._count)
    transWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._count)
    transDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._count)

    // revenue.value = totalResult.total._sum.amount
    revenue.value = new Intl.NumberFormat('en-US').format(totalResult.total.countAll._sum.amount)

    revenueWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washer.countAll._sum.amount)
    revenueDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryer.countAll._sum.amount)

    // pagination.value.rowsNumber = await getRowsNumberCount(filter)

    // const paymentRevenue: any = await getPaymentRevenue(branchSelected.value)
    // console.log("paymentRevenue: ", paymentRevenue)

    counterQR.value = new Intl.NumberFormat('en-US').format(totalResult.total.countQR._count)
    counterCash.value = new Intl.NumberFormat('en-US').format(totalResult.total.countCash._count)

    revenueQR.value = new Intl.NumberFormat('en-US').format(totalResult.total.countQR._sum.amount)
    revenueCash.value = new Intl.NumberFormat('en-US').format(totalResult.total.countCash._sum.amount)



    // Step 3: calculate and setting pagination
    // get all rows if "All" (0) is selected
    const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage

    //Fetch data from server here


    //setting new pagination
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

    // ---------------  Load data from server ----------------------
    // const data = await $fetch("/api/transaction/getAll")
    // console.log("startDate->",startDate)
    // console.log("endDate->",endDate)
    const dataTable = await $fetch("/api/transaction/listByPagination", {
        method: 'POST',
        body: {
            "merchantCode": "10000105",
            "branchName": branchSelected.value,
            "page": startRow,
            "rowsPerPage": rowsPerPage,
            "rowsNumber": fetchCount,
            "startDate": startDate.value,
            "endDate": endDate.value
        }
    })
    console.log("Data: ", dataTable);
    // ---------------  Load data from server -------------------



    //------------------  Assign data to Rows ---------------------
    // rows = rows.concat(data)
    // rows = data
    // rows.splice(0, rows.length, ...data)
    rows.value = dataTable
    // rows.value.forEach((row:any,index:any) =>{
    //     console.log("row data: ",row)
    // })


    rows.value.forEach((row: any, index: number) => {
        // Add index to array
        // console.log("row data: ",row)
        row.index = startRow + index + 1

        // Set DateTime format
        row.createdAt = new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Asia/Bangkok',
        }).format(new Date(row.createdAt))

        // Calculate Revenue    
        // revenue = revenue + row.amount


        // // Calculation Total
        // if(row.device.type === 'Washer'){
        //     transWasher = transWasher + 1
        //     revenueWasher = revenueWasher + row.amount
        // }

        // if(row.device.type === 'Dryer'){
        //     transDryer = transDryer + 1
        //     revenueDryer = revenueDryer + row.amount
        // }



        // // console.log(revenue)

        // // console.log(index, "branchName: ",row.device.branch.branchName)
        // // console.log("return: ",listBranchOption.reduce(myFunction))



        // if(listBranchOption.value.length == 0){
        //     listBranchOption.value.push(row.device.branch.branchName)
        //     // console.log("Add New1: ",row.device.branch.branchName)
        // }else{
        //     listBranchOption.value.forEach((option,inx) => {
        //         // console.log("Branch Now: ",row.device.branch.branchName)
        //         if(!listBranchOption.value.includes(row.device.branch.branchName)){
        //             listBranchOption.value.push(row.device.branch.branchName)
        //             // console.log("Add New2: ",row.device.branch.branchName)
        //         }else{
        //             // console.log("Found: ",option)
        //         }
        //     })
        //     // if(row.device.branch.branchName !== listBranchOption.reduce(myFunction)){
        //     //     listBranchOption.push(row.device.branch.branchName)
        //     // }
        //     // console.log("new item:", listBranchOption.filter(myFunction))
        //     // console.log("return: ",listBranchOption.reduce(myFunction))
        // }

    })

    //------------------  Assign data to Rows ---------------------
}


async function fetchFromServer(startRow: number, count: number, filter: string, sortBy: string, descending: string) {



}

async function getRowsNumberCount(filter: any) {
    console.log("Filter Value: ", filter)

    if (!filter) {
        console.log("Filter without parameter: ")
        const rowsCount = await $fetch('/api/transaction/recordsCount')
        console.log("Result:", rowsCount)
        return rowsCount
    }

    console.log("Filter with parameter: ")
    const rowsCount: any = await $fetch('/api/transaction/recordsCount?filter='
        + filter + '&startDate=' + startDate.value + '&endDate=' + endDate.value)

    // console.log("Result:", rowsCount)
    return rowsCount
}


async function getPaymentRevenue(filter: any) {
    if (!filter) {
        const result = await $fetch('/api/transaction/paymentRevenue')
        return result
    } else {
        const result = await $fetch('/api/transaction/paymentRevenue?filter='
            + filter + '&startDate=' + startDate.value + '&endDate=' + endDate.value
        )
        return result
    }
}



async function showTrans() {
    console.log("branchName: ", branchSelected.value)

    tableRef.value.requestServerInteraction()
}

async function resetFilter() {
    branchSelected.value = 'ALL'
    startDate.value = ''
    endDate.value = ''

    tableRef.value.requestServerInteraction()
}

async function onStartDate(value: any) {
    console.log("onStartDate->val: ",value)
    startDate.value = value
    totalDay.value = endDay.value - startDay.value
    tableRef.value.requestServerInteraction()

    // if (startDay && endDay) {
    //     totalDay.value = endDay.value - startDay.value
    //     tableRef.value.requestServerInteraction()
    //     console.log("onStartDate->TotalDay: ", totalDay)
    // } 
}

async function onEndDate(value: any) {
    console.log("onEndDate->val: ",value)
    endDate.value = value
    totalDay.value = endDay.value - startDay.value
    tableRef.value.requestServerInteraction()
    // if (startDay && endDay) {
    //     totalDay.value = endDay.value - startDay.value
    //     tableRef.value.requestServerInteraction()
    //     console.log("onEndDate->TotalDay: ", totalDay)
    // }
}



</script>

<style lang="scss" scoped>
    .my-sticky-dynamic {
        height: 650px;

        .q-table__top,
        .q-table__bottom {

            thead,
            tr:first-child,
            th {
                /* bg color is important for th; just specify one */
                background-color: #cccccc
            }

            thead,
            tr,
            th {
                position: sticky;
                z-index: 1;
            }

            thead,
            tr:last-child,
            th {
                top: 48px;
            }

            thead,
            tr:first-child,
            th {
                top: 0;
            }

            tbody {
                scroll-margin-top: 48px;
            }
        }
    }

    @media (max-width: 768px) {
        .font-mobile{
            font-size: 25px;
        }

        .mt-mobile{
            margin-top: 0.5rem;
        }

        .mb-mobile{
            margin-bottom: 0.5rem;
        }
    }
    
</style>

