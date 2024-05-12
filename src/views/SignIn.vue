<template>
  <v-container class="text-center pt-15 mt-15">
    <v-dialog v-model="loginError" persistent width="auto" class="mt-n15">
      <v-card class="mt-n15">
        <v-card-text> Inloggen mislukt, probeer het opnieuw! </v-card-text>
        <v-card-actions>
          <v-btn
            class="mx-auto"
            color="blue-darken-1"
            variant="text"
            block
            @click="toggleLoginError()"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="serverTimeout" persistent width="auto" class="mt-n15">
      <v-card class="mt-n15">
        <v-card-text>
          De server stuurt geen respons, probeer het later opnieuw
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="mx-auto"
            color="blue-darken-1"
            variant="text"
            block
            @click="toggleServerTimeout()"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card width="300" class="mx-auto pa-5 elevation-5">
      <v-card-title class="text-h4">Inloggen</v-card-title>
      <v-card-item> </v-card-item>
      <v-form @submit.prevent="signin()">
        <v-text-field label="E-mail" v-model="email" type="email" />
        <v-text-field
          label="Wachtwoord"
          v-model="password"
          :type="show ? 'text' : 'password'"
          :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          class="input-group--focused"
          @click:append-inner="show = !show"
        />
        <v-btn type="submit" text="Inloggen" size="large" class="mb-5" />
      </v-form>
      <v-progress-linear
        v-if="isLoading"
        color="blue-lighten-3"
        indeterminate
        :height="5"
      ></v-progress-linear>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const show = ref(false);

const email = ref();
const password = ref();

const loginError = computed(function () {
  return store.getters["userModule/getLoginError"];
});

const serverTimeout = computed(function () {
  return store.getters["userModule/getServerTimeout"];
});

const isLoading = computed(function () {
  return store.getters["userModule/getIsLoading"];
});

const toggleLoginError = () => {
  store.dispatch("userModule/toggleLoginError");
};

const toggleServerTimeout = () => {
  store.dispatch("userModule/toggleServerTimeout");
};

const signin = () => {
  let user = {};
  user.email = email.value;
  user.password = password.value;
  store.dispatch("userModule/userSignin", user);
};
</script>
