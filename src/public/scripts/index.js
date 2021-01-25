setCurrentDateInDatePicker();
function setCurrentDateInDatePicker() {
  var dateControl = document.getElementById("input-day-date");
  dateControl.value = new Date().toISOString().substring(0, 10);
}

getAllConsultantsAndAddToUi();
function getAllConsultantsAndAddToUi() {
  httpGet("/api/consultants/all")
    .then(response => response.json())
    .then(response => {
      var consultants = response.consultants;
      var allDaysElement = document.getElementById("select-day-consultant");
      consultants.forEach(consultant => {
        allDaysElement.innerHTML += getConsultantAsOptionElement(consultant);
      });
    });
}

function getConsultantAsOptionElement(consultant) {
  return `<option value="${consultant.id.value}">${consultant.person.fullName}</option>`;
}

displayDays();
function displayDays() {
  httpGet("/api/days/all")
    .then(response => response.json())
    .then(response => {
      var allDays = response.days;
      var allDaysElement = document.getElementById("all-days");
      allDaysElement.innerHTML = "";
      allDays.forEach(day => {
        allDaysElement.innerHTML += getDayDisplayElement(day);
      });
    });
}

function getDayDisplayElement(day) {
  var registrationsHtml = "";
  day.registrations.forEach(registration => {
    registrationsHtml += getRegistrationDisplayElement(registration);
  });
  return `
    <div class="day">
        <dl>
            <dt>Consultant</dt>
            <dd cy="consultant-name">${day.consultant.person.fullName}</dd>

            <dt>Date</dt>
            <dd>${new Date(day.date).toDateString()}</dd>
        </dl>
        <div>Registrations: ${registrationsHtml}</div>
    </div>`;
}

function getRegistrationDisplayElement(registration) {
  return `
    <div class="registration">
        <div>Project: ${registration.projectSnapshot.name}</div>
    </div>`;
}

document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches("#button-add-day")) {
      addDay();
    }
  },
  false
);

function addDay() {
  var dateInput = document.getElementById("input-day-date");
  var consultantSelect = document.getElementById("select-day-consultant");
  var data = {
    day: {
      date: dateInput.value,
      consultantId: consultantSelect.value
    }
  };
  httpPost("/api/days/add", data).then(() => {
    displayDays();
  });
}

function httpGet(path) {
  return fetch(path, getOptions("GET"));
}

function httpPost(path, data) {
  return fetch(path, getOptions("POST", data));
}

function httpPut(path, data) {
  return fetch(path, getOptions("PUT", data));
}

function httpDelete(path) {
  return fetch(path, getOptions("DELETE"));
}

function getOptions(verb, data) {
  var options = {
    dataType: "json",
    method: verb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
