import { chapter, scenario } from "itsybit-gwt";
import { bookSlot } from "../src/bookSlot.js";
import { freeSlots } from "../src/freeSlots.js";

chapter("Book the sauna", () => {
  scenario("Books a free slot")
    .when("Book Slot", { slot: "18:00", name: "Jocelyn" }, bookSlot)
    .then(["SlotBooked", { slot: "18:00", name: "Jocelyn" }]);

  scenario("Refuses a slot that is taken")
    .given(["SlotBooked", { slot: "18:00", name: "Ada" }])
    .when("Book Slot", { slot: "18:00", name: "Jocelyn" }, bookSlot)
    .thenNothing("18:00 is taken");

  scenario("All four hours are free at first")
    .thenView("Free Slots", freeSlots,
      { slots: ["17:00", "18:00", "19:00", "20:00"] });

  scenario("A booked hour is no longer free")
    .given(["SlotBooked", { slot: "18:00", name: "Ada" }])
    .thenView("Free Slots", freeSlots,
      { slots: ["17:00", "19:00", "20:00"] });
});
