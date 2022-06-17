<template>
  <div class="card border-start" :class="cardClasses">
    <div class="card-header text-center" :class="cardHeaderClasses" role="button">
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <CalendarEvent v-for="event in day.events" :key="event.title" :event="event"/>
    </div>
  </div>
</template>

<script>
import CalendarEvent from "@/components/CalendarEvent";
import Store from "@/store";

export default {
  name: "CalendarDay",
  components: {
    CalendarEvent
  },
  //Array-Schreibweise wird nicht empfohlen
  /*props: ["day"]*/
  props: {
    //Mögliche Typen: String, Number, Boolean, Array, Object oder Function
    // Mehrere mögliche Typen mit Array-Schreibweise: [String, Number]
    //day: Object   kurze Schreibweise
    day: {
      type: Object,
      required: true,
      // Bei primitiven Datentypen: default: 100
      // Bei nicht-primitiven Datentypen:
      default: function () {
        return {
          id: -1,
          fullName: "Fehlender Wochentag",
          events: []
        };
      },
      validator: function(value) {
        if (Object.keys(value).includes("id")) {
          return true;
        }
      }
    }
  },

  computed: {
    cardClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null;
    },
    cardHeaderClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
    },

  }
};
</script>

<style scoped>

</style>