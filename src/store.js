import { calendarWeekData} from "@/seed";
import { reactive, readonly} from "vue";

const state = reactive({
  calendarWeekData
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active)
}

const mutations = {
  editEvent(dayId, eventTitle) {
    //Alle edit-Attribute auf false setzen
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => event.edit = false);
    });
    //Setze das entsprechende edit-Attribut auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === eventTitle);
    eventObj.edit = true;
  },
  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === oldEventTitle);
    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex((event) => event.title === eventTitle);
    dayObj.events.splice(eventIndex, 1);
  },
  changeActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) => dayObj.active = false);
    const newActiveDayObj = state.calendarWeekData.find((day) => day.id === dayId);
    newActiveDayObj.active = true;
  },
  setNewEvent(event) {
    const dayObj = state.calendarWeekData.find((day) => day.active === true);
    dayObj.events.push({
      color: event.color,
      title: event.title,
      edit: false,
      priority: Number(event.priority)});
  },
}

export default {
  //Kurzschreibweise: Schlüssel und Wert sind identisch
  state: readonly(state),
  getters,
  mutations
};
