// Free slots tonight: never stored, folded from the history.
const TONIGHT = ["17:00", "18:00", "19:00", "20:00"];

export function freeSlots(history) {
  let perSlot = 1;
  const booked = {};
  for (const e of history) {
    if (e.type === "CapacitySet") perSlot = e.perSlot;
    if (e.type === "SlotBooked") {
      booked[e.slot] = (booked[e.slot] ?? 0) + 1;
    }
  }
  const hasRoom = (s) => (booked[s] ?? 0) < perSlot;
  return { slots: TONIGHT.filter(hasRoom) };
}
