<template>
    <div class="q-pa-md">
        <div class="row " style="height: 130px">
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Total</div>
                        <div class="text-h4">{{count}}</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md ">
                <q-card style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Active</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #014a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">In Active</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-3 q-px-md">
                <q-card style="background: radial-gradient(circle, #3588ff 0%, #012a88 100%)" class="text-white">
                    <q-card-section>
                        <div class="text-h6">Available</div>
                        <div class="text-h4">100</div>
                    </q-card-section>
                </q-card>
            </div>   
        </div>
        <q-table
            flat bordered
            title="Device List"
            :rows="rows"
            :columns="columns"
            row-key="index"
            selection="multiple"
            virtual-scroll
            :rows-per-page-options="[5,10,20,25,50]"
            :filter="filter"
            :pagination="pagination"
            v-model:selected="selected"
            table-header-style="background: #eeeeee"
            :selected-rows-label="getSelectedString"
        >
            <template #top-right>
                <!-- <div class="q-mr-md q-guttar-md">
                    <q-btn icon="arrow_circle_up" title="Active">Active</q-btn>
                    <q-btn icon="upgrade" title="Firmware Upgrade">OTA</q-btn>
                </div> -->
                <div class="q-mr-md q-guttar-md">
                    <q-btn icon="sync_alt" title="Ping">Ping</q-btn>
                    <q-btn icon="restart_alt" title="Reset">RST</q-btn>
                    <q-btn icon="power_settings_new" title="Turn ON">ON</q-btn>
                    <q-btn icon="mode_standby" title="Turn OFF">OFF</q-btn>
                    <q-btn icon="power_off" title="Out of service">Offline</q-btn>
                </div>
                <div class="q-mr-md q-guttar-md">
                    <q-btn icon="add_circle" title="Create Job">Create</q-btn>
                    <q-btn icon="cancel" title="Cancel existing job">Cancel</q-btn>
                    <q-btn icon="fact_check" title="Testign Asset">Test</q-btn>
                </div>
                
            </template>

            <!-- Customized field "Status" -->
            <template #body-cell-status="props">
                <q-td :props="props">
                    <div v-if="props.row.status ==='Active'" class="text-bold text-positive text-caption text-capitalize">
                        {{ props.row.status }}
                    </div>
                    <div v-if="props.row.status === 'Registered'" class="text-bold text-primary text-caption text-capitalize">
                        {{ props.row.status }}
                    </div>
                </q-td>
            </template>


            <!-- Customized field "Branch" -->
            <template #body-cell-branch="props" >
                <q-td :props = "props" >
                    {{ props.row.branch.branchName }}
                </q-td>
            </template>

            
            <!-- Customized field "Product" -->
            <template #body-cell-product="props">
                <q-td :props="props" auto-width class="text-center">
                    <div v-if="props.row.status === 'Active'">
                        <div v-for = "product,i in props.row.products" :key="i">
                            <q-badge>
                                {{ product.sku }}
                                &nbsp&nbsp{{ product.name }}
                                &nbsp&nbsp{{ product.qty}}
                                &nbsp{{ product.unit }}
                            </q-badge>
                        </div>
                    </div>
                    <div v-else>
                        <!-- <q-chip>Wait for active</q-chip> -->
                    </div>
                </q-td>
            </template>


            <!-- Customized field "Action" -->
            <template #body-cell-actions="props">
                <q-td class="text-center">
                    <!-- <q-btn flat square size="md" icon="add" color="blue" title="Add Product" /> -->
                    <q-btn flat square size="md" icon="edit" color="blue" title="Edit Asset"> </q-btn>
                </q-td>
            </template>
        </q-table>
        <!-- <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
        </div> -->
    </div>
</template>    

