const API_URL = "https://api-auth-two.vercel.app";
let currentUser = null;
let page = 1;
let loading = false;

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  loadBlogs();

  document
    .getElementById("newPostBtn")
    .addEventListener("click", toggleBlogForm);
  document.getElementById("postBlogBtn").addEventListener("click", postBlog);
  document.getElementById("logoutBtn").addEventListener("click", logout);

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadBlogs();
    }
  });
});

function checkLogin() {
  const token = localStorage.getItem("accessToken");
  const newPostBtn = document.getElementById("newPostBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const loginSection = document.getElementById("loginSection");
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
          userNameDisplay.style.display = "block";
          userNameDisplay.textContent = `Xin chào, ${currentUser.name}!`;
          loginSection.style.display = "none";
        } else {
          handleLogoutUI();
        }
      })
      .catch((error) => {
        console.error(error);
        handleLogoutUI();
      });
  } else {
    handleLogoutUI();
  }
}

function handleLogoutUI() {
  const newPostBtn = document.getElementById("newPostBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const loginSection = document.getElementById("loginSection");
  const blogForm = document.getElementById("blogForm");

  newPostBtn.style.display = "none";
  logoutBtn.style.display = "none";
  userNameDisplay.style.display = "none";
  loginSection.style.display = "block";
  blogForm.style.display = "none";
}

function logout() {
  const token = localStorage.getItem("accessToken");

  fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("Đã đăng xuất");
        handleLogoutUI();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

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

function renderBlogs(blogs) {
  const blogContainer = document.getElementById("blogs");

  blogs.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = "blog-post";
    blogElement.innerHTML = "Nội dung blog";

    const titleElement = document.createElement("h3");
    titleElement.textContent = blog.title;
    titleElement.addEventListener("click", () => {
      window.location.href = `blogDetail.html?blogId=${blog._id}`;
    });

    const contentElement = document.createElement("p");
    contentElement.innerHTML = formatContent(blog.content);

    const authorElement = document.createElement("p");
    authorElement.textContent = `Tác giả: ${blog.userId.name}`;

    const dateElement = document.createElement("p");

    if (blog.createdAt) {
      const formattedDate = new Date(blog.createdAt).toLocaleDateString(
        "vi-VN",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      dateElement.textContent = `Ngày đăng: ${formattedDate}`;
    } else {
      dateElement.textContent = "Ngày đăng: Không xác định";
    }

    blogElement.appendChild(titleElement);
    blogElement.appendChild(contentElement);
    blogElement.appendChild(authorElement);
    blogElement.appendChild(dateElement);

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

function postBlog() {
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const date = document.getElementById("blogDate").value;
  const token = localStorage.getItem("accessToken");

  if (!title || !content || !date) {
    alert("Vui lòng điền đủ thông tin");
    return;
  }

  fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        alert("Đăng bài thành công");
        document.getElementById("blogTitle").value = "";
        document.getElementById("blogContent").value = "";
        document.getElementById("blogDate").value = "";
        loadBlogs();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formatContent(content) {
  content = content.replace(/\s+/g, " ");

  content = content.replace(/\n+/g, "\n");

  content = content.replace(
    /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    function (phone) {
      return `<a href="tel:${phone}">${phone}</a>`;
    }
  );

  content = content.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    function (email) {
      return `<a href="mailto:${email}">${email}</a>`;
    }
  );

  content = content.replace(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g,
    function (url, videoId) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
  );

  content = content.replace(
    /((https?:\/\/|www\.)[^\s]+)(?![^<]*>)/g,
    function (link) {
      return `<a href="${link}" target="_blank">${link}</a>`;
    }
  );

  content = content.replace(
    /((https?:\/\/|www\.)[^\s]+)(?!")/g,
    function (link) {
      return `<a href="${link}" target="_blank">${link}</a>`;
    }
  );

  return content;
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
