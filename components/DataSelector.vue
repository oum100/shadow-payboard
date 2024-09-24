<template>
    <div class=q-mt-sm>
        <q-select filled dense v-model="selectedType" :options="optionsType" label="Type"
            @updated="unUpdateType"
        />
    </div>

    <div class="q-my-sm">
        <DatePicker v-if="selectedType == 'SINGLE'" v-model:selectedDate=startDate :time="false" @updated="onUpdateStartDate" label="Daily Of"/>
        <DatePicker v-if="selectedType == 'MULTIPLE'" v-model:selectedDate=startDate :time="true" @updated="onUpdateStartDate" label="Start Date"/>
    </div>

    <div v-if="selectedType == 'MULTIPLE'">
        <DatePicker v-model:selectedDate=endDate :time="true" @updated="onUpdateEndDate" label="End Date" />
    </div>    
</template>


<script setup lang="ts">

    const props = defineProps({
        startDate: { type: String , required:true},
        endDate: { type: String , required:true},
        selectedType: { type: String , required:true},
    })

    
    const optionsType = ref(['SINGLE','MULTIPLE'])


    const startDate = ref(props.startDate)
    const endDate = ref(props.endDate)
    const selectedType = ref(props.selectedType)
    console.log("This selectedType: ",selectedType)
 

    const emit = defineEmits([
        'update:startDate',
        'update:endDate',
        'update:selectedType'
    ])

    watch(startDate, (val) => {
        // console.log("child selectedDate",val)
        emit('update:startDate', val)
    })

    //Watch update  from the parent
    watch(() => props.startDate, (val) => {
        startDate.value = val;
    })

    watch(endDate,(val) => {
        emit('update:endDate',val)
    })

    watch(()=> props.endDate,(val) =>{
        endDate.value = val
    })


    watch(selectedType,(val) => {
        emit('update:selectedType',val)
    })

    watch(()=> props.selectedType,(val) =>{ 
        selectedType.value = val
    })


    async function onUpdateStartDate(val: any){
        // console.log("Set Start Date: ",val)
        startDate.value = val
    }

    async function onUpdateEndDate(val: any){
        console.log("Set End Date: ",val)
        endDate.value = val
    }

    async function unUpdateType(val:any){
        selectedType.value = val
    }
</script>