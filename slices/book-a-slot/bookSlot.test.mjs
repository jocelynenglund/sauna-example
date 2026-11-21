import { chapter, scenario } from "itsybit-gwt";
import { bookSlot } from "./bookSlot.js";

chapter("Book the sauna", () => {
  scenario("Books a free slot")
    .when("Book Slot", { slot: "18:00", name: "Jocelyn" }, bookSlot)
    .then(["SlotBooked", { slot: "18:00", name: "Jocelyn" }]);

  scenario("Two can share an hour when capacity is two")
    .given(["CapacitySet", { perSlot: 2 }],
      ["SlotBooked", { slot: "18:00", name: "Ada" }])
    .when("Book Slot", { slot: "18:00", name: "Jocelyn" }, bookSlot)
    .then(["SlotBooked", { slot: "18:00", name: "Jocelyn" }]);

  scenario("Refuses a full hour")
    .given(["SlotBooked", { slot: "18:00", name: "Ada" }])
    .when("Book Slot", { slot: "18:00", name: "Jocelyn" }, bookSlot)
    .thenNothing("18:00 is full");
});
