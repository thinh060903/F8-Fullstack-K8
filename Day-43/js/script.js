const API_URL = "https://api-auth-two.vercel.app";
let currentUser = null;
let page = 1;
let loading = false;

document.addEventListener("DOMContentLoaded", () => {
  init(); // Khởi tạo trang
  document
    .getElementById("newPostBtn")
    .addEventListener("click", toggleBlogForm); // Gán sự kiện cho nút viết bài mới
  document.getElementById("logoutBtn").addEventListener("click", logout); // Gán sự kiện cho nút đăng xuất
  document.getElementById("loginBtn").addEventListener("click", login); // Gán sự kiện cho nút đăng nhập
  document
    .getElementById("registerBtn")
    .addEventListener("click", showRegister); // Gán sự kiện cho nút đăng ký
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadBlogs();
    }
  });
});

function init() {
  checkLogin();
  loadBlogs(); // Tải blog ngay cả khi chưa đăng nhập
}

// Kiểm tra trạng thái đăng nhập và cập nhật giao diện
function checkLogin() {
  const token = localStorage.getItem("accessToken");
  const newPostBtn = document.getElementById("newPostBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginForm = document.getElementById("loginForm");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const blogForm = document.getElementById("blogForm");

  if (token) {
    fetch(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          currentUser = data.data;
          newPostBtn.style.display = "block";
          logoutBtn.style.display = "block";
          loginForm.style.display = "none"; // Ẩn form đăng nhập khi đã đăng nhập thành công
          userNameDisplay.style.display = "block";
          userNameDisplay.textContent = `Xin chào, ${currentUser.name}!`;
        } else {
          throw new Error("Token không hợp lệ");
        }
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        newPostBtn.style.display = "none";
        logoutBtn.style.display = "none";
        loginForm.style.display = "block"; // Hiển thị lại form đăng nhập nếu token không hợp lệ
        userNameDisplay.style.display = "none";
        blogForm.style.display = "none"; // Ẩn form viết bài nếu token không hợp lệ
      });
  } else {
    newPostBtn.style.display = "none";
    logoutBtn.style.display = "none";
    loginForm.style.display = "block"; // Hiển thị form đăng nhập nếu chưa đăng nhập
    userNameDisplay.style.display = "none";
    blogForm.style.display = "none"; // Ẩn form viết bài nếu chưa đăng nhập
  }
}

// Xử lý đăng nhập
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        currentUser = data.data;
        localStorage.setItem("accessToken", currentUser.accessToken);
        localStorage.setItem("refreshToken", currentUser.refreshToken);
        alert("Đăng nhập thành công!");
        checkLogin(); // Cập nhật giao diện sau khi đăng nhập thành công
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Xử lý đăng ký (show form đăng ký)
function showRegister() {
  window.location.href = "register.html"; // Điều hướng đến trang đăng ký
}

// Xử lý đăng xuất
function logout() {
  const token = localStorage.getItem("accessToken");
  const blogForm = document.getElementById("blogForm");

  fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        currentUser = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("Đã đăng xuất");
        blogForm.style.display = "none"; // Ẩn form viết bài khi đăng xuất
        checkLogin(); // Kiểm tra và cập nhật giao diện sau khi đăng xuất thành công
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Xử lý đăng bài mới
function postBlog() {
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const token = localStorage.getItem("accessToken");

  if (!title || !content) {
    alert("Vui lòng điền đủ thông tin");
    return;
  }

  fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        alert("Đăng bài thành công");
        document.getElementById("blogTitle").value = "";
        document.getElementById("blogContent").value = "";
        loadBlogs(); // Tải lại danh sách blog sau khi đăng bài
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Tải danh sách blog
function loadBlogs() {
  if (loading) return;
  loading = true;
  showLoading();

  fetch(`${API_URL}/blogs?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      if (data.code === 200 && data.data.length > 0) {
        renderBlogs(data.data);
        page++;
        loading = false;
      } else {
        alert("Không còn bài viết nào nữa");
        loading = false;
      }
    })
    .catch((error) => {
      hideLoading();
      console.error("Error:", error);
      loading = false;
    });
}

// Hiển thị danh sách blog và xử lý nội dung để loại bỏ các thẻ HTML không mong muốn
function renderBlogs(blogs) {
  const blogContainer = document.getElementById("blogs");

  blogs.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = "blog-post";

    const titleElement = document.createElement("h3");
    titleElement.textContent = blog.title;
    titleElement.addEventListener("click", () => {
      window.location.href = `blogDetail.html?blogId=${blog._id}`;
    });

    const contentElement = document.createElement("p");
    contentElement.textContent = blog.content.replace(/<[^>]*>/g, ""); // Loại bỏ tất cả các thẻ HTML

    const authorElement = document.createElement("p");
    authorElement.innerText = blog.userId.name; // Sử dụng innerText để hiển thị tên tác giả an toàn

    blogElement.appendChild(titleElement);
    blogElement.appendChild(contentElement);
    blogElement.appendChild(authorElement);

    blogContainer.appendChild(blogElement);
  });
}

// Hiển thị hoặc ẩn form viết bài mới khi nhấn nút "Viết bài mới"
function toggleBlogForm() {
  const blogForm = document.getElementById("blogForm");
  if (blogForm.style.display === "none" || blogForm.style.display === "") {
    blogForm.style.display = "block";
  } else {
    blogForm.style.display = "none";
  }
}

// Hiển thị trạng thái loading
function showLoading() {
  document.getElementById("loading").style.display = "block";
}

// Ẩn trạng thái loading
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

// Duy trì đăng nhập và làm mới accessToken khi token hết hạn
function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        localStorage.setItem("accessToken", data.data.token.accessToken);
        // Tiếp tục hoạt động với accessToken mới
      } else {
        alert(data.message);
        logout();
      }
    })
    .catch((error) => console.error("Error:", error));
}
