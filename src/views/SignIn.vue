<template>
  <v-container class="text-center pt-15">
    <div class="mb-5 text-h4">Inloggen</div>
    <v-card width="300" class="mx-auto pa-5">
      <v-card-item> </v-card-item>
      <v-form @submit.prevent="signin()">
        <v-text-field label="E-mail" v-model="email" type="email" />
        <v-text-field
          label="Wachtwoord"
          v-model="password"
          :type="show ? 'text' : 'password'"
          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          class="input-group--focused"
          @click:append-inner="show = !show"
        />
        <v-btn type="submit" text="Inloggen" size="large" class="mb-5" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const show = ref(false);

const email = ref();
const password = ref();

const signin = () => {
  let user = {};
  user.email = email.value;
  user.password = password.value;
  store.dispatch("userModule/userSignin", user);
};

// const firstName = ref();
// const lastName = ref();
// const role = ref();
// const shift = ref();
// const roleList = ref(["user", "admin"]);
// const shiftList = ref(["DD", "E", "F", "G", "H", "K"]);

// const signup = () => {
//   let user = {};
//   user.firstName = firstName.value;
//   user.lastName = lastName.value;
//   user.email = email.value;
//   user.password = password.value;
//   user.role = role.value;
//   user.shift = shift.value;
//   fetch("http://localhost:3000/user/signup", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((result) => {
//       console.log(JSON.stringify(user));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
</script>
