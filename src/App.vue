<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
<!--        <calendar-week-as-list/>
        <CalendarWeek/>-->
        <keep-alive>
          <transition name="fade" mode="out-in">
            <component :is="activeView"/>
          </transition>
        </keep-alive>
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
        <transition name="fade">
          <CalendarSettings v-if="displaySettings" />
        </transition>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import CalendarWeek from "./components/CalendarWeek";
import CalendarWeekAsList from "@/components/CalendarWeekAsList";
import CalendarEntry from "@/components/CalendarEntry";
import Store from "@/store";
//import CalendarSettings from "@/components/CalendarSettings";

export default {
  name: "App",
  components: {
    //Langform
    //'CalenderWeek': CalenderWeek

    //Kurzform, wenn Tag-Name und Component-Name gleich sind
    CalendarWeek,
    CalendarWeekAsList,
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
  computed: {
    activeView() {
      return Store.getters.activeView();
    },
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

  /*Transition Fade*/
  /* Hat die Transition kein Name-Attribut, ist der Name automatisch v, also z.B. v-enter-from */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.25s ease-out;
  }

</style>
