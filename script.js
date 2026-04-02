const calendar = document.getElementById("calendar");
const progressBar = document.getElementById("progress");

// monthly backgrounds
const backgrounds = [
  "url('https://source.unsplash.com/1600x900/?nature')",
  "url('https://source.unsplash.com/1600x900/?technology')",
  "url('https://source.unsplash.com/1600x900/?space')",
  "url('https://source.unsplash.com/1600x900/?ocean')",
  "url('https://source.unsplash.com/1600x900/?mountain')",
  "url('https://source.unsplash.com/1600x900/?city')",
  "url('https://source.unsplash.com/1600x900/?forest')",
  "url('https://source.unsplash.com/1600x900/?sunset')",
  "url('https://source.unsplash.com/1600x900/?coding')",
  "url('https://source.unsplash.com/1600x900/?design')",
  "url('https://source.unsplash.com/1600x900/?abstract')",
  "url('https://source.unsplash.com/1600x900/?minimal')"
];

document.body.style.backgroundImage = backgrounds[new Date().getMonth()];

// load data from localStorage
let data = JSON.parse(localStorage.getItem("tracker")) || {};

// generate 30 days
for (let i = 1; i <= 30; i++) {
  const card = document.createElement("div");
  card.className = "day-card";

  card.innerHTML = `
    <div class="day-title">Day ${i}</div>
    ${createRow(i, "topic")}
    ${createRow(i, "fundamentals")}
    ${createRow(i, "hands-on")}
  `;
  calendar.appendChild(card);
}

// create row html
function createRow(day, type) {
  const value = data[day]?.[type]?.text || "";
  const status = data[day]?.[type]?.status || "";
  return `
    <div class="row">
      <input value="${value}" placeholder="${type}" oninput="saveInput(${day}, '${type}', this.value)">
      <div class="buttons">
        <button class="completed" onclick="mark(${day}, '${type}', 'done')">✔</button>
        <button class="pursuing" onclick="mark(${day}, '${type}', 'doing')">P</button>
        <span class="tick" style="display:${status==='done'?'inline':'none'}">✔</span>
      </div>
    </div>
  `;
}

// save input
function saveInput(day, type, value) {
  if (!data[day]) data[day] = {};
  if (!data[day][type]) data[day][type] = {};
  data[day][type].text = value;
  localStorage.setItem("tracker", JSON.stringify(data));
}

// mark completed/pursuing
function mark(day, type, status) {
  if (!data[day]) data[day] = {};
  if (!data[day][type]) data[day][type] = {};
  data[day][type].status = status;
  localStorage.setItem("tracker", JSON.stringify(data));
  location.reload();
}

// update progress bar
function updateProgress() {
  let total = 30 * 3;
  let done = 0;
  for (let day in data) {
    for (let task in data[day]) {
      if (data[day][task].status === "done") done++;
    }
  }
  progressBar.style.width = ((done / total) * 100) + "%";
}

updateProgress();
