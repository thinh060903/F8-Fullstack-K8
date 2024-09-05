const API_URL = "https://api-auth-two.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("blogId");

  if (blogId) {
    getBlogDetail(blogId);
  } else {
    alert("Không tìm thấy bài viết.");
  }
});

function getBlogDetail(blogId) {
  fetch(`${API_URL}/blogs/${blogId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        const blog = data.data;
        document.getElementById("blogTitle").textContent = blog.title;
        document.getElementById("blogContent").innerHTML = formatContent(
          blog.content
        );
        document.getElementById(
          "blogAuthor"
        ).textContent = `Tác giả: ${blog.userId.name}`;

        // Kiểm tra và hiển thị ngày đăng
        if (blog.date) {
          const formattedDate = new Date(blog.date).toLocaleDateString("vi-VN");
          document.getElementById(
            "blogDate"
          ).textContent = `Ngày đăng: ${formattedDate}`;
        } else {
          document.getElementById("blogDate").textContent =
            "Ngày đăng: Không xác định";
        }
      } else {
        alert("Không tìm thấy bài viết.");
      }
    })
    .catch((error) => console.error("Error:", error));
}
