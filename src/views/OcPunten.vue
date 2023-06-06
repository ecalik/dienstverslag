<template>
  <v-container class="text-center">
    <div class="mb-5 text-h4">Ochtendclub Punten</div>
    <v-card
      v-for="report in oCReports"
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
      <v-card-actions>
        <div class="d-block w-100">
          <v-btn
            variant="outlined"
            size="small"
            v-if="activeUser.role === 'admin'"
            @click="archiveReport(report._id, activeUser.id)"
            type="submit"
            class="float-right mr-5 mt-n5"
          >
            Verwerken
          </v-btn>
        </div>
        <!-- <v-btn
          v-if="activeUser.role === 'admin'"
          variant="outlined"
          size="small"
        >
          Verwijderen
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// const reports = computed(function () {
//   return store.getters["reportModule/getReports"];
// });

const oCReports = computed(function () {
  return store.getters["reportModule/getReports"].filter((report) => {
    return report.oCPunt && !report.archived;
  });
});

const activeUser = computed(function () {
  return store.getters["userModule/getActiveUser"];
});

// const oCReports = reports.value.filter((report) => {
//   return report.oCPunt && !report.archived;
// });

const archiveReport = (reportId, userId) => {
  //console.log("clicked view");
  let payload = {};
  payload.reportId = reportId;
  payload.userId = userId;
  store.dispatch("reportModule/archiveReport", payload);
};
</script>
