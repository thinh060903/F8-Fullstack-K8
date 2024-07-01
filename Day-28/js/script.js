document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.querySelector('.TodoForm');
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoValue = todoInput.value.trim();
        if (todoValue) {
            addTodo(todoValue);
            todoInput.value = '';
        } else {
            alert('Vui lòng nhập một nhiệm vụ!');
        }
    });

    function addTodo(todo) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const todoText = document.createElement('span');
        todoText.textContent = todo;

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(todoItem, todoText));

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(todoItem));

        todoItem.appendChild(todoText);
        todoItem.appendChild(editBtn);
        todoItem.appendChild(deleteBtn);

        todoList.appendChild(todoItem);
    }

    function editTask(todoItem, todoText) {
        const newTodo = prompt('Edit task', todoText.textContent);
        if (newTodo && newTodo.trim()) {
            todoText.textContent = newTodo.trim();
        } else if (!newTodo.trim()) {
            alert('Nội dung nhiệm vụ không được để trống!');
        }
    }

    function deleteTask(todoItem) {
        todoItem.remove();
    }
});
