// Free slots tonight: never stored, folded from the bookings.
const TONIGHT = ["17:00", "18:00", "19:00", "20:00"];

export function freeSlots(history) {
  const booked = history
    .filter((e) => e.type === "SlotBooked")
    .map((e) => e.slot);

  return { slots: TONIGHT.filter((s) => !booked.includes(s)) };
}
