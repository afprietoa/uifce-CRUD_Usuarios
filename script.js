// Simulación de base de datos en memoria
let users = [
    { id: 1, name: "Laura García", email: "laura@gmail.com" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@hotmail.com" }
  ];
  
  const form = document.getElementById("userForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const userIdInput = document.getElementById("userId");
  const userList = document.getElementById("userList");
  const submitBtn = document.getElementById("submitBtn");
  
  function renderUsers() {
    userList.innerHTML = "";
    users.forEach(user => {
      userList.innerHTML += `
        <div class="user-card">
          <div class="user-content">
            <p class="user-id">ID: ${user.id}</p>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Correo:</strong> ${user.email}</p>
          </div>
          <div class="user-actions">
            <button class="edit" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
            <button class="delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      `;
    });
  }
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const id = userIdInput.value;
  
    if (!name || !email) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    if (id) {
      const user = users.find(u => u.id == id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    } else {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      users.push({ id: newId, name, email });
    }
  
    resetForm();
    renderUsers();
  });
  
  function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
      nameInput.value = user.name;
      emailInput.value = user.email;
      userIdInput.value = user.id;
      submitBtn.textContent = "Actualizar Usuario";
    }
  }
  
  function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    renderUsers();
  }
  
  function resetForm() {
    form.reset();
    userIdInput.value = "";
    submitBtn.textContent = "Agregar Usuario";
  }
  
  document.addEventListener("DOMContentLoaded", renderUsers);
  