<template>
  <v-container>
    <div justify="center">
      <v-dialog v-model="dialog" persistent width="auto">
        <!-- <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
        </template> -->
        <v-card>
          <v-card-title class="text-h5"> Gebruiker Verwijderen? </v-card-title>
          <v-card-text
            >Wilt u gebruiker {{ selectedUser.firstName }} verwijderen? Deze
            actie is onomkeerbaar!</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Annuleren
            </v-btn>
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="deleteUser(selectedUser._id)"
            >
              Verwijderen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-tabs v-model="tab">
      <div class="mx-auto">
        <v-tab value="1">Overzicht Gebruikers</v-tab>
        <v-tab value="2">Nieuwe Gebruiker Toevoegen</v-tab>
      </div>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="1">
        <v-card class="w-66 pt-7 mx-auto pa-7 mt-5 mb-7" elevation="7">
          <v-card-title>Overzicht van alle gebruikers</v-card-title>
          <v-divider />
          <v-expansion-panels variant="popout" class="mt-3" v-model="panel">
            <v-expansion-panel
              v-for="user in users"
              :key="user._id"
              class="mb-1"
              elevation="1"
            >
              <v-card>
                <v-expansion-panel-title
                  expand-icon="mdi-pencil"
                  collapse-icon="mdi-minus"
                  ><v-icon
                    :icon="
                      user.role === 'admin'
                        ? 'mdi-account-cog'
                        : user.role === 'user'
                        ? 'mdi-account-edit'
                        : 'mdi-account'
                    "
                    :color="
                      user.role === 'admin'
                        ? 'purple-darken-1'
                        : user.role === 'user'
                        ? 'blue-darken-1'
                        : 'green-darken-1'
                    "
                    class="mr-2"
                  />
                  {{ user.firstName + " " + user.lastName }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-form
                    v-model="valid"
                    @submit.prevent="handleSubmit(user._id)"
                  >
                    <v-chip
                      label
                      class="mb-2 pt-1"
                      :color="
                        user.role === 'admin'
                          ? 'purple-darken-1'
                          : user.role === 'user'
                          ? 'blue-darken-1'
                          : 'green-darken-1'
                      "
                    >
                      {{ user.email }}
                    </v-chip>
                    <v-divider class="mb-2" />
                    <v-text-field
                      label="Voer nieuw wachtwoord in"
                      density="compact"
                      v-model="pswUpdate"
                      variant="underlined"
                      :rules="[
                        lengthRule,
                        uppercaseRule,
                        lowercaseRule,
                        numberRule,
                        specialCharRule,
                      ]"
                      :type="show1 ? 'text' : 'password'"
                      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="show1 = !show1"
                    />
                    <div class="d-flex justify-space-between">
                      <v-btn
                        type="submit"
                        text="WW wijzigen"
                        variant="outlined"
                      />
                      <v-btn
                        @click="openDialog(user)"
                        type="button"
                        text="Gebruiker verwijderen"
                        variant="outlined"
                      />
                    </div>
                  </v-form>
                </v-expansion-panel-text>
              </v-card>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-window-item>

      <v-window-item value="2" class="pa-2">
        <v-card class="text-center pa-2 w-50 mx-auto mt-3" elevation="7">
          <v-card-title>Voeg een nieuwe gebruiker toe</v-card-title>
          <v-divider />
          <v-form
            @submit.prevent="signup()"
            class="pa-3 pt-7"
            v-model="validSignup"
          >
            <v-text-field
              density="compact"
              label="Voornaam"
              v-model="firstName"
              type="text"
              class="w-75 mx-auto mt-n1"
            />
            <v-text-field
              density="compact"
              label="Achternaam"
              v-model="lastName"
              type="text"
              class="w-75 mx-auto mt-n1"
            />
            <v-text-field
              density="compact"
              label="E-mail"
              v-model="email"
              type="email"
              class="w-75 mx-auto mt-n1"
            />
            <v-text-field
              density="compact"
              label="Wachtwoord"
              v-model="password"
              :rules="[
                lengthRule,
                uppercaseRule,
                lowercaseRule,
                numberRule,
                specialCharRule,
              ]"
              :type="show ? 'text' : 'password'"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show = !show"
              class="w-75 mx-auto mt-n1"
            ></v-text-field>
            <v-select
              density="compact"
              label="Ploeg"
              v-model="shift"
              :items="shiftList"
              class="w-75 mx-auto mt-n1"
            ></v-select>
            <v-select
              density="compact"
              label="Soort gebruiker"
              v-model="role"
              :items="roleList"
              class="w-75 mx-auto mt-n1"
            ></v-select>
            <v-divider />
            <v-btn
              type="submit"
              text="Gebruiker Toevoegen"
              variant="outlined"
              class="mt-7 mb-3"
            />
          </v-form>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const show = ref(false);
const show1 = ref(false);

const selectedUser = ref({});

const openDialog = (user) => {
  dialog.value = true;
  selectedUser.value = user;
};

const panel = ref([]);

const users = computed(function () {
  let arr = store.getters["userModule/getUsers"];
  arr.forEach((element) => {
    element.visible = false;
  });
  return arr.sort((a, b) => {
    const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
});

const lengthRule = ref(
  (v) => (v && v.length >= 8) || "Password must be at least 8 characters"
);
const uppercaseRule = ref(
  (v) =>
    /[A-Z]/.test(v) || "Password must contain at least one uppercase letter"
);
const lowercaseRule = ref(
  (v) =>
    /[a-z]/.test(v) || "Password must contain at least one lowercase letter"
);
const numberRule = ref(
  (v) => /[0-9]/.test(v) || "Password must contain at least one number"
);
const specialCharRule = ref(
  (v) =>
    /[!@#$%^&*]/.test(v) ||
    "Password must contain at least one special character"
);

const valid = ref();
const validSignup = ref();

const handleSubmit = async (userId) => {
  if (valid.value) {
    // Valid form, perform the update
    updatePw(userId);
    panel.value = [];
  }
};

const dialog = ref(false);
const tab = ref(null);
const email = ref();
const password = ref();
const firstName = ref();
const lastName = ref();
const role = ref();
const shift = ref();
const roleList = ref(["user", "admin", "readOnly"]);
const shiftList = ref(["DD", "E", "F", "G", "H", "K"]);
const pswUpdate = ref();

const signup = () => {
  if (validSignup.value) {
    let user = {};
    user.firstName = firstName.value;
    user.lastName = lastName.value;
    user.email = email.value;
    user.password = password.value;
    user.role = role.value;
    user.shift = shift.value;
    store.dispatch("userModule/addUser", user);
    tab.value = 1;
  }
};

const updatePw = (uid) => {
  let user = {};
  user.newPw = pswUpdate.value;
  user._id = uid;
  store.dispatch("userModule/updatePw", user);
  pswUpdate.value = "";
};
const deleteUser = (id) => {
  let uid = id;
  store.dispatch("userModule/deleteUser", uid);
  pswUpdate.value = "";
  dialog.value = false;
};
</script>
