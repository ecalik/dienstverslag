<template>
  <v-container class="text-center">
    <div class="mb-5 text-h4">Dienstverslag</div>
    <v-card class="mt-7 w-75 mx-auto pa-7">
      <v-form @submit.prevent="submitReport()" class="text-start">
        <v-row>
          <v-col cols="4">
            <v-label class="text-h6 mb-2">Onderwerp</v-label>
            <v-radio-group v-model="onderwerp" density="compact">
              <v-radio
                label="Algemene mededeling"
                value="Algemene mededeling"
              ></v-radio>
              <v-radio label="Blokkade" value="Blokkade"></v-radio>
              <v-radio label="Storing" value="Storing"></v-radio>
              <v-radio label="Valspar" value="Valspar"></v-radio>
              <v-radio label="HSE" value="HSE"></v-radio>
              <v-radio
                label="Geplande werkzaamheden"
                value="Geplande werkzaamheden"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3">
            <v-label class="text-h6 mb-2">Apparaat</v-label>
            <v-radio-group v-model="machine" density="compact">
              <v-radio label="Droger" value="Droger"></v-radio>
              <v-radio label="Kristallisator" value="Kris"></v-radio>
              <v-radio label="3C-Bunker" value="3C-Bunker"></v-radio>
              <v-radio label="Menger" value="Menger"></v-radio>
              <v-radio label="Buhler" value="Buhler"></v-radio>
              <v-radio label="Overig" value=""></v-radio>
            </v-radio-group>
          </v-col>

          <!-- Drogerlijst -->

          <v-col v-if="machine === 'Droger'" cols="2">
            <v-label class="text-h6 mb-2">Droger letter</v-label>
            <v-radio-group
              v-model="drogerLetter"
              v-for="l in drogerLetterLijst"
              :key="l"
              density="compact"
              hide-details
            >
              <v-radio :label="l" :value="l" />
            </v-radio-group>
          </v-col>
          <v-col v-if="machine === 'Droger'" cols="2">
            <v-label class="text-h6 mb-2">Droger cijfer</v-label>
            <v-radio-group
              v-model="drogerCijfer"
              v-for="c in drogerCijferLijst"
              :key="c"
              density="compact"
              hide-details
            >
              <v-radio :label="c" :value="c" />
            </v-radio-group>
          </v-col>

          <!-- Kristallisatorenlijst -->

          <v-col v-if="machine === 'Kris'" cols="2">
            <v-label class="text-h6 mb-2">Kristallisator</v-label>
            <v-radio-group
              v-model="kris"
              v-for="k in krisLijst"
              :key="k"
              density="compact"
              hide-details
            >
              <v-radio :label="k" :value="k" />
            </v-radio-group>
          </v-col>

          <!-- Buhlerlijst -->

          <v-col v-if="machine === 'Buhler'" cols="3">
            <v-label class="text-h6 mb-2">Buhler tank</v-label>
            <v-radio-group v-model="buhler" density="compact">
              <v-radio label="BT01" value="BT01"></v-radio>
              <v-radio label="BT02" value="BT02"></v-radio>
              <v-radio label="BT03" value="BT03"></v-radio>
              <v-radio label="BT04" value="BT04"></v-radio>
            </v-radio-group>
          </v-col>

          <!-- 3C-Bunkerlijst -->

          <v-col v-if="machine === '3C-Bunker'" cols="2">
            <v-label class="text-h6 mb-2">3C-Bunker</v-label>
            <v-select
              label="Kies 3C-Bunker"
              v-model="CBunker"
              :items="CBunkerLijst"
              :rules="[(v) => !!v || 'You must agree to continue!']"
            ></v-select>
          </v-col>

          <!-- Mengerlijst -->

          <v-col cols="2" v-if="machine === 'Menger'">
            <v-label class="text-h6 mb-2">Menger</v-label>
            <v-select
              label="Kies Menger"
              v-model="menger"
              :items="mengerLijst"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Verslag text -->

        <v-row>
          <v-textarea
            label="Dienstverslag"
            auto-grow
            variant="outlined"
            rows="3"
            row-height="25"
            shaped
            :rules="textfieldRules"
            counter
            v-model="reportText"
          />
          <v-spacer />
          <v-checkbox
            class="text-h6 mb-2"
            label="Ochtendclub Punt"
            v-model="oCPunt"
          />
        </v-row>
        <br />

        <!-- Preview verslag -->
        <div class="text-h6 mb-1 text-center">Preview Verslag</div>
        <v-divider />
        <v-card elevation="1" class="mb-2 mt-3 w-66 mx-auto text-left">
          <v-card-item class="mt-3 pr-7">
            <template v-slot:append>
              <div class="text-right">
                <div class="mt-5">
                  <v-chip
                    size="small"
                    v-if="oCPunt"
                    text="OC punt"
                    class="mr-3"
                  />
                  <v-chip
                    size="small"
                    :text="
                      store.getters['userModule/getActiveUser'].shift.length <=
                      1
                        ? store.getters[
                            'userModule/getActiveUser'
                          ].shift.concat('Ploeg')
                        : store.getters['userModule/getActiveUser'].shift
                    "
                  />
                </div>
              </div>
            </template>
            <v-card-title>
              {{ onderwerp }}
            </v-card-title>
            <v-card-subtitle>{{ machineWaarde }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>{{ reportText }} </v-card-text>
        </v-card>
        <div class="text-center">
          <v-btn variant="outlined" type="submit">Opslaan</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();

const textfieldRules = [(v) => v.length <= 150 || "Maximaal 150 tekens"];

const onderwerp = ref();
const reportText = ref();
const machine = ref("");
const machineSpecifiek = computed(function () {
  switch (machine.value) {
    case "Droger":
      return drogerLetter.value + drogerCijfer.value;
    case "Kris":
      return kris.value;
    case "3C-Bunker":
      return CBunker.value;
    case "Menger":
      return menger.value;
    case "Buhler":
      return buhler.value;
    default:
      return "";
  }
});

const machineWaarde = computed(function () {
  return machine.value + " " + machineSpecifiek.value;
});

const drogerLetterLijst = ref(["G", "H", "L", "O", "P"]);
const drogerCijferLijst = computed(() => {
  return drogerLetter.value !== "O"
    ? ["1", "2", "3", "4", "5", "6", "7", "8"]
    : ["1", "2", "3", "4", "5", "6"];
});
const drogerLetter = ref("");
const drogerCijfer = ref("");

const krisLijst = ref(["101", "102", "103", "104", "106", "107"]);
const kris = ref("");

const CBunkerLijst = computed(() => {
  let lijst = [];
  for (let i = 1; i <= 50; i++) {
    i <= 9 ? (lijst[i - 1] = "F0" + i) : (lijst[i - 1] = "F" + i);
  }
  return lijst;
});
const CBunker = ref("");

const mengerLijst = computed(() => {
  let lijst = [];
  for (let i = 1; i <= 12; i++) {
    i <= 9 ? (lijst[i - 1] = "M0" + i) : (lijst[i - 1] = "M" + i);
  }
  return lijst;
});
const menger = ref("");

const buhler = ref("");

const oCPunt = ref(false);

const submitReport = () => {
  let report = {};
  report.subject = onderwerp.value;
  report.machine = machineWaarde.value;
  report.oCPunt = oCPunt.value;
  report.reportText = reportText.value;
  report.shift =
    store.getters["userModule/getActiveUser"].shift.length <= 1
      ? store.getters["userModule/getActiveUser"].shift.concat(" Ploeg")
      : store.getters["userModule/getActiveUser"].shift;
  report.creator = store.getters["userModule/getActiveUser"].id;
  store.dispatch("reportModule/submitReport", report);
};
</script>
