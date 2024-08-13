const todoForm = document.getElementById("todo-form");
const newTodoInput = document.getElementById("new-todo");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todoText = newTodoInput.value.trim();

  if (todoText) {
    addTodo(todoText);
    newTodoInput.value = "";
  }
});

function addTodo(text) {
  const li = document.createElement("li");
  li.innerHTML = `
  <input type="checkbox"> 
  <span>${text}</span>
  <button class="delete">Delete</button>
  <button class="edit">Edit</button>
  `;

  todoList.appendChild(li);

  li.querySelector(".delete").addEventListener("click", deleteTodo);
  li.querySelector("input").addEventListener("change", toggleComplete);
  li.querySelector(".edit").addEventListener("click", editTodo);
}

function deleteTodo(event) {
  event.target.parentElement.remove();
}

function toggleComplete(event) {
  event.target.parentElement.classList.toggle("completed");
}

function editTodo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const currentText = span.textContent;

  const newText = prompt("Edit todo:", currentText);

  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText;
  }
}
