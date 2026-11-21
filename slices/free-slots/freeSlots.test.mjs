import { chapter, scenario } from "itsybit-gwt";
import { freeSlots } from "./freeSlots.js";

chapter("Book the sauna", () => {
  scenario("All four hours are free at first")
    .thenView("Free Slots", freeSlots,
      { slots: ["17:00", "18:00", "19:00", "20:00"] });

  scenario("A full hour is no longer free")
    .given(["CapacitySet", { perSlot: 2 }],
      ["SlotBooked", { slot: "18:00", name: "Ada" }],
      ["SlotBooked", { slot: "18:00", name: "Linus" }])
    .thenView("Free Slots", freeSlots,
      { slots: ["17:00", "19:00", "20:00"] });
});
