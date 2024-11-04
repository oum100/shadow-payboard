<template>
    <div v-if="scope=='Daily'">
        <div class=q-mt-sm>
            <q-select id='DailyType' filled dense v-model="selectedType" :options="optionsDaily" label="Type"
                emit-value
                map-options
                option-label="label"
                option-value="value"
                @updated="onUpdateType"
            />
        </div>
        <div v-if="selectedType == 'SINGLE'" class="q-my-sm">
            <DatePicker v-model:selectedData=startDate :time="false" @updated="onUpdateStartDate" label="Daily Of"/>
        </div>
        <div v-if="selectedType == 'RANGE'">
            <DatePicker v-model:selectedData=startDate :time="true" @updated="onUpdateStartDate" label="Begin Date"/>
            <DatePicker v-model:selectedData=endDate :time="true" @updated="onUpdateEndDate" label="End Date" />
        </div> 
    </div>

    <div v-if="scope=='Weekly'" style="max-width:250px">
        <div class=q-mt-sm>
            <q-select id='WeeklyType' filled dense v-model="selectedType" :options="optionsWeekly" label="Type"
                emit-value
                map-options
                option-label="label"
                option-value="value"
            />
        </div>
        <div v-if="selectedType == 'SINGLE'" class="q-my-sm">
            <WeekPicker  v-model:selectedData=startDate :time="false" :year="true" @updated="onUpdateWeeklyBeginDate" label="Week Of" />
            <div class="row justify-around">
                <div class="col-6 q-gutter-sm">
                    <q-input label-slot readonly v-model=beginOfWeek label-color="red">
                        <template v-slot:label>
                            <span class="q-px-sm text-weight-bold bg-deep-orange text-white text-italic rounded-borders">Begin date</span>
                        </template>
                    </q-input>
                </div>
                <div class="col-6 q-gutter-sm">
                    <q-input label-slot readonly v-model=endOfWeek label-color="red">
                        <template v-slot:label>
                            <span class="q-px-sm text-weight-bold bg-deep-orange text-white text-italic rounded-borders">End date</span>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
        <div v-if="selectedType == 'RANGE'">
            <WeekPicker  v-model:selectedData=startDate :time="false" :year="true" @updated="onUpdateWeeklyBeginDate" label="Begin Week Of" />
            <WeekPicker v-model:selectedData=endDate :time="true" :year="true" @updated="onUpdateWeeklyEndDate" label="End Week Of" />
            <div class="row justify-around">
                <div class="col-6 q-gutter-sm">
                    <q-input label-slot readonly v-model=beginOfWeek >
                        <template v-slot:label>
                            <span class="q-px-sm text-weight-bold bg-deep-orange text-white text-italic rounded-borders">Begin date</span>
                        </template>
                    </q-input>
                </div>
                <div class="col-6 q-gutter-sm">
                    <q-input label-slot readonly v-model=endOfWeek >
                        <template v-slot:label>
                            <span class="q-px-sm text-weight-bold bg-deep-orange text-white text-italic rounded-borders">End date</span>
                        </template>
                    </q-input>
                </div>
            </div>
            <!-- <div class="row justify-around">
                <div class="col-6 q-gutter-sm">
                    <q-input label="Begin week" readonly v-model=beginWeek />
                </div>
                <div class="col-6 q-gutter-sm">
                    <q-input label="End week" readonly v-model=endWeek />
                </div>
            </div> -->
        </div> 
    </div>

    <div v-if="scope=='Monthly'">
        <div class=q-mt-sm>
            <q-select id='MonthlyType' filled dense v-model="selectedType" :options="optionsMonthly" label="Type"
                emit-value
                map-options
                option-label="label"
                option-value="value"
            />
        </div>
        <div v-if="selectedType == 'SINGLE'" class="q-my-sm">
            <MonthPicker  v-model:selectedData=startDate :time="false" :year="true" @updated="onUpdateStartDate" label="Month Of" />
        </div>
        <div v-if="selectedType == 'RANGE'">
            <MonthPicker  v-model:selectedData=startDate :time="false" :year="true" @updated="onUpdateStartDate" label="Begin Month Of" />
            <MonthPicker v-model:selectedData=endDate :time="true" :year="true" @updated="onUpdateEndDate" label="End Month Of" />
        </div>      
    </div>
</template>


