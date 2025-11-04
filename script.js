
function getUsers() { return JSON.parse(localStorage.getItem("users") || "[]"); }
function getForms() { return JSON.parse(localStorage.getItem("forms") || "[]"); }
function saveForms(forms) { localStorage.setItem("forms", JSON.stringify(forms)); }


function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const role = document.getElementById("regRole").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const users = getUsers();
  if (users.some(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration Successful!");
  window.location.href = "index.html";
}


function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const users = getUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = user.role === "admin" ? "admin.html" : "user.html";
}


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}


function submitForm() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const fullname = document.getElementById("fullname").value;
  const address = document.getElementById("address").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;

  if (!fullname || !address || !education) {
    alert("Please fill all fields!");
    return;
  }

  const forms = getForms();
  const existing = forms.find(f => f.email === user.email);

  if (existing) {
    Object.assign(existing, { fullname, address, education, experience, status: "Pending" });
  } else {
    forms.push({ email: user.email, fullname, address, education, experience, status: "Pending" });
  }

  saveForms(forms);
  alert("Form submitted successfully!");
  displayStatus();
}

function displayStatus() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const forms = getForms();
  const data = forms.find(f => f.email === user.email);
  if (data) {
    document.getElementById("statusText").innerHTML =
      `Current Verification Status: <span class="status-badge status-${data.status}">${data.status}</span>`;
  }
  document.getElementById("username").innerText = user.name;
}


function loadAdminData() {
  const tbody = document.querySelector("#dataTable tbody");
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  const filterVal = document.getElementById("filterStatus").value;
  const forms = getForms();

  tbody.innerHTML = "";

  forms
    .filter(f => (filterVal === "all" || f.status === filterVal))
    .filter(f => f.email.toLowerCase().includes(searchVal))
    .forEach((f, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.email}</td>
        <td>${f.education}</td>
        <td><span class="status-badge status-${f.status}">${f.status}</span></td>
        <td>
          <button onclick="openDetails(${i})">View</button>
          <select id="status-${i}">
            <option ${f.status==="Pending"?"selected":""}>Pending</option>
            <option ${f.status==="Verified"?"selected":""}>Verified</option>
            <option ${f.status==="Rejected"?"selected":""}>Rejected</option>
          </select>
          <button onclick="updateStatus(${i})">Update</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

function openDetails(index) {
  const f = getForms()[index];
  const info = `
    <b>Name:</b> ${f.fullname}<br>
    <b>Email:</b> ${f.email}<br>
    <b>Address:</b> ${f.address}<br>
    <b>Education:</b> ${f.education}<br>
    <b>Experience:</b> ${f.experience}<br>
    <b>Status:</b> <span class="status-badge status-${f.status}">${f.status}</span>
  `;
  document.getElementById("modalInfo").innerHTML = info;
  document.getElementById("detailsModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("detailsModal").style.display = "none";
}

function updateStatus(index) {
  const forms = getForms();
  const newStatus = document.getElementById(`status-${index}`).value;
  forms[index].status = newStatus;
  saveForms(forms);
  alert("Status updated!");
  loadAdminData();
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path.includes("user.html")) displayStatus();
  if (path.includes("admin.html")) {
    loadAdminData();
    document.getElementById("searchInput").addEventListener("input", loadAdminData);
  }
});
