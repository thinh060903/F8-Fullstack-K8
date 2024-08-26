const API_URL = "https://api-auth-two.vercel.app";
let currentUser = null;
let page = 1;
let loading = false;

function init() {
  checkLogin();
  loadBlogs();
}

function checkLogin() {
  const token = localStorage.getItem("accessToken");
  const newPostBtn = document.getElementById("newPostBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginForm = document.getElementById("loginForm");
  const userNameDisplay = document.getElementById("userNameDisplay");

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
          loginForm.style.display = "none";
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
        loginForm.style.display = "block";
        userNameDisplay.style.display = "none";
      });
  } else {
    newPostBtn.style.display = "none";
    logoutBtn.style.display = "none";
    loginForm.style.display = "block";
    userNameDisplay.style.display = "none";
  }
}

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
        checkLogin();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

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
        blogForm.style.display = "none";
        checkLogin();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

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
        loadBlogs();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function loadBlogs() {
  if (loading) return;
  loading = true;

  fetch(`${API_URL}/blogs?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        renderBlogs(data.data);
        page++;
        loading = false;
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      loading = false;
    });
}

function renderBlogs(blogs) {
  const blogContainer = document.getElementById("blogs");

  blogs.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = "blog-post";

    const titleElement = document.createElement("h3");
    titleElement.textContent = blog.title;

    const contentElement = document.createElement("p");
    contentElement.textContent = blog.content.replace(/<[^>]*>/g, "");

    const authorElement = document.createElement("p");
    authorElement.innerText = blog.userId.name;

    blogElement.appendChild(titleElement);
    blogElement.appendChild(contentElement);
    blogElement.appendChild(authorElement);

    blogContainer.appendChild(blogElement);
  });
}

function toggleBlogForm() {
  const blogForm = document.getElementById("blogForm");
  if (blogForm.style.display === "none" || blogForm.style.display === "") {
    blogForm.style.display = "block";
  } else {
    blogForm.style.display = "none";
  }
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadBlogs();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  init();
  document
    .getElementById("newPostBtn")
    .addEventListener("click", toggleBlogForm);
});
