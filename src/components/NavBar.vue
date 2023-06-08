<template>
  <v-app-bar class="no-print">
    <!-- <v-icon><v-img src="../assets/MPE-logo.png" /></v-icon> -->
    <v-btn prepend-icon="mdi-home" to="/">Home</v-btn>
    <v-btn
      prepend-icon="mdi-file-document-edit"
      v-if="user.role !== 'readOnly'"
      to="/schrijfverslag"
      >Schrijf Verslag</v-btn
    >
    <v-btn prepend-icon="mdi-bell-circle" to="/ocpunten"
      >Ochtendclub Punten</v-btn
    >
    <v-btn
      prepend-icon="mdi-account-group"
      v-if="user.role === 'admin'"
      to="/users"
      >Gebruikers</v-btn
    >

    <v-spacer></v-spacer>
    <v-icon class="mr-3" icon="mdi-theme-light-dark" @click="toggleTheme" />
    <v-label :text="user.firstName + ' ' + user.lastName" class="text-h6" />
    <v-btn
      prepend-icon="mdi-logout"
      class="ml-3"
      v-if="user.isLoggedIn"
      text="Uitloggen"
      @click="logOut()"
      to="/inloggen"
    />
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";
import { useStore } from "vuex";

const theme = useTheme();
const store = useStore();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

const logOut = () => {
  store.dispatch("userModule/logOut");
};

const user = computed(function () {
  return store.getters["userModule/getActiveUser"];
});
</script>
