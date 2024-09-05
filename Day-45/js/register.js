const API_URL = "https://api-auth-two.vercel.app";

document.getElementById("registerBtn").addEventListener("click", register);

function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  showLoading();

  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      if (data.code === 201) {
        alert("Đăng ký thành công!");
        window.location.href = "login.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      hideLoading();
      console.error("Error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau");
    });
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
