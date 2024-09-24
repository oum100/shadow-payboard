<template>
    <div style="width:250px">
        <DataSelector
           v-model:startDate ="startDate"
           v-model:endDate="endDate" 
           @update:startDate="onUpdateStartDate"
           @update:endDate="onUpdateEndDate"
        />
    </div>

    <div>Start Date: {{ startDate }}</div>
    <div>End Date: {{ endDate }}</div>
    
    <div id="q-app" style="min-height: 100vh;">
        <div class="row full-width justify-center q-mt-md">
            <div class="col-md-6 col-sm-12 col-xs-12 column items-center">
                <q-card style="width:400px">
                    <q-card-section>
                        <DailyTransChart/>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-md-6 col-sm-12 col-xs-12 column items-center">
                <q-card style="width:700px">
                    <q-card-section>
                        <TransChart/>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row justify-center q-mt-md">
        
                <q-card style="width:700px">
                    <q-card-section>
                        <WeeklyChart/>
                    </q-card-section>
                </q-card>
            
        </div>
        <div class="row justify-center q-mt-md">
            <q-card style="width:850px">
                <q-card-section>
                    <DailyChart/>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
    const startDate = ref("2024-09-21 00:00:00")
    const endDate = ref("2024-09-21 23:00:00")

    async function onUpdateStartDate(val){
        console.log("onStart: ",val)
    }
    async function onUpdateEndDate(val){
        console.log("onEnd: ",val)
    }
</script>