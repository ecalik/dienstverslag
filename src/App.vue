<template>
  <v-app>
    <nav-bar v-if="isLoggedIn" />
    <v-main>
      <!-- <reports-view /> -->
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import NavBar from "./components/NavBar.vue";
import { useStore } from "vuex";
//import ReportsView from "./views/ReportsView.vue";

onBeforeMount(() => {
  store.dispatch("userModule/autoLogin");
});

const store = useStore();

const isLoggedIn = computed(() => {
  return store.getters["userModule/getActiveUser"].isLoggedIn;
});
</script>

<style>
.fade-slide-enter-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-21px);
}
</style>
