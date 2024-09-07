<template>
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
import { ref } from 'vue';

</script>