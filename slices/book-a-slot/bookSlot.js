// Book a slot: put your name on an hour that still has room.
export function bookSlot(history, cmd) {
  let perSlot = 1;
  let booked = 0;
  for (const e of history) {
    if (e.type === "CapacitySet") perSlot = e.perSlot;
    if (e.type === "SlotBooked" && e.slot === cmd.slot) booked++;
  }
  if (booked >= perSlot) return { rejected: `${cmd.slot} is full` };

  return {
    events: [{ type: "SlotBooked", slot: cmd.slot, name: cmd.name }],
  };
}
