const products = [
  { id: 1, name: "Sản phẩm 1", price: 100000 },
  { id: 2, name: "Sản phẩm 2", price: 200000 },
  { id: 3, name: "Sản phẩm 3", price: 300000 },
  { id: 4, name: "Sản phẩm 4", price: 400000 },
];

function displayProducts() {
  const productTableBody = document.querySelector("#product_table tbody");
  productTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price.toLocaleString()} VND</td>
      <td>
        <input type="number" id="quantity_${product.id}" value="1" min="1" />
        <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });
}

function addToCart(productId) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  const quantity = parseInt(
    document.getElementById(`quantity_${productId}`).value
  );

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cartDataDiv = document.getElementById("cart_data");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartDataDiv.innerHTML = "<p>Giỏ hàng trống</p>";
    return;
  }

  const cartTable = document.createElement("table");
  cartTable.border = 1;
  cartTable.width = "100%";
  cartTable.innerHTML = `
    <thead>
      <tr>
        <th>Tên sản phẩm</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Tổng</th>
        <th>Xóa</th>
      </tr>
    </thead>
    <tbody>
      ${cart
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.price.toLocaleString()} VND</td>
          <td><input type="number" value="${
            item.quantity
          }" min="1" id="cart_quantity_${item.id}" /></td>
          <td>${(item.price * item.quantity).toLocaleString()} VND</td>
          <td><button onclick="removeFromCart(${item.id})">Xóa</button></td>
        </tr>
      `
        )
        .join("")}
      <tr>
        <td colspan="2">Tổng</td>
        <td id="total_item">${calculateItem().toLocaleString()}</td>
        <td id="total_price">${calculateTotal().toLocaleString()} VND</td>
        <td></td>
      </tr>
    </tbody>
  `;

  const updateButtons = `
    <button onclick="updateCart()">Cập nhật giỏ hàng</button>
    <button onclick="clearCart()">Xóa giỏ hàng</button>
  `;

  cartDataDiv.innerHTML = "";
  cartDataDiv.appendChild(cartTable);
  cartDataDiv.innerHTML += updateButtons;
}

function calculateItem() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCart() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const quantityInput = document.getElementById(`cart_quantity_${item.id}`);
    if (quantityInput) {
      item.quantity = parseInt(quantityInput.value);
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeFromCart(productId) {
  if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

function clearCart() {
  if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
    localStorage.removeItem("cart");
    displayCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayCart();
});
