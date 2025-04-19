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
// Define Products
let products = [
  {
    id: 1,
    title: "Camera item",
    size: "large",
    imageUrl: "img/2.jpg",
  },
  {
    id: 2,
    title: "laptop item",
    size: "small",
    imageUrl: "img/3.jpg",
  },
  {
    id: 3,
    title: "cares item",
    size: "medium",
    imageUrl: "img/4.jpg",
  },
  {
    id: 4,
    title: "tools item",
    size: "large",
    imageUrl: "img/1.jpg",
  },
];
function drawProductsUI() {
  let productsUI = products.map(() => {
    return `
        <div
          class="product-item w-[100%] flex justify-between border-2 border-solid"
        >
          <img class="product-item-img w-[25%]" src="img/2.jpg" alt="ProPic" />
          <div class="product-item-desc">
            <h2 class="text-2xl font-semibold">Camera Item</h2>
            <p class="mt-4">Lorem ipsum dolor sit Possimus quae quasi .</p>
            <span>size : large</span>
          </div>
          <div class="product-item-actions flex-1 text-right flex justify-between flex-col">
            <input type="number" class="quantity-input" value="1" min="1" />
            <button
              class="add-to-cart mr-4 block ml-auto rounded-lg bg-green-900 text-white border-none py-[10px] px-[20px] cursor-pointer"
            >
              Add To Cart
            </button>
            <button class="favorite rounded-full  ml-40 mb-5 text-[30px]">  <i class=" fa-regular fa-heart "></i></button>
          
          </div>
        </div>
  `;
  });
}

// Helper to get product info from DOM
function getProductInfo(productItem) {
  const title = productItem
    .querySelector(".product-item-desc h2")
    .textContent.trim();
  const imageUrl = productItem
    .querySelector(".product-item-img")
    .getAttribute("src");
  const sizeText = productItem
    .querySelector(".product-item-desc span")
    .textContent.trim();
  const size = sizeText.split(":")[1]?.trim() || "";
  // Find product by title (assuming unique titles)
  const product = products.find(
    (p) => p.title.toLowerCase() === title.toLowerCase()
  );
  return product || { id: Date.now(), title, size, imageUrl };
}

document.addEventListener("DOMContentLoaded", function () {
  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productItem = btn.closest(".product-item");
      const product = getProductInfo(productItem);
      const quantityInput = productItem.querySelector(".quantity-input");
      const quantity = parseInt(quantityInput.value) || 1;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      // Dispatch event for badge update
      document.dispatchEvent(new Event("cart-updated"));
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${product.title} (x${quantity}) has been added to your cart!`,
        showConfirmButton: false,
        timer: 1200,
      });
    });
  });

  // Favorite functionality
  document.querySelectorAll(".favorite").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productItem = btn.closest(".product-item");
      const product = getProductInfo(productItem);
      let favs = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favs.find((item) => item.id === product.id)) {
        favs.push(product);
        localStorage.setItem("favorites", JSON.stringify(favs));
      }
      btn.querySelector("i").classList.remove("fa-regular");
      btn.querySelector("i").classList.add("fa-solid", "text-red-500");
      // Removed SweetAlert notification
    });
  });

  // Add delete button functionality for cart and favourites
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.dispatchEvent(new Event("cart-updated"));
    }

    if (e.target.classList.contains("remove-fav-item")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      let favs = JSON.parse(localStorage.getItem("favorites")) || [];
      favs = favs.filter((item) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
  });
});
