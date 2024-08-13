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
  const loadingElement = document.getElementById("loading");
  let todosData = [];
  let editTodoId = null;

  const initialTodos = [
    { id: 1, title: "Minh's next task", completed: false },
    { id: 2, title: "Smatyx Todos App 1", completed: false },
    { id: 3, title: "Smatyx Todos App 2", completed: true },
    { id: 4, title: "Smatyx Todos App 3", completed: true },
  ];

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
    if (!newTodo) {
      alert("The input field is required!");
      return;
    }
    addTodoToApi(newTodo);
    newTodoInput.value = "";
    modal.style.display = "none";
  });

  completedBtn.addEventListener("click", () => {
    fetchTodos();
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    highlightSearchTerm(searchTerm);
  });

  function showLoading() {
    loadingElement.style.display = "block";
  }

  function hideLoading() {
    loadingElement.style.display = "none";
  }

  function fetchTodos() {
    showLoading();
    fetch(apiUrl)
      .then((response) => response.json())
      .then((todos) => {
        todosData = todos;
        renderTodos(todos);
        updateCompletedCount(todos);
        hideLoading();
      });
  }

  function renderTodos(todos) {
    todoList.innerHTML = "";
    completedList.innerHTML = "";

    todos
      .sort((a, b) => a.completed - b.completed)
      .filter((todo) => {
        const searchTerm = searchInput.value.toLowerCase();
        return todo.title.toLowerCase().includes(searchTerm);
      })
      .forEach((todo) => {
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
        completeBtn.innerHTML = todo.completed
          ? '<i class="fa-solid fa-check"></i>'
          : '<i class="fa-solid fa-circle"></i>';
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
    showLoading();
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todoTitle, completed: false }),
    }).then(() => {
      fetchTodos();
      hideLoading();
    });
  }

  function deleteTodoFromApi(todoId) {
    showLoading();
    fetch(`${apiUrl}/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      fetchTodos();
      hideLoading();
    });
  }

  function editTodoInApi(todoId, newTitle) {
    showLoading();
    fetch(`${apiUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    }).then(() => {
      editModal.style.display = "none";
      fetchTodos();
      hideLoading();
    });
  }

  function toggleTodoComplete(todoId, isCompleted) {
    showLoading();
    fetch(`${apiUrl}/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: isCompleted }),
    }).then(() => {
      fetchTodos();
      hideLoading();
    });
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
    if (!newTitle) {
      alert("The input field is required!");
      return;
    }
    editTodoInApi(editTodoId, newTitle);
  });

  fetchTodos();
});
