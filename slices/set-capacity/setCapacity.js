// Set capacity: how many people may share one hour.
export function setCapacity(history, cmd) {
  if (!(cmd.perSlot >= 1)) {
    return { rejected: "capacity must be at least 1" };
  }
  return { events: [{ type: "CapacitySet", perSlot: cmd.perSlot }] };
}
