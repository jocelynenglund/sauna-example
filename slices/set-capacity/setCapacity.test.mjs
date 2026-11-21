import { chapter, scenario } from "itsybit-gwt";
import { setCapacity } from "./setCapacity.js";

chapter("Book the sauna", () => {
  scenario("Sets how many may share an hour")
    .when("Set Capacity", { perSlot: 2 }, setCapacity)
    .then(["CapacitySet", { perSlot: 2 }]);

  scenario("Refuses less than one")
    .when("Set Capacity", { perSlot: 0 }, setCapacity)
    .thenNothing("capacity must be at least 1");
});
