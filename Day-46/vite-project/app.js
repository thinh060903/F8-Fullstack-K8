import Navigo from "navigo";

const router = new Navigo("/", { hash: true });

const app = document.getElementById("content");

const homePage = `<h1>Trang Chủ</h1><p>Đây là nội dung trang chủ.</p>`;
const aboutPage = `<h1>Giới Thiệu</h1><p>Đây là nội dung trang giới thiệu.</p>`;
const productPage = `
  <h1>Danh sách Sản Phẩm</h1>
  <ul>
    <li><a href="/san-pham/1" data-route>Sản Phẩm 1</a></li>
    <li><a href="/san-pham/2" data-route>Sản Phẩm 2</a></li>
    <li><a href="/san-pham/3" data-route>Sản Phẩm 3</a></li>
  </ul>
`;

const productDetailPage = (params) => `
  <h1>Chi tiết sản phẩm: ${params.id}</h1>
  <button onclick="history.back()">Quay lại</button>
`;

router
  .on("/", () => {
    app.innerHTML = homePage;
  })
  .on("/gioi-thieu", () => {
    app.innerHTML = aboutPage;
  })
  .on("/san-pham", () => {
    app.innerHTML = productPage;
  })
  .on("/san-pham/:id", (params) => {
    app.innerHTML = productDetailPage(params);
  })
  .resolve();

document.addEventListener("click", (event) => {
  if (event.target.matches("a[data-route]")) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    router.navigate(href);
  }
});