<script setup lang="ts">
import { validateNewBranch } from '~/models/branch';

    const merchantCode = "10000105"
    const tableRef = ref()
    const selected = ref([])
    const filter = ref('')
    const loading = ref(false)
    let bName = ref()

    const pagination= ref({
            // sortBy:'branch',
            // descending: false,
            page:1,
            rowsPerPage: 25,
            // rowsNumber:10
    })

    const columns = [   
        {name: 'index', label: 'No', field: 'index',align: 'left', sortable: false,},
        {name: 'branch', label: 'Branch', field: 'branch' , align: 'left',sortable: false},
        {name: 'assetName', label: 'Asset Name', field: 'deviceName', align: 'left', sortable: true},
        {name: 'uuid', label: 'UUID', field: 'uuid', align: 'left',sortable: false},
        {name: 'mac', label: 'Mac Addr', field: 'macAddr', align: 'left',sortable: false},
        {name: 'type', label: 'Machine Type', field: 'type', align: 'left', sortable: true},
        {name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true},
        {name: 'updateAt', label: 'Update At', field: 'updatedAt', align: 'left', sortable: true},
        {name: 'actions', label: 'Actions', field: 'actions', align: 'center',sortable: false},
    ]


    const {data:dataTable} = await useFetch("/api/device/getAll")
    console.log("fetchData: ",dataTable.value?.data)

    const count = dataTable.length
    // console.log(count)


    const info=[
        {   
            asset:'INS-001',
            uuid:'ABCDEFGHIJKLMNOPQ',
            mac:'00:ff:ff:ff:ff:ff',
            type:'Washer',
            job:{
                sku:'WASH-P1',
                name:'฿30',
                price:30,
                qty:60,
                unit:'Mins'
            },
            state:'active',
            status:'ready',
            store:'RGH18',
            machine:'HAIER HDV79E1',
            products:[
                {sku:'WASH-P1',name:'฿20',price:'20',qty:'30',unit:'Mins'},
                {sku:'WASH-P2',name:'฿30',price:'30',qty:'60',unit:'Mins'},
            ],
            createAt: '2021-01-01 15:15',
            updateAt: '2021-01-01 15:15',
        },
        {   
            asset:'HDV-001',
            uuid:'ABCDEFGHIJKLMNOPQ',
            mac:'00:ff:ff:ff:ff:ff',
            type:'Dryer',
            job:{
                sku:'WASH-P1',
                name:'฿40',
                price:40,
                qty:60,
                unit:'Mins'
            },
            state:'active',
            status:'booked',
            store:'RGH18',
            machine:'HAIER HDV79E1',
            products:[
                {sku:'DRY-P1',name:'฿40',price:'40',qty:'60',unit:'Mins'},
                {sku:'DRY-P2',name:'฿50',price:'50',qty:'75',unit:'Mins'},
            ],
            createAt: '2021-01-01 15:15',
            updateAt: '2021-01-01 15:15',
        },
        {   
            asset:'HDV-002',
            uuid:'ABCDEFGHIJKLMNOPQ',
            mac:'00:ff:ff:ff:ff:ff',
            type:'Dryer',
            job:{
  
            },
            state:'registered',
            status:'ready',
            store:'RGH18',
            machine:'HAIER HDV79E1',
            products:[
     
            ],
            createAt: '2021-01-01 15:15',
            updateAt: '2021-01-01 15:15',
        }
    ]

    // let rows: any[]= []
    // let rows = ref([])
    let rows = ref()
   

    // for (let i = 0; i < 10; i++) {
    //     rows = rows.concat(info.slice(0).map(r => ({ ...r })))
    // }

    // rows=rows.concat(info)  //mockup data
    // rows.value = rows.value.concat(data)
    rows.value = dataTable.value?.data
    console.log("Rows: ",rows)
    // rows = data
    // rows=rows.concat(data.slice(0).map(r => ({...r})))
    

    rows.value.forEach((row:any, index:number) => {
        row.index = index+1
        row.updatedAt = new Date(row.updatedAt).toLocaleString('th-TH')

        // row.updatedAt= new Intl.DateTimeFormat('en-GB', {
        //     dateStyle: 'short',
        //     timeStyle: 'medium',
        //     timeZone: 'Asia/Bangkok',
        // }).format(new Date(row.updatedAt))
    })

    const getSelectedString = ()=> {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
    }

    function reqpage(){
        console.log("newPage")
    }

</script>

 

<!-- <style lang="sass">
    .q-table__top 
    thead tr:first-child th
        background-color:#eeeeee

</style> -->

<!-- <style lang="sass">
    .my-sticky-header-table
    /* height or max-height is important */
    height: 310px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
        /* bg color is important for th; just specify one */
        background-color: #00b4ff

    thead tr th
        position: sticky
        z-index: 1
    thead tr:first-child th
        top: 0

    /* this is when the loading indicator appears */
    &.q-table--loading thead tr:last-child th
        /* height of all previous header rows */
        top: 48px

    /* prevent scrolling behind sticky top row on focus */
    tbody
        /* height of all previous header rows */
        scroll-margin-top: 48px
</style> -->