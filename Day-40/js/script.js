let currentPage = 1;
const postsContainer = document.getElementById("posts");
const loadingIndicator = document.getElementById("loading");

async function fetchPosts(page) {
  try {
    const response = await fetch(`https://whk27t-8080.csb.app/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function renderPosts(posts) {
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="author">${post.author}</div>
      <div class="content">${post.content}</div>
      <div class="timestamp">${post.timestamp}</div>
    `;
    postsContainer.appendChild(postElement);
  });
}

async function loadMorePosts() {
  loadingIndicator.style.display = "block";
  const posts = await fetchPosts(currentPage);
  renderPosts(posts);
  loadingIndicator.style.display = "none";
  currentPage++;
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMorePosts();
  }
}

loadMorePosts();

window.addEventListener("scroll", handleScroll);
