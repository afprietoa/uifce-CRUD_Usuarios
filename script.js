// Simulación de base de datos
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
          <p><strong>Nombre:</strong> ${user.name}</p>
          <p><strong>Correo:</strong> ${user.email}</p>
          <button onclick="editUser(${user.id})">Editar</button>
          <button onclick="deleteUser(${user.id})">Eliminar</button>
        </div>
      `;
    });
  }
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const id = userIdInput.value;
  
    if (!name || !email) return;
  
    if (id) {
      // Editar usuario
      const user = users.find(u => u.id == id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Date.now(),
        name,
        email
      };
      users.push(newUser);
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
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      users = users.filter(u => u.id !== id);
      renderUsers();
    }
  }
  
  function resetForm() {
    form.reset();
    userIdInput.value = "";
    submitBtn.textContent = "Agregar Usuario";
  }
  
  document.addEventListener("DOMContentLoaded", renderUsers);
  