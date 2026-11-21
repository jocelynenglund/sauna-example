# Sauna example

The smallest example of going from an event model to code and tests with EVE (event modeling, vertical slices, event sourcing).

An office sauna with one-hour slots. Three slices, seven Given/When/Then scenarios:

| Slice | Kind | Rule |
|---|---|---|
| `slices/set-capacity` | command | SetCapacity → CapacitySet; refused below 1 |
| `slices/book-a-slot` | command | BookSlot → SlotBooked; refused when the hour is full (capacity read from history, 1 if never set) |
| `slices/free-slots` | view | freeSlots, folded from history, never stored |

Each slice is one plain JavaScript function over the event history, with its test next to it. Nothing is shared between slices.

- The model in Event Book: https://eventbook.itsybit.se/?book=m_mwqapzau9z2c6
- `payloads/`: what an orchestrator hands a builder for each slice
- `series/`: pictures of each slice: board, payload, test, code

## Run it

```
npm install
npm test     # the 7 Given/When/Then scenarios
npm start    # the bastu page on http://localhost:8080
```

Or try it live: https://prototype.itsybit.se/bastu/

The page (`index.html`, `app.js`) only wires buttons to the slices: Book calls `bookSlot`, Set calls `setCapacity`, the free slots are `freeSlots`. Each call gets the event history; a refusal is shown, an accepted command appends its events. The history is kept in your browser and listed at the bottom, so you can see that it's all that's stored.
