<template>
    <div class="q-my-sm">
        <q-input filled dense v-model="selectedData" :label=props.label>
            <template v-slot:append>
                <q-icon v-if="props.year" name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="selectedData" mask="MMMM YYYY"
                            :range = "props.range"
                            :title = monthOfYear
                            subtitle = "Month Of Year"
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
                        <q-date v-model="selectedData" mask="MMMM YYYY" 
                            :range = "props.range"
                            :title = monthOfYear
                            subtitle = "Month Of Year"
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
    const monthOfYear = ref()

    // console.log("props.selectedData", props.selectedData)
    const today = moment(props.selectedData).tz("Asia/Bangkok")
    selectedData.value = today.format("MMMM YYYY")
    monthOfYear.value = today.format("MMMM YYYY")
    const dateClosePopup = ref(false)

    watch(selectedData, (val) => {
        console.log("child selectedDate",val)
        dateClosePopup.value = true
        emit('updated', val)
    })

    //Watch update  from the parent
    watch(() => props.selectedData, (val) => {
        console.log("parent selectedDate",val)
        selectedData.value = val;
    });

</script>