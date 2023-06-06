<template>
  <v-app-bar>
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
import { useStore } from "vuex";

const store = useStore();

const logOut = () => {
  store.dispatch("userModule/logOut");
};

const user = computed(function () {
  return store.getters["userModule/getActiveUser"];
});
</script>
