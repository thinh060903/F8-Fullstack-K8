document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".list");
  var draggedItem = null;
  var placeholder = document.createElement("div");
  placeholder.className = "placeholder";

  function handleDragStart(e) {
    draggedItem = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
    setTimeout(() => {
      this.style.display = "none";
      list.insertBefore(placeholder, this.nextSibling);
      placeholder.style.display = "block";
    }, 0);
  }

  function handleDragEnd() {
    setTimeout(() => {
      placeholder.style.display = "none";
      draggedItem.style.display = "block";
      list.removeChild(placeholder);
      updateOrder();
      draggedItem = null;
    }, 0);
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (e.target.className.includes("list-item")) {
      const bounding = e.target.getBoundingClientRect();
      const offset = bounding.y + bounding.height / 2;
      if (e.clientY - offset > 0) {
        list.insertBefore(placeholder, e.target.nextSibling);
      } else {
        list.insertBefore(placeholder, e.target);
      }
    }
  }

  function handleDrop() {
    if (draggedItem) {
      list.insertBefore(draggedItem, placeholder);
    }
  }

  function addDragAndDropEvents(item) {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);
  }

  const items = document.querySelectorAll(".list-item");
  items.forEach((item) => addDragAndDropEvents(item));

  function updateOrder() {
    const items = document.querySelectorAll(".list-item");
    var moduleIndex = 1;
    var lessonIndex = 1;

    items.forEach((item, index) => {
      if (item.classList.contains("active")) {
        item.textContent = `Module ${moduleIndex}: ${item.textContent
          .split(":")
          .pop()
          .trim()}`;
        moduleIndex++;
      } else {
        item.textContent = `Bài ${lessonIndex}: ${item.textContent
          .split(":")
          .pop()
          .trim()}`;
        lessonIndex++;
      }
    });
  }

  updateOrder();
});
