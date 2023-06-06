<template>
  <v-container class="text-center">
    <div class="mb-5 mt-5 text-h4">Overzicht Dienstverslagen</div>
    <v-expansion-panels
      :style="{ zoom: 0.75 }"
      class="pa-1 mb-2 w-66 mx-auto text-left"
    >
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon icon="mdi-magnify" class="mr-3" />
          <span class="text-h6">Zoeken</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="d-flex justify-space-between">
            <v-checkbox label="Onderwerp" v-model="onderwerpToggle" />
            <v-checkbox label="Apparaat" v-model="apparaatToggle" />
            <v-checkbox label="Text" v-model="textToggle" />
            <!-- <v-checkbox label="OC Punt" v-model="oCPunt" /> -->
            <v-checkbox label="Datum" v-model="datumToggle" />
          </div>
          <v-row>
            <!-- Onderwerplijst -->

            <v-col cols="4" v-if="onderwerpToggle">
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

            <!-- Apparatenlijst -->

            <v-col cols="3" v-if="apparaatToggle">
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

            <v-col v-if="machine === 'Kris'" cols="3">
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

            <v-col v-if="machine === '3C-Bunker'" cols="3">
              <v-label class="text-h6 mb-2">3C-Bunker</v-label>
              <v-select
                label="Kies 3C-Bunker"
                v-model="CBunker"
                :items="CBunkerLijst"
                :rules="[(v) => !!v || 'You must agree to continue!']"
              ></v-select>
            </v-col>

            <!-- Mengerlijst -->

            <v-col cols="3" v-if="machine === 'Menger'">
              <v-label class="text-h6 mb-2">Menger</v-label>
              <v-select
                label="Kies Menger"
                v-model="menger"
                :items="mengerLijst"
              ></v-select>
            </v-col>

            <v-col v-if="datumToggle" cols="3" class="text-center">
              <v-label class="text-h6 mb-3">Kies Periode</v-label>
              <vue-date-picker
                range
                v-model="date"
                inline
                auto-apply
                min-range="1"
              />
            </v-col>
          </v-row>

          <!-- Verslag text -->

          <v-row v-if="textToggle">
            <v-textarea
              label="Vul zoektermen in"
              auto-grow
              variant="outlined"
              rows="3"
              row-height="25"
              shaped
              counter
              v-model="reportText"
            />
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card
      v-for="report in filteredReports"
      :key="report._id"
      elevation="1"
      class="mb-2 w-66 mx-auto text-left"
    >
      <v-card-item class="mt-3 pr-7">
        <template v-slot:append>
          <div class="text-right">
            <div>
              <v-chip
                size="small"
                v-if="report.oCPunt"
                text="OC punt"
                class="mr-3"
              />
              {{ report.date }}
            </div>
            <div class="mt-5">
              <v-chip size="small" :text="report.shift" />
            </div>
          </div>
        </template>
        <v-card-title>
          {{ report.subject }}
        </v-card-title>
        <v-card-subtitle>{{ report.machine }}</v-card-subtitle>
      </v-card-item>
      <v-card-text>{{ report.reportText }} </v-card-text>
      <v-card-actions
        v-if="
          activeUser.id === report.creator &&
          Date.now() < new Date(report.createdAt).getTime() + 3600000
        "
      >
        <div class="d-block w-100">
          <v-btn
            @click="deleteReport(report._id)"
            class="float-right mr-5 mt-n5"
            variant="outlined"
            size="small"
          >
            Verwijderen
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const onderwerpToggle = ref(false);
const apparaatToggle = ref(false);
const textToggle = ref(false);
const datumToggle = ref(false);
//const oCPunt = ref(null);

const date = ref([]);
const onderwerp = ref("");
const reportText = ref("");
const machineWaarde = computed(function () {
  return machine.value + " " + machineSpecifiek.value;
});

const machine = ref("");
const CBunker = ref("");
const drogerLetter = ref("");
const drogerCijfer = ref("");
const kris = ref("");
const menger = ref("");
const buhler = ref("");

watch(
  () => apparaatToggle.value,
  (newValue) => {
    if (!newValue) {
      drogerLetter.value = "";
      drogerCijfer.value = "";
      kris.value = "";
      CBunker.value = "";
      menger.value = "";
      buhler.value = "";
      machine.value = "";
    }
  }
);

watch(
  () => onderwerpToggle.value,
  (newValue) => {
    if (!newValue) {
      onderwerp.value = "";
    }
  }
);

watch(
  () => textToggle.value,
  (newValue) => {
    if (!newValue) {
      reportText.value = "";
    }
  }
);

watch(
  () => datumToggle.value,
  (newValue) => {
    if (!newValue) {
      date.value = [];
    }
  }
);

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

const drogerLetterLijst = ref(["G", "H", "L", "O", "P"]);
const drogerCijferLijst = computed(() => {
  return drogerLetter.value !== "O"
    ? ["1", "2", "3", "4", "5", "6", "7", "8"]
    : ["1", "2", "3", "4", "5", "6"];
});

const krisLijst = ref(["101", "102", "103", "104", "106", "107"]);

const CBunkerLijst = computed(() => {
  let lijst = [];
  for (let i = 1; i <= 50; i++) {
    i <= 9 ? (lijst[i - 1] = "F0" + i) : (lijst[i - 1] = "F" + i);
  }
  return lijst;
});

const mengerLijst = computed(() => {
  let lijst = [];
  for (let i = 1; i <= 12; i++) {
    i <= 9 ? (lijst[i - 1] = "M0" + i) : (lijst[i - 1] = "M" + i);
  }
  return lijst;
});

const filteredReports = computed(function () {
  const filteredBySubject = reports.value.filter(function (report) {
    return report.subject.indexOf(onderwerp.value) !== -1;
  });

  const filteredByMachine = filteredBySubject.filter(function (report) {
    return report.machine.indexOf(machineWaarde.value) !== -1;
  });

  const filteredByReportText = filteredByMachine.filter(function (report) {
    return (
      report.reportText
        .toLowerCase()
        .indexOf(reportText.value.toLowerCase()) !== -1
    );
  });

  if (date.value[1]) {
    const startDate = new Date(date.value[0]);
    const endDate = new Date(date.value[1]);

    return filteredByReportText.filter(function (report) {
      const reportDate = new Date(report.createdAt);
      return reportDate >= startDate && reportDate <= endDate;
    });
  } else {
    return filteredByReportText.sort(function (a, b) {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });
  }
});

const deleteReport = (reportId) => {
  let rid = reportId;
  store.dispatch("reportModule/deleteReport", rid);
};

const reports = computed(function () {
  return store.getters["reportModule/getReports"];
});

const activeUser = computed(function () {
  return store.getters["userModule/getActiveUser"];
});
</script>
