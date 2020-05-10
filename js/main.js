// localStorage.clear();

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listner
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
window.addEventListener("DOMContentLoaded", getTodos);

// Function
function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value.trim();
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodo(todoInput.value);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("complete-button");
  todoDiv.appendChild(completedBtn);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-button");
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //delete
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //checkmark
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed"); //toggle additional class
    if (todo.classList.contains("completed")) {
      todo.children[1].innerHTML = '<i class="fas fa-sync-alt"></i>';
    } else {
      todo.children[1].children[0].classList.add("rotate");
      todo.children[1].children[0].addEventListener("transitionend", () => {
        todo.children[1].innerHTML = '<i class="fas fa-check"></i>';
      });
    }

    updateLocalTodo(todo);
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push([todo, false]);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoText = todo.children[0].innerText;
  let todoIndex;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i][0] === todoText) {
      todoIndex = i;
      break;
    }
  }
  let isCompleted = todo.classList.contains("completed");
  todos.splice(todoIndex, 1, [todoText, isCompleted]);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(todo => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo[0];
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedBtn = document.createElement("button");
    if (todo[1]) {
      todoDiv.classList.add("completed");
      completedBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    } else {
      completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    }

    completedBtn.classList.add("complete-button");
    todoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-button");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoIndex;
  let todoText = todo.children[0].innerText;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i][0] === todoText) {
      todoIndex = i;
      break;
    }
  }
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
