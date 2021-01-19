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
      var allDays = response.consultants;
      var allDaysElement = document.getElementById("select-day-consultant");
      allDays.forEach(user => {
        allDaysElement.innerHTML += getConsultantAsOptionElement(user);
      });
    });
}

function getConsultantAsOptionElement(consultant) {
  return `<option value="${consultant.id.value}">${consultant.person.fullName}</option>`;
}

/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();

function displayUsers() {
  httpGet("/api/days/all")
    .then(response => response.json())
    .then(response => {
      var allDays = response.days;
      var allDaysElement = document.getElementById("all-days");
      allDaysElement.innerHTML = "";
      // Append users to anchor
      allDays.forEach(user => {
        allDaysElement.innerHTML += getDayDisplayElement(user);
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
            <dd>${day.consultant.person.fullName}</dd>

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

/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches("#button-add-day")) {
      addDay();
    } else if (ele.matches(".edit-user-btn")) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches(".cancel-edit-btn")) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches(".submit-edit-btn")) {
      submitEdit(ele);
    } else if (ele.matches(".delete-user-btn")) {
      deleteUser(ele);
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
    displayUsers();
  });
}

function showEditView(userEle) {
  var normalView = userEle.getElementsByClassName("normal-view")[0];
  var editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "none";
  editView.style.display = "block";
}

function cancelEdit(userEle) {
  var normalView = userEle.getElementsByClassName("normal-view")[0];
  var editView = userEle.getElementsByClassName("edit-view")[0];
  normalView.style.display = "block";
  editView.style.display = "none";
}

function submitEdit(ele) {
  var userEle = ele.parentNode.parentNode;
  var nameInput = userEle.getElementsByClassName("name-edit-input")[0];
  var emailInput = userEle.getElementsByClassName("email-edit-input")[0];
  var id = ele.getAttribute("data-user-id");
  var data = {
    user: {
      name: nameInput.value,
      email: emailInput.value,
      id: id
    }
  };
  httpPut("/api/users/update", data).then(() => {
    displayUsers();
  });
}

function deleteUser(ele) {
  var id = ele.getAttribute("data-user-id");
  httpDelete("/api/users/delete/" + id).then(() => {
    displayUsers();
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
