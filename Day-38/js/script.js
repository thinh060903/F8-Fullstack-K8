document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://hfc2pr-8080.csb.app/todos";

  const todoList = document.querySelector(".todo-list");
  const completedList = document.querySelector(".completed-list");
  const addBtn = document.querySelector("#add-btn");
  const modal = document.querySelector("#modal");
  const editModal = document.querySelector("#edit-modal");
  const saveBtn = document.querySelector("#save-btn");
  const cancelBtn = document.querySelector("#cancel-btn");
  const editCancelBtn = document.querySelector("#edit-cancel-btn");
  const newTodoInput = document.querySelector("#new-todo");
  const editTodoInput = document.querySelector("#edit-todo");
  const completedBtn = document.querySelector("#completed-btn");
  const searchInput = document.querySelector("#search");
  let todosData = [];
  let editTodoId = null;

  addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  editCancelBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  saveBtn.addEventListener("click", () => {
    const newTodo = newTodoInput.value.trim();
    if (newTodo) {
      addTodoToApi(newTodo);
      newTodoInput.value = "";
      modal.style.display = "none";
    }
  });

  completedBtn.addEventListener("click", () => {
    fetchTodos();
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    highlightSearchTerm(searchTerm);
  });

  function fetchTodos() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((todos) => {
        todosData = todos;
        renderTodos(todos);
        updateCompletedCount(todos);
      });
  }

  function renderTodos(todos) {
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      const todoText = document.createElement("span");
      todoText.innerHTML = highlightText(todo.title, searchInput.value);
      todoItem.appendChild(todoText);

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
        deleteTodoFromApi(todo.id);
      });

      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editBtn.addEventListener("click", () => {
        editTodoId = todo.id;
        editTodoInput.value = todo.title;
        editModal.style.display = "flex";
      });

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      completeBtn.addEventListener("click", () => {
        toggleTodoComplete(todo.id, !todo.completed);
      });

      actions.appendChild(deleteBtn);
      actions.appendChild(editBtn);
      actions.appendChild(completeBtn);

      todoItem.appendChild(actions);

      if (todo.completed) {
        completedList.appendChild(todoItem);
      } else {
        todoList.appendChild(todoItem);
      }
    });
  }

  function addTodoToApi(todoTitle) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todoTitle, completed: false }),
    }).then(fetchTodos);
  }

  function deleteTodoFromApi(todoId) {
    fetch(`${apiUrl}/${todoId}`, {
      method: "DELETE",
    }).then(fetchTodos);
  }

  function editTodoInApi(todoId, newTitle) {
    fetch(`${apiUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    }).then(() => {
      editModal.style.display = "none";
      fetchTodos();
    });
  }

  function toggleTodoComplete(todoId, isCompleted) {
    fetch(`${apiUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: isCompleted }),
    }).then(fetchTodos);
  }

  function updateCompletedCount(todos) {
    const completedCount = todos.filter((todo) => todo.completed).length;
    completedBtn.innerHTML = `Completed Todos ${completedCount}`;
  }

  function highlightSearchTerm(searchTerm) {
    const todoItems = document.querySelectorAll(
      ".todo-list li span, .completed-list li span"
    );
    todoItems.forEach((item) => {
      const innerHTML = item.innerHTML.replace(
        /<mark class="highlight">|<\/mark>/g,
        ""
      );
      item.innerHTML = innerHTML;
      if (searchTerm && innerHTML.toLowerCase().includes(searchTerm)) {
        const regex = new RegExp(`(${searchTerm})`, "gi");
        item.innerHTML = innerHTML.replace(
          regex,
          '<mark class="highlight">$1</mark>'
        );
      }
    });
  }

  function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<mark class="highlight">$1</mark>');
  }

  editModal.querySelector("#update-btn").addEventListener("click", () => {
    const newTitle = editTodoInput.value.trim();
    if (newTitle) {
      editTodoInApi(editTodoId, newTitle);
    }
  });

  fetchTodos();
});
