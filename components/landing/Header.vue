<template>
    <q-header style="height: 70px" reveal :class="$q.dark.isActive ? 'bg-black' : 'bg-primary'">
        <q-toolbar class="q-py-md">
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-space/>
            <q-img
                alt="Washpoint logo"
                src="/images/washpoint/washpoint1.png"
                style="width: 180px; height: 35px"
                class = "q-mr-md"
            />     
            <!-- <div class="q-qutter-md">
                <q-btn  to="/" flat>Home</q-btn>
                <q-btn flat>
                    Product
                    <q-menu class="bg-primary text-white" auto-close
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <q-list bordered>
                            <q-item clickable href="https://nuxt.com" target="_blank">
                                <q-item-section avatar>
                                    <q-avatar size="sm">
                                        <img src="https://nuxt.com/assets/design-kit/logo/icon-green.png">
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>Nuxt</q-item-section>                                                       
                            </q-item>
                            <q-item clickable href="https://quasar.dev" target="_blank">
                                <q-item-section avatar>
                                    <q-avatar size="sm">
                                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                                    </q-avatar>
                                </q-item-section>              
                                <q-item-section>Quasar</q-item-section>
                            </q-item>
                            <q-item clickable href="https://github.com/jeremycoder/nuxt-iam" target="_blank">
                                <q-item-section avatar>
                                <q-avatar   text-color="white" icon="bluetooth" />
                                </q-item-section>
                                <q-item-section>Nuxt-IAM</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn to="/backend/dashboard" flat>Dashboard</q-btn>
                <q-btn to="/backend/asset" flat>Asset</q-btn>
                <q-btn to="/backend/transaction" flat>Transaction</q-btn>
                <q-btn to="/backend/test" flat>Test</q-btn>
            </div>        -->
            <q-space/>
            <q-drawer
                v-model="drawer"
                :width="200"
                :breakpoint="500"
                overlay
                bordered
                
                class="bg-primary text-white"
            >
                <q-scroll-area class="fit">
                <q-list>

                    <template v-for="(menuItem, index) in menuItems" :key="index">
                    <q-item clickable :active="menuItem.title === 'Outbox'" v-ripple :to="menuItem.to">
                        <q-item-section avatar>
                            <q-icon :name="menuItem.icon" />
                        </q-item-section>
                        <q-item-section>{{ menuItem.title }}</q-item-section>
                    </q-item>
                    <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>

                </q-list>
                </q-scroll-area>
            </q-drawer>
        
        </q-toolbar>
    </q-header>
</template>


<script setup lang="ts">
    import menuItems from './menuItems'
    const drawerLeft = ref(false)
    const menus = ref(menuItems)
    const miniState = ref(true)
    const drawer = ref(false)

</script>
