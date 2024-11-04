<template>
    <div class="q-my-sm">
        <q-input filled dense v-model="selectedData" :label=props.label>
            <template v-slot:append>
                <q-icon v-if="props.year" name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="selectedData" mask="YYYY-MMM-DD"
                            :title=weekOfYear
                            subtitle = "Week Of Year"
                            :range = "props.range"
                            v-close-popup="dateClosePopup"
                            @navigation="dateClosePopup = false">
                            <div class = "row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
                <q-icon v-else name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="selectedData" mask="YYYY-MMMM-DD" 
                            :range = "props.range"
                            v-close-popup="dateClosePopup"
                            @navigation="dateClosePopup = false">
                            <div class = "row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>


<script setup lang="ts">
    import moment from "moment-timezone";

    const props = defineProps({
        label:{type: String, required:true},
        selectedData: { type: String , required:true},
        year: {type:Boolean ,default: false},
        range: {type:Boolean ,default:false}
    })

    const emit = defineEmits([
        'updated'
    ])

    const selectedData = ref()
    const weekOfYear = ref()

    // When first load this component ** using initial data from parent
    // console.log("props.selectedData", props.selectedData)
    let today = moment(props.selectedData).tz("Asia/Bangkok")
    selectedData.value = today.format("YYYY-MMM-DD")
    weekOfYear.value = today.format("ww")
    const dateClosePopup = ref(false)

    //When change on selectedDate
    watch(selectedData, (val) => {
        console.log("WeekPicker->child selectedDate",val)
        // today = moment(val).tz("Asia/Bangkok")
        today = moment(val)
        selectedData.value = today.format("YYYY-MMM-DD")

        weekOfYear.value = today.format("ww")
        console.log("WeekPicker->weekOfYear",weekOfYear.value)

        dateClosePopup.value = true
        emit('updated', val)
    })

    //Watch update  from the parent
    watch(() => props.selectedData, (val) => {
        console.log("WeekPicker->parent selectedDate",val)
        selectedData.value = val;
        // const today = moment(props.selectedData).tz("Asia/Bangkok")
        // selectedData.value = today.format("MMMM YYYY")
        // weekOfYear.value = today.format("wo")
    });

</script>