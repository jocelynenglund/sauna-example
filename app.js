// The page only wires buttons to the slices. All rules live in slices/, unchanged.
import { setCapacity } from "./slices/set-capacity/setCapacity.js";
import { bookSlot } from "./slices/book-a-slot/bookSlot.js";
import { freeSlots } from "./slices/free-slots/freeSlots.js";

const KEY = "bastu-events";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; } };
const save = (h) => { try { localStorage.setItem(KEY, JSON.stringify(h)); } catch {} };
let history = load();

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function run(name, slice, cmd) {
  const decision = slice(history, cmd);
  if (decision.rejected) {
    $("result").className = "rejected";
    $("result").textContent = `${name} refused: ${decision.rejected}`;
    return;
  }
  history = [...history, ...decision.events];
  save(history);
  $("result").className = "ok";
  $("result").textContent = `${name} → ${decision.events.map((e) => e.type).join(", ")}`;
  draw();
}

function draw() {
  const { slots } = freeSlots(history);
  $("free").innerHTML = slots.length ? slots.map((s) => `<li>${s}</li>`).join("") : "<li class=none>Nothing free tonight</li>";
  $("history").innerHTML = history.length
    ? history.map((e) => { const { type, ...data } = e; return `<li><b>${type}</b> ${esc(JSON.stringify(data))}</li>`; }).join("")
    : "<li class=none>Nothing happened yet</li>";
}

$("book").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const f = new FormData(ev.target);
  run("BookSlot", bookSlot, { slot: f.get("slot"), name: f.get("name").trim() });
});
$("capacity").addEventListener("submit", (ev) => {
  ev.preventDefault();
  run("SetCapacity", setCapacity, { perSlot: Number(new FormData(ev.target).get("perSlot")) });
});
$("reset").addEventListener("click", () => { history = []; save(history); $("result").textContent = ""; draw(); });

draw();
