<template>
    <div class="row q-mt-md justify-center fit">
        <div class="q-my-sm" style="max-width: 250px; width:100%">
            <DatePicker v-model:selectedDate="startDate" :time="true" :range="false"
                @updated="onUpdated"
            />
        </div>
    </div>
    <div class="row q-mt-md justify-center fit">
        <div class="q-my-sm" style="max-width: 250px; width:100%">
            <DatePicker v-model:selectedDate="endDate" :time="true" />
        </div>
    </div>

    <div class="row q-mt-md justify-center fit">
        <div class="q-my-sm" style="max-width: 250px; width:100%">
            <getDate v-model:selectedDate="startDate"  />
        </div>
    </div>
   
    <div> Result: {{ startDate }}</div>
</template>

<script setup land = "ts">
    import moment from 'moment-timezone'

    const startDate = ref()
    const endDate = ref()

    const today = moment(String(new Date(Date.now()))).tz("Asia/Bangkok")
    console.log("Today: ", today)

    !startDate.value ? startDate.value = today.clone().startOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("Start Date: ", startDate.value)
    // console.log("Start Date: ", startDate.value)

    !endDate.value ? endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss") : console.log("End Date: ", endDate.value)
    // console.log("End Date: ", endDate.value)


    function onUpdated(val){
        // console.log("Updated: ", startDate.value)
        console.log("Updated: ",val)

        endDate.value = val
        const today = moment(endDate.value)
        endDate.value = today.clone().endOf('day').format("YYYY-MM-DD HH:mm:ss")
        console.log("New EndDate:",endDate.value)
    }
</script>

