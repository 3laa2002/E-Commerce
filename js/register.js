let userName = document.querySelector("#userName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#signUp");

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

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loadSweetAlert(function () {
    if (userName.value === "" || email.value === "" || password.value === "") {
      Swal.fire({
        icon: "error",
        title: "Please Fill Data",
        text: "Some of data is empty!!",
      });
      userName.value = "";
      email.value = "";
      password.value = "";
    } else {
      localStorage.setItem("Username", userName.value);
      localStorage.setItem("Email", email.value);
      localStorage.setItem("Password", password.value);
      setTimeout(() => {
        window.location = "login.html";
      }, 1300);
      Swal.fire({
        icon: "success",
        title: "Sign UP Successfully",
        text: "You Can log in Now",
      });
    }
  });
});
