<template>
    <q-card style="width: 700px; max-width: 80vw;">
        <!-- <q-card-section>
            <div class="text-h6 text-blue">Create New Asset</div>
        </q-card-section>

        <q-separator /> -->

        <q-card-section>
            <q-header class="bg-primary">
                <q-toolbar>
                    <q-toolbar-title>Create Asset</q-toolbar-title>
                    <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
            </q-header>
        </q-card-section>

        <q-card-section style="max-height: 50vh" class="scroll q-mt-lg">
            <div class = "row">
                <div class="col q-mx-sm">
                    <q-select rounded outlined dense v-model="formData.branchCode" 
                    label="Branch"
                    :options="optionBranchList"
                    emit-value
                    map-options
                    >
                        <template v-slot:prepend>
                            <q-icon name="store"  color="blue"/>
                        </template>
                        <!-- <template v-slot:append>
                            <q-icon name="close" @click="formData.uuid = ''" class="cursor-pointer" />
                        </template> -->

                        <template v-slot:hint>
                            Select Branch Name
                        </template>
                    </q-select>
                </div>

                <div class="col q-mx-sm">
                    <q-input rounded outlined dense v-model="formData.deviceName" 
                    label="Name" counter
                    mask="XXX-###"
                    >
                        <template v-slot:prepend>
                            <q-icon name="developer_board" color="blue"/>
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click="formData.deviceName = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Mask: 3 digits alphanumeric - 3 digit numberic
                        </template>
                    </q-input>
                </div>

            </div>
            <div class = "row q-my-md">
                <div class="col q-mx-sm">
                    <q-input rounded outlined dense v-model="formData.uuid" 
                    label="UUID" counter
                    mask="XXXXXXXXXXXXXXX"
                    >
                        <template v-slot:prepend>
                            <q-icon name="fingerprint" color="blue"/>
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click="formData.uuid = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            15 Digits alphanumberic.
                        </template>
                    </q-input>
                </div>

                <div class="col q-mx-sm">
                    <q-input rounded outlined dense v-model="formData.macAddr" 
            
                    label="Mac Address" counter
                    mask="XX:XX:XX:XX:XX:XX"
                    >
                        <template v-slot:prepend>
                            <q-icon name="dns" color="blue"/>
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click="formData.macAddr = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Mask: 12 digts Hex AA:BB:CC:DD:EE:FF
                        </template>
                    </q-input>
                </div>
            </div>
            <div class = "row q-my-md">
                <div class="col q-mx-sm">
                    <q-select rounded outlined dense v-model="formData.type" 
                    :options="typeList"
                    label="Machine Type"
                    emit-value
                    map-options
                    >
                        <template v-slot:prepend>
                            <q-icon name="local_laundry_service" color="blue"/>
                        </template>
                        <!-- <template v-slot:append>
                            <q-icon name="close" @click="formData.type = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            15 Digits alphanumberic.
                        </template> -->
                    </q-select>
                </div>

                <div class="col q-mx-sm">
                    <q-select rounded outlined dense v-model="formData.status"   
                    :options="statusList"       
                    label="Status"
                    emit-value
                    map-options
                    >
                        <template v-slot:prepend>
                            <q-icon name="link" color="blue"/>
                        </template>
                        <!-- <template v-slot:append>
                            <q-icon name="close" @click="formData.status = ''" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Mask: 16 digts Hex AA:BB:CC:DD:EE:FF
                        </template> -->
                    </q-select>
                </div>
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Save" color="primary" v-close-popup @click="onSave" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
    import type {Device} from '../models/device'

    
    const form_uuid = ref('')
    // const formData: Device = ref({
    //     merchantCode:"100000105",
    // })

    const formData: Partial<Device> = {}


    const typeList = ref([
        {label: 'Washer', value: 'WASHER'},
        {label: 'Dryer', value: 'DRYER'},
    ])

    const statusList = ref([
        {label: 'Active', value: 'ACTIVE'},
        {label: 'Inactive', value: 'INACTIVE'},
    ])

    const optionList = await $fetch('/api/transaction/listBranchOption')
    // console.log("optionList: ",optionList)
    let optionBranchList:any = ref([])

    optionList.forEach((item: any) => {
        // optionBranchList.value.push(item.branchName)
        optionBranchList.value.push({
            label: item.branchName,
            value: item.branchCode
        })
    })

    // console.log("optionBranchList: ",optionBranchList)

    async function onSave(){
        console.log("FormData: ",formData)
    }
</script>

<style lang="sass">
</style>