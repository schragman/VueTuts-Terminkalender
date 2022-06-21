<template>
  <div id="calender-week">
    <div class="card-group">
    <!-- Anfang: Template für die Calendar-Day-Component -->
      <CalendarDay v-for="tag in calendarWeekData" :key="tag.id" v-bind:day="tag"/>
    <!-- Ende: Template für die Calendar-Day-Component -->
    </div>
  </div>

</template>

<script>
import CalendarDay from "@/components/CalendarDay";
import Store from "@/store";

export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
  /*data: function () {
    return {
      calendarWeekData: Store.state.calendarWeekData
    }
  },*/
  //kurz dafür:
  data() {
    return {
      calendarWeekData: Store.state.calendarWeekData
    };
  },
};
</script>

<style scoped>

</style>