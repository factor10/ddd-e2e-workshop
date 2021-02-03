setCurrentDateInDatePicker();
function setCurrentDateInDatePicker() {
  var dateControl = document.getElementById("input-date");
  dateControl.value = new Date().toISOString().substring(0, 10);
}

getAllConsultantsAndAddToUi();
function getAllConsultantsAndAddToUi() {
  httpGet("/api/consultants")
    .then(response => response.json())
    .then(response => {
      var consultants = response.consultants;
      var allDaysElement = document.getElementById("select-consultant");
      consultants.forEach(consultant => {
        allDaysElement.innerHTML += `<option value="${consultant.id.value}">${consultant.person.fullName}</option>`;
      });
    });
}

displayRegistrations();
function displayRegistrations() {
  httpGet("/api/days")
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
  var totalDurationMinutes = 0;
  day.registrations.forEach(registration => {
    registrationsHtml += getRegistrationDisplayElement(registration);
    totalDurationMinutes += registration.duration.minutes;
  });
  return `
    <div class="day" cy="day">
        <dl>
            <dt>Consultant</dt>
            <dd cy="consultant-name">${day.consultant.person.fullName}</dd>

            <dt>Date</dt>
            <dd>${new Date(day.date).toDateString()}</dd>

            <dt>Total duration</dt>
            <dd cy="total-duration">${totalDurationMinutes} minutes</dd>

            <dt>Registrations</dt>
            <dd><ul>${registrationsHtml}</ul></dd>
        </dl>
    </div>`;
}

function getRegistrationDisplayElement(registration) {
  return `
    <li class="registration" cy="registration">
      <span cy="activity-name">${registration.activity}</span>
      @
      <span cy="project-name">${registration.projectSnapshot.name}</span>
      <br />
      <span cy="duration">${registration.duration.minutes} minutes</span>
    </li>`;
}

document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches("#button-add-registration")) {
      addRegistration();
    }
  },
  false
);
document.addEventListener(
  "change",
  function (event) {
    var ele = event.target;
    if (ele.matches("#select-consultant")) {
      updateProjectSelect();
    }
  },
  false
);

function addRegistration() {
  hideError();
  var consultantId = document.getElementById("select-consultant").value;
  var date = document.getElementById("input-date").value;
  var projectName = document.getElementById("select-project").value;
  var activity = document.getElementById("input-activity").value;
  var duration = document.getElementById("input-duration").value;
  var data = {
    registration: {
      projectName,
      activity,
      duration
    }
  };
  httpPost(`/api/days/${consultantId}/${date}/registrations`, data)
    .then(response => {
      if (response.status === 201) {
        displayRegistrations();
        return;
      }
      return response.json();
    })
    .then(json => {
      if (json && json.error) {
        showError(json.error);
      }
    });
}

function updateProjectSelect() {
  var consultantId = document.getElementById("select-consultant").value;
  httpGet(`/api/consultants/${consultantId}/projects`)
    .then(response => response.json())
    .then(response => {
      var projects = response.projects;
      var projectsElement = document.getElementById("select-project");
      projectsElement.innerHTML = projectsElement.getElementsByTagName(
        "option"
      )[0].outerHTML;
      projects.forEach(project => {
        projectsElement.innerHTML += `<option value="${project.name}">${project.name}</option>`;
      });
    });
}

var warningElement = document.getElementById("warning");
function showError(message) {
  warningElement.innerText = message;
  warningElement.style.display = "";
}
function hideError() {
  warningElement.innerText = "";
  warningElement.style.display = "none";
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
