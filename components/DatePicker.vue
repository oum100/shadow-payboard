<template>
    <div >
        <q-input filled dense v-model="selectedDate" :label=props.label>
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="selectedDate" mask="YYYY-MM-DD HH:mm:ss" format24h 
                            :range = "props.range"
                            v-close-popup="dateClosePopup"
                            @navigation="dateClosePopup = false">
                            <div class = "row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
                <q-icon v-if="props.time" name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="selectedDate" mask="YYYY-MM-DD HH:mm:ss" format24h 
                            v-close-popup="dateClosePopup"
                            @navigation="dateClosePopup = false">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        label:{type: String, required:true},
        selectedDate: { type: String , required:true},
        time: {type:Boolean ,default: false},
        range: {type:Boolean ,default:false}
    })

    const emit = defineEmits([
        'updated'
    ])

    // console.log("props.selectedDate", props.selectedDate)
    const selectedDate = ref(props.selectedDate)
    const dateClosePopup = ref(false)

    watch(selectedDate, (val) => {
        // console.log("child selectedDate",val)
        dateClosePopup.value = true
        emit('updated', val)
    })

    //Watch update  from the parent
    watch(() => props.selectedDate, (val) => {
        // console.log("parent selectedDate",val)
        selectedDate.value = val;
    });

</script>