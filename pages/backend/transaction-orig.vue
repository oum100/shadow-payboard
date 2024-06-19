<template>
    <div class="q-pa-md">
        <div class="row " style="height: 130px">
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">Transaction: &nbsp<span>{{ rows.length }}</span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="row text-subtitle1">Washer:&nbsp<span>{{ transWasher }}</span></div>
                            </div>
                            <div class="col-4">
                                <div class="row text-subtitle1">Dryer:&nbsp<span>{{ transDryer}}</span></div>
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
                                <div class="row text-h6">Revenue: &nbsp<span>{{ revenue }}</span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row text-subtitle1">Washer:&nbsp<span>{{ revenueWasher }}</span></div>
                            </div>
                            <div class="col-6">
                                <div class="row text-subtitle1">Dryer:&nbsp<span>{{ revenueDryer}}</span></div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">Total: &nbsp<span></span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="row text-subtitle1">Washer:&nbsp<span></span></div>
                            </div>
                            <div class="col-4">
                                <div class="row text-subtitle1">Dryer:&nbsp<span></span></div>
                            </div>
                        </div>
                    
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        
                        <div class = "row">
                            <div class="col-12">
                                <div class="row text-h6">Total: &nbsp<span></span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="row text-subtitle1">Washer:&nbsp<span></span></div>
                            </div>
                            <div class="col-4">
                                <div class="row text-subtitle1">Dryer:&nbsp<span></span></div>
                            </div>
                        </div>
                    
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <!-- @ts-expect-error -->
        <q-table
            flat bordered
            ref="tableRef"
            title="Transactions"
            :rows="rows"
            :columns ="columns"
            row-key="index"
            virtual-scroll
            :rows-per-page-options="[20,30,50,100]"
            v-model:pagination="pagination"
            :filter="filter"
            @update:pagination = "newPage()"
        >
            <template #header="props">
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
            </template>


            <template #top>
                <div class ="col-3 text-h4 text-blue">{{ branchSelected }} transactions  </div>
                <!-- <q-date v-model="model" range /> -->
                <!-- <div class="q-mx-md q-guttar-md" style="max-width: 250px">
                    <q-select filled dense v-model="branchSelected" :options="listBranchOption" label="Start" style="width: 200px"/>
                </div>
                <div class="q-mx-md q-guttar-md" style="max-width: 250px">
                    <q-select filled dense v-model="branchSelected" :options="listBranchOption" label="Finish" style="width: 200px"/>
                </div> -->
                
                <div class="q-mx-md q-guttar-md" style="max-width: 250px">
                    <q-select filled dense 
                        v-model="branchSelected" 
                        :options="listBranchOption" 
                        label="Branch" 
                        style="width: 200px"
                        @update:model-value="showTrans()"
                    />
                </div>
                <q-space />
                <div class="q-mx-md q-guttar-md" style="max-width: 500px">
                    <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                
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

            <template #body-cell-payBy="props">
                <q-td :props="props" auto-width>
                    <div class="text-start">
                        <q-icon name="qr_code_2" v-if="props.row.payBy === 'QR'" size="2em"/>
                        <q-icon name="monetization_on" v-else-if="props.row.payBy === 'cash'" size="2em"/>
                        <q-icon name="undo" v-else-if="props.row.payBy === 'refund'" size="2em"/>
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
    </div>
</template>

