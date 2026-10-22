// работа с localStorage
function getUsers() {
  var text = localStorage.getItem("users");
  if (text === null) {
    return [];
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return [];
  }
}

function findUser(email) {
  var users = getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  return null;
}

// выход
function setupLogout() {
  var link = document.getElementById("logout");
  if (!link) {
    return;
  }
  link.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
  });
}

// регистрация
function setupRegister() {
  var form = document.getElementById("register-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = document.getElementById("message");
    var email = document.getElementById("email").value.trim().toLowerCase();
    if (findUser(email) !== null) {
      message.innerHTML = 'Такой e-mail уже зарегистрирован. <a href="login.html">Войти</a>';
      return;
    }
    var users = getUsers();
    users.push({
      fio: document.getElementById("fio").value.trim(),
      phone: document.getElementById("phone").value,
      email: email,
      password: document.getElementById("password").value
    });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);
    location.href = "index.html";
  });
}

// вход
function setupLogin() {
  var form = document.getElementById("login-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var message = document.getElementById("message");
    var email = document.getElementById("email").value.trim().toLowerCase();
    var user = findUser(email);
    if (user === null) {
      message.innerHTML = 'Пользователь не найден. Сначала <a href="register.html">зарегистрируйтесь</a>';
      return;
    }
    if (user.password !== document.getElementById("password").value) {
      message.textContent = "Неверный пароль";
      return;
    }
    localStorage.setItem("currentUser", email);
    location.href = "index.html";
  });
}

setupLogout();
setupRegister();
setupLogin();
