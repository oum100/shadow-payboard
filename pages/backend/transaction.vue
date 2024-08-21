<template>
    <div class="q-pa-md">
        <div class="row " style="height: 130px">
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">
                                    Transactions: &nbsp<span>{{ transTotal }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="local_laundry_service" size="28px"/>
                                    Washer:&nbsp<span>{{ transWasher }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="dry_cleaning" size="28px"/>
                                    Dryer:&nbsp<span>{{ transDryer }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="qr_code_2" size="28px"/>
                                    QR:&nbsp<span>{{ counterQR }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="paid" size="28px"/>
                                    Cash:&nbsp<span>{{ counterCash }}</span>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md ">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">
                                    <q-icon name="account_balance" size="32px"/>
                                    &nbsp Revenue: &nbsp<span>{{ revenue }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="local_laundry_service" size="28px"/>
                                    &nbsp<span>{{ revenueWasher }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="dry_cleaning" size="28px"/>
                                    &nbsp<span>{{ revenueDryer }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="qr_code_2" size="28px"/>
                                    &nbsp<span>{{ revenueQR }}</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">
                                    <q-icon name="paid" size="28px"/>
                                    &nbsp<span>{{ revenueCash }}</span>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <!-- <div class="col-3 q-px-md">
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
            <!-- <div class="col-3 q-px-md">
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
        <q-table
            class="my-sticky-dynamic"
            flat bordered
            ref="tableRef"
            title="Transactions"
            :rows="rows"
            :columns ="columns"
            row-key = "index"
            selection="multiple"
            virtual-scroll
            :virtual-scroll-item-size="48"
            :virtual-scroll-sticky-size-start="48"
            :rows-per-page-options="[10,20,30,50,100]"
            v-model:pagination="pagination"
            v-model:selected="selected"
            :filter="filter"
            binary-state-sort
            table-header-style="background: #999999"
            table-header-class="text-white"
            @request="onRequest"
        >
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
                <div class ="col-3 text-h4 text-blue">{{ branchSelected }} transactions  </div>
                <q-space/>
                <div class="q-mx-md q-guttar-md" style="max-width: 230px">
                    <q-select filled dense 
                        v-model="branchSelected" 
                        :options="listBranchOption" 
                        label="Branch" 
                        style="width: 200px"
                        @update:model-value="showTrans()"
                    />
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 250px; width:210px">
                    <q-input filled dense v-model="startDate" label="Start Date" >
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm"
                                    format24h
                                    @update:model-value="onStartDate"
                                >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="startDate" mask="YYYY-MM-DD HH:mm" 
                                    format24h
                                    @update:model-value="onStartDate"
                                >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <!-- <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="startDate" 
                                        today-btn   
                                        @update:model-value="onStartDate"
                                        mask="YYYY-MM-DD HH:mm"
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template> -->
                    </q-input>
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 250px; width:210px">
                    <q-input filled dense v-model="endDate" label="End Date" >
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm"
                                    format24h
                                    @update:model-value="onEndDate"  
                                >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="endDate" mask="YYYY-MM-DD HH:mm" 
                                    format24h
                                    @update:model-value="onEndDate"
                                >
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <!-- <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="endDate" today-btn   
                                        @update:model-value="onEndDate"
                                        mask="YYYY-MM-DD HH:mm" format24h
                                        color="orange"
                                    >
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template> -->
                    </q-input>
                </div>

                <div class="q-mx-md q-guttar-md" style="max-width: 230px">
                    <q-btn icon="restart_alt" title="Set filter to default" @click="resetFilter">Reset Filter</q-btn>
                </div>

                <!-- <q-space />

                <div class="q-mx-md q-guttar-md" style="max-width: 200px">
                    <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div> -->
                
            </template>

            <!-- Customized field "Branch" -->
            <template #body-cell-branch="props" >
                <q-td :props = "props" >
                    {{ props.row.device.branch.branchName }}
                </q-td>
            </template>

            <!-- Customized field "Asset" -->
            <template #body-cell-asset="props" >
                <q-td :props = "props" >
                    {{ props.row.device.deviceName }}
                </q-td>
            </template>

            <!-- <template #body-cell-date="props">
                <q-td :props="props" auto-width class="text-center">
                </q-td>
            </template> -->

            <!-- Customized field "Machine" -->
            <template #body-cell-type="props" >
                <q-td :props = "props" >
                    {{ props.row.device.type}}
                </q-td>
            </template>

            <template #body-cell-paymentBy="props">
                <q-td :props="props" auto-width>
                    <div class="text-start">
                        <q-icon name="qr_code_2" v-if="props.row.paymentBy == 'qrcode'" size="2em"/>
                        <q-icon name="monetization_on" v-else-if="props.row.paymentBy == 'cash'" size="2em"/>
                        <q-icon name="undo" v-else-if="props.row.paymentBy == 'refund'" size="2em"/>
                        <q-icon name="minimize" size="2em" v-else />
                    </div>
                </q-td>
            </template>

            <template #body-cell-status="props">
                <q-td :props="props" auto-width class="text-center">
                    <q-badge v-if="props.row.status === 'paid'" color="green-9" class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                    <q-badge v-else-if="props.row.status === 'refund'" color="red" class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                    <q-badge v-else-if="props.row.status == 'cancel'" color="grey-6" class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                    <q-badge v-else-if="props.row.status == 'admin'" color="blue" class="text-white text-capitalize">{{ props.row.status }}</q-badge>
                </q-td>
            </template>

            <template #body-cell-actions="props">
                <q-td class="text-center">
                    <q-btn flat square size="md" icon="currency_exchange" color="blue" title="Refund" />
                    <q-btn flat square size="md" icon="cancel_presentation" color="red" title="Cancel"> </q-btn>
                </q-td>
            </template>

           
        </q-table>
        <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { date } from 'quasar'

    const tableRef = ref()
    const rows = ref()
    const filter = ref('')
    const selected = ref([])
    let branchSelected = ref('ALL')
    let listBranchOption = ref(['ALL'])
    
    const pagination= ref({
        sortBy: 'desc',
        descending: false,
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
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
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'date', label: 'Date Time', field: 'createdAt', align: 'left', sortable: true},
        {name: 'branch', label: 'Branch', field: 'branch' , align: 'left',sortable: false},
        {name: 'asset', label: 'Asset Name', field: 'asset', align: 'left', sortable: true},
        {name: 'order', label: 'Order ID', field: 'order', align: 'left', sortable: true},
        {name: 'uuid', label: 'UUID', field: 'deviceUuid', align: 'left', sortable: false},
        {name: 'type', label: 'Machine', field: 'type', align: 'left', sortable: true},
        {name: 'price', label: 'Price', field: 'amount', align: 'right', sortable: false},
        {name: 'paymentBy', label: 'Payment By', field: 'paymentBy', align: 'center', sortable: false},
        {name: 'status', label: 'Status', field: 'status', align: 'left', sortable: false},
        {name: 'jobState', label: 'Job State', field: 'jobState', align: 'left', sortable: false},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false}
    ]





    

    onMounted(() => {
        // get initial data from server (1st page)
        tableRef.value.requestServerInteraction()
        
    })


    async function onRequest(props:any){
        //Step 1 get RowNumber Count 
        //Step 2 Fetch data from server
        //Step 3 set pagination parameter

        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter    

        console.log("Execute here")

        //Set startDate and endDate is today        

        let yourDate = new Date(Date.now())
        console.log("yourDate A",yourDate)

        // var now = new Date();
        // var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        // console.log("utc: ",utc)

        // console.log("utc-new: ",utc)
        // yourDate = utc

        // yourDate =new Date(Date.UTC(yourDate.getFullYear(),yourDate.getMonth(),yourDate.getDate(),yourDate.getHours(),yourDate.getMinutes()))
        // console.log("utc Date",yourDate)

        // let nowToday = yourDate.toISOString().split('T')[0]
        // let nowToday = yourDate.toLocaleString()
        

        // const nowToday = yourDate.toISOString()
        // console.log("yourDate",nowToday)

        if (!startDate.value){
            yourDate.setHours(0)
            yourDate.setMinutes(0)
            // yourDate.toISOString()

            // const newDate = date.subtractFromDate(yourDate, { hours: 1 }) 
            startDate.value = date.formatDate(yourDate,'YYYY-MM-DD HH:mm')
            // startDate.value = new Date(yourDate.getFullYear(),yourDate.getMonth(), yourDate.getDate(),0,0).toLocaleString(
            //     'sv-SE',
            //     { 
            //         year: 'numeric',
            //         month: '2-digit',
            //         day: '2-digit',
            //         hour: '2-digit',
            //         minute: '2-digit',
            //         hour12:false,
            //         // timeStyle:'short'
            //     }
            // )
            
            console.log("Start Date: ",startDate.value)
        }

        if((!endDate.value)){
            yourDate.setHours(23)
            yourDate.setMinutes(59)
            endDate.value = date.formatDate(yourDate,'YYYY-MM-DD HH:mm')
            // endDate.value = new Date(yourDate.getFullYear(),yourDate.getMonth(), yourDate.getDate(),23,59).toLocaleString(
            //     'sv-SE',
            //     { 
            //         year: 'numeric',
            //         month: '2-digit',
            //         day: '2-digit',
            //         hour: '2-digit',
            //         minute: '2-digit',
            //         hour12:false,
            //         // timeStyle:'short'
            //     }                
            // )
            console.log("End Date: ",endDate.value)
            // console.log("test Date:", testDate)
        }

        //Making Branch List
        const optionList = await $fetch('/api/transaction/listBranchOption')
        console.log(optionList)

        // partnerResult.value?.data.forEach((item: any) => {
        //     // console.log("Each Item:",item)
        //     listPartnerOption.value.push(item)
        // })
        listBranchOption = ref(['ALL'])
        optionList.forEach((item:any)=>{
            listBranchOption.value.push(item.branchName)
        })

        // startDate.value = nowToday
        // endDate.value = nowToday
        // endDate.value = today

        // console.log("page:",page)
        // console.log("rowsPerPage:",rowsPerPage)
        
        // Step1: getting rowsNumber
        const totalResult = await getRowsNumberCount(branchSelected.value)
        
        console.log("totalResult: ",totalResult)

        pagination.value.rowsNumber = totalResult.totalCount._count
        console.log("pagination-rowsNumber: ", pagination.value.rowsNumber)

        transTotal.value = new Intl.NumberFormat('en-US').format(pagination.value.rowsNumber)
        transWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washerCount._count)
        transDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryerCount._count)

        // revenue.value = totalResult.totalCount._sum.amount
        revenue.value = new Intl.NumberFormat('en-US').format(totalResult.totalCount._sum.amount)

        revenueWasher.value = new Intl.NumberFormat('en-US').format(totalResult.washerCount._sum.amount)
        revenueDryer.value = new Intl.NumberFormat('en-US').format(totalResult.dryerCount._sum.amount)

        // pagination.value.rowsNumber = await getRowsNumberCount(filter)

        const paymentRevenue = await getPaymentRevenue(branchSelected.value)
        console.log("paymentRevenue: ",paymentRevenue)
        counterQR.value = paymentRevenue.qrResult._count
        counterCash.value = paymentRevenue.cashResult._count

        revenueQR.value = paymentRevenue.qrResult._sum.amount
        revenueCash.value = paymentRevenue.cashResult._sum.amount
       


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
        const dataTable = await $fetch("/api/transaction/listByPagination",{
            method: 'POST',
            body: {
                "merchantCode":"10000105",
                "branchName": branchSelected.value,
                "page":startRow,
                "rowsPerPage":rowsPerPage,
                "rowsNumber":fetchCount,
                "startDate":startDate.value ,
                "endDate":endDate.value 
            }
        })
        console.log("Data: ",dataTable);
        // ---------------  Load data from server -------------------



        //------------------  Assign data to Rows ---------------------
        // rows = rows.concat(data)
        // rows = data
        // rows.splice(0, rows.length, ...data)
        rows.value = dataTable
        // rows.value.forEach((row:any,index:any) =>{
        //     console.log("row data: ",row)
        // })

        
        rows.value.forEach((row:any, index:number) => {
            // Add index to array
            // console.log("row data: ",row)
            row.index = startRow + index + 1

            // Set DateTime format
            row.createdAt= new Intl.DateTimeFormat('en-GB', {
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


    async function fetchFromServer(startRow:number, count:number, filter:string, sortBy:string, descending:string){



    }

    async function getRowsNumberCount(filter:any){
        console.log("Filter Value: ",filter)

        if(!filter){
            console.log("Filter without parameter: ")
            const rowsCount = await $fetch('/api/transaction/recordsCount')
            console.log("Result:",rowsCount)
            return rowsCount
        }

        console.log("Filter with parameter: ")
        const rowsCount:any = await $fetch('/api/transaction/recordsCount?filter='
        +filter +'&startDate='+startDate.value +'&endDate='+endDate.value)

        console.log("Result:",rowsCount)
        return rowsCount
    }


    async function getPaymentRevenue(filter:any){
        if(!filter){
            const result = await $fetch('/api/transaction/paymentRevenue')
            return result
        }else{
            const result = await $fetch('/api/transaction/paymentRevenue?filter='
                +filter+'&startDate='+startDate.value + '&endDate='+endDate.value
            )
            return result
        }
    }



    async function showTrans(){
        console.log("branchName: ",branchSelected.value)
        
        tableRef.value.requestServerInteraction()
    }

    async function resetFilter(){
        branchSelected.value = 'ALL'
        startDate.value = ''  
        endDate.value = ''  

        tableRef.value.requestServerInteraction()
    }

    function onStartDate(value:any,reason:any,details:any){
        // startDay.value = details.day
        // console.log("onStartDate->Value:",value)
        // console.log("onStartDate->Reason:",reason)
        // console.log("onStartDate->Details:",details)
       
        if(startDay && endDay){
            totalDay.value = endDay.value - startDay.value
            tableRef.value.requestServerInteraction()
            console.log("onStartDate->TotalDay: ",totalDay)
        }
    }

    function onEndDate(value:any,reason:any,details:any){
        // endDay.value = details.day
        // console.log("onEndDate->Value:",value)
        // console.log("onEndDate->Reason:",reason)
        // console.log("onEndDate->Details:",details)

        if(startDay && endDay){
            totalDay.value = endDay.value - startDay.value
            tableRef.value.requestServerInteraction()
            console.log("onEndDate->TotalDay: ",totalDay)
        }


        //Trigger request to server. It will execute onRequest function
        // /api/transaction/recordsCount?filter=ALL&startDate=15-07-2024&endDate=21-07-2024"
    }



</script>

<style lang="scss" scoped>
    .my-sticky-dynamic{
        height: 650px;
      
        .q-table__top,
        .q-table__bottom{
            thead, tr:first-child, th{
                /* bg color is important for th; just specify one */
                background-color: #cccccc       
            } 
            thead, tr, th {
                position: sticky;
                z-index: 1;
            }     
            thead, tr:last-child, th{
                top: 48px;
            }
            thead, tr:first-child, th{
                top: 0;
            }
            tbody{
                scroll-margin-top: 48px;
            }
        }
    }
</style>