<script setup lang="ts">
    const tableRef = ref()
    const selected = ref([])
    let branchSelected = ref('ALL')
    let listBranchOption:any[] = ['ALL']
    const pagination= ref({
        page:1,
        rowsPerPage: 20,
        rowsNumber:1
    })
    const filter = ref('')
    let revenue = 0;
    let revenueWasher = 0
    let revenueDryer = 0

    let transWasher = 0;
    let transDryer = 0;

    let model = ref()
    const columns = [
        {name: 'index', label: 'No', field: 'index', align: 'left', sortable: true},
        {name: 'date', label: 'Date Time', field: 'createdAt', align: 'left', sortable: true},
        {name: 'branch', label: 'Branch', field: 'branch' , align: 'left',sortable: false},
        {name: 'asset', label: 'Asset Name', field: 'asset', align: 'left', sortable: true},
        {name: 'order', label: 'Order ID', field: 'order', align: 'left', sortable: true},
        {name: 'uuid', label: 'UUID', field: 'deviceUuid', align: 'left', sortable: false},
        {name: 'type', label: 'Machine', field: 'type', align: 'left', sortable: true},
        {name: 'price', label: 'Price', field: 'amount', align: 'left', sortable: false},
        {name: 'payBy', label: 'Pay by', field: 'channel', align: 'left', sortable: false},
        {name: 'status', label: 'Status', field: 'status', align: 'left', sortable: false},
        {name: 'jobState', label: 'Job State', field: 'jobState', align: 'left', sortable: false},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false}
    ]


    let rows:any[]=[]
    // for (let i = 0; i < 10; i++) {
    //     rows = rows.concat(info.slice(0).map(r => ({ ...r })))
    // }

    //Load data from server
    // const data = await $fetch("/api/transaction/getAll")

    const data = await $fetch("/api/transaction/listByPagination",{
        method: 'post',
        body: {
            "merchantCode":"10000105",
            "branchName": branchSelected.value,
            "page":pagination.value.page,
            "rowsPerPage":100,
            // "rowsPerPage":pagination.value.rowsPerPage,
            "rowsNumber":pagination.value.rowsNumber
        }
    })
    
    // console.log(data)

    rows = rows.concat(data)
    // rows = data
  
    rows.forEach((row:any, index:number) => {
        // Add index to array
        row.index = index+1

        // Set DateTime format
        row.createdAt= new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Asia/Bangkok',
        }).format(new Date(row.createdAt))
        
        // Finding Revenue
        revenue = revenue + row.amount

        // Calculation Total
        if(row.device.type === 'Washer'){
            transWasher = transWasher + 1
            revenueWasher = revenueWasher + row.amount
        }

        if(row.device.type === 'Dryer'){
            transDryer = transDryer + 1
            revenueDryer = revenueDryer + row.amount
        }

        

        // console.log(revenue)

        // console.log(index, "branchName: ",row.device.branch.branchName)
        // console.log("return: ",listBranchOption.reduce(myFunction))


        if(listBranchOption.length == 0){
            listBranchOption.push(row.device.branch.branchName)
            console.log("Add New1: ",row.device.branch.branchName)
        }else{
            listBranchOption.forEach((option,inx) => {
                console.log("Branch Now: ",row.device.branch.branchName)
                if(!listBranchOption.includes(row.device.branch.branchName)){
                    listBranchOption.push(row.device.branch.branchName)
                    console.log("Add New2: ",row.device.branch.branchName)
                }else{
                    console.log("Found: ",option)
                }
            })
            // if(row.device.branch.branchName !== listBranchOption.reduce(myFunction)){
            //     listBranchOption.push(row.device.branch.branchName)
            // }
            // console.log("new item:", listBranchOption.filter(myFunction))
            // console.log("return: ",listBranchOption.reduce(myFunction))
        }
        
    })

    console.log("list: ",listBranchOption)

    function myFunction(value:any,index:any,array:any){
        console.log("value: ",value)
    }
    
    function getRowNumber(filter:any){
        if(!filter){
            return data.length
        }
    }

    async function showTrans(){
        console.log(branchSelected)
        const data = await $fetch("/api/transaction/listByPagination",{
            method: 'post',
            body: {
                "merchantCode":"10000105",
                "branchName": branchSelected.value,
                "page":pagination.value.page,
                "rowsPerPage":20,
                // "rowsPerPage":pagination.value.rowsPerPage,
                "rowsNumber":pagination.value.rowsNumber
            }
        })
    }

    async function newPage(){
        
    }

 
    

</script>

