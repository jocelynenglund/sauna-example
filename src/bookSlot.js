// Book a slot: put your name on a free hour.
export function bookSlot(history, cmd) {
  const taken = history.some(
    (e) => e.type === "SlotBooked" && e.slot === cmd.slot
  );
  if (taken) return { rejected: `${cmd.slot} is taken` };

  return {
    events: [{ type: "SlotBooked", slot: cmd.slot, name: cmd.name }],
  };
}