<script setup lang="ts">
    import moment from "moment-timezone";
    const props = defineProps({
        startDate: { type: String , required:true},
        endDate: { type: String , required:true},
        selectedType: { type: String , required:true},
        scope: {type: String, required:true}
    })

    const optionsDaily =ref([
        {label:'Single Day',value:'SINGLE'},
        {label:'Multiple Day',value:'RANGE'}
    ])

    const optionsWeekly =ref([
        {label:'Single Week',value:'SINGLE'},
        {label:'Multiple Week',value:'RANGE'}
    ])

    const optionsMonthly =ref([
        {label:'Single Month',value:'SINGLE'},
        {label:'Multiple Month',value:'RANGE'}
    ])

    const optionsYearly =ref([
        {label:'Single Year',value:'SINGLE'},
        {label:'Multiple Year',value:'RANGE'}
    ])

    

    const startDate = ref(props.startDate)
    const endDate = ref(props.endDate)
    const selectedType = ref(props.selectedType)
    const scope = ref(props.scope)

    const beginWeek = ref()
    const beginOfWeek = ref()
    const endWeek = ref()
    const endOfWeek = ref()
    
    
    const beginMonth = ref()
    const beginOfMonth = ref()
    const endMonth = ref()
    const endOfMonth = ref()

    let today = moment(props.startDate).tz("Asia/Bangkok")
    beginWeek.value = today.format("ww of YYYY")
    beginOfWeek.value = moment(startDate.value).startOf('week').format("YYYY-MMM-DD")

    endWeek.value = today.format("ww of YYYY")
    endOfWeek.value = moment(endDate.value).endOf('week').format("YYYY-MMM-DD")

    beginMonth.value = today.format("MMMM-YYYY")
    endMonth.value = today.format("MMMM-YYYY")

    // console.log("This selectedType: ",selectedType)
 

    const emit = defineEmits([
        'update:startDate',
        'update:endDate',
        'update:selectedType'
    ])

    watch(startDate, (val) => {
        // console.log("child selectedData",val)
        emit('update:startDate', val)
    })

    watch(endDate,(val) => {
        emit('update:endDate',val)
    })

    watch(selectedType,(val) => {
        emit('update:selectedType',val)
    })

    //Watch update  from the parent
    watch(() => props.startDate, (val) => {
        startDate.value = val;
    })

    watch(()=> props.endDate,(val) =>{
        endDate.value = val
    })

    watch(()=> props.selectedType,(val) =>{ 
        selectedType.value = val
    })


    async function onUpdateWeeklyBeginDate(val:any){
        // console.log("onUpdateWeeklyBeginDatee->newBeginDate: ",val)

        today = moment(val).tz("Asia/Bangkok");

        if(selectedType.value == 'SINGLE'){
            startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss")
            endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")

            beginOfWeek.value = moment(startDate.value).startOf('week').format("YYYY-MMM-DD")
            endOfWeek.value = moment(endDate.value).endOf('week').format("YYYY-MMM-DD")

            // beginWeek.value = moment(startDate.value).format("ww Of YYYY")
            // endWeek.value = moment(endDate.value).format("ww Of YYYY")
        }else if(selectedType.value == 'RANGE'){
            startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss")
            // endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")

            beginOfWeek.value = moment(startDate.value).startOf('week').format("YYYY-MMM-DD")
            // endOfWeek.value = moment(endDate.value).format("YYYY-MMM-DD")

            beginWeek.value = moment(startDate.value).format("ww Of YYYY")
            // endWeek.value = moment(endDate.value).format("ww Of YYYY")
        }

    }

    async function onUpdateWeeklyEndDate(val:any){
        today = moment(val).tz("Asia/Bangkok");
        // console.log("onUpdateWeeklyBeginDatee->newBeginDate: ",val)
        endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")

        endOfWeek.value = moment(endDate.value).endOf('week').format("YYYY-MMM-DD")

        endWeek.value = moment(endDate.value).endOf('week').format("ww Of YYYY")
    }

    async function onUpdateStartDate(val: any){
        console.log("onUpdateStartDate->newBeginDate: ",val)
        startDate.value = val

    //     today = moment(val).tz("Asia/Bangkok")
    //     startDate.value = today.format("YYYY-MMM-DD HH:mm:ss")

    //     switch(selectedType.value){
    //         case 'Daily':
    //             break;
    //         case 'Weekly':
    //             beginWeek.value = today.format("ww of YYYY")
    //             break;
    //         case 'Monthly':
    //             break;
    //     }
    }

    async function onUpdateEndDate(val: any){
        console.log("Set End Date: ",val)
        endDate.value = val
    }

    async function onUpdateType(val:any){
        console.log("Set type: ",val)
        selectedType.value = val
    }
</script>