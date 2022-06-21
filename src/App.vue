<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
        <CalendarWeek/>
        <!-- Ende: Template für die Calendar-Week-Component -->
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <!-- Anfang: Template für die Calendar-Entry-Component -->
        <CalendarEntry/>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button class="btn btn-lg mb-2" @click="fadeInOut">
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <!-- Anfang: Template für die Calendar-Settings-Component -->
        <CalendarSettings v-if="displaySettings" />
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import CalendarWeek from "./components/CalendarWeek";
import CalendarEntry from "@/components/CalendarEntry";
//import CalendarSettings from "@/components/CalendarSettings";

export default {
  name: "App",
  components: {
    //Langform
    //'CalenderWeek': CalenderWeek

    //Kurzform, wenn Tag-Name und Component-Name gleich sind
    CalendarWeek,
    CalendarEntry,
    CalendarSettings: defineAsyncComponent(() =>
      import(
        /*webpackChunkName: 'CalenderSettingsComponent' */ "./components/CalendarSettings.vue")
    )
  },
  data() {
    return {
      displaySettings: false
    }
  },
  methods: {
    fadeInOut() {
      this.displaySettings = !this.displaySettings;
    }
  }

};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

.square {
  width: 40px;
  height: 40px;
}
</style>
