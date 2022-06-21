import { calendarWeekData} from "@/seed";
import { reactive, readonly} from "vue";

const state = reactive({
  calendarWeekData,
  activeView: "CalendarWeek",
  activeOrdering: "title"
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  activeView: () => state.activeView,
  activeOrdering: () => state.activeOrdering,
  events: (dayId) => {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    return dayObj.events.sort((eventA, eventB) => {
      if (eventA[state.activeOrdering] < eventB[state.activeOrdering]) {
        return -1;
      } else if (eventA[state.activeOrdering] > eventB[state.activeOrdering]) {
        return 1;
      }
      return 0;
    });
  }
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
  setActiveView(view) {
    state.activeView = view;
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
  setActiveOrdering(ordering) {
    state.activeOrdering = ordering;
  },
}

export default {
  //Kurzschreibweise: Schlüssel und Wert sind identisch
  state: readonly(state),
  getters,
  mutations
};
