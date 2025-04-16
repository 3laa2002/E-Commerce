let userInfo = document.querySelector("#userInfo");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logOut");

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

if (localStorage.getItem("Email")) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = localStorage.getItem("Username");
}

logOutBtn.addEventListener("click", function () {
  loadSweetAlert(function () {
    localStorage.clear();
    setTimeout(() => {
      window.location = "register.html";
    }, 1500);
    Swal.fire({
      icon: "success",
      title: "Logging Out....",
      text: "Sign Out",
    });
  });
});
