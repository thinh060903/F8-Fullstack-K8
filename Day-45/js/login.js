const API_URL = "https://api-auth-two.vercel.app";

document.getElementById("loginBtn").addEventListener("click", login);

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ email và mật khẩu");
    return;
  }

  showLoading();

  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      if (data.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
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
