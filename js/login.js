let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#signIn");

let getEmail = localStorage.getItem("Email");
let getPassword = localStorage.getItem("Password");

// Function to load SweetAlert2
function loadSweetAlert(callback) {
  if (typeof Swal !== "undefined") {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  script.onload = callback;
  document.head.appendChild(script);
}

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loadSweetAlert(function () {
    if (email.value === "" || password.value === "") {
      Swal.fire({
        icon: "error",
        title: "Please Fill Data",
        text: "Some of data is empty!!",
      });
      email.value = "";
      password.value = "";
    } else {
      if (
        getEmail &&
        getEmail.trim() === email.value.trim() &&
        getPassword &&
        getPassword === password.value
      ) {
        setTimeout(() => {
          window.location = "index.html";
        }, 1300);
        Swal.fire({
          icon: "success",
          title: "Log In",
          text: "Welcome",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "The Email Or Password Is Wrong",
          text: "Invalid",
        });
      }
    }
  });
});
