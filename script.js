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
  `;
  todoList.appendChild(li);

  li.querySelector("input").addEventListener("change", toggleComplete);
  li.querySelector(".delete").addEventListener("click", deleteTodo);
}

function toggleComplete(event) {
  event.target.parentElement.classList.toggle("completed");
}

function deleteTodo(event) {
  event.target.parentElement.remove();
}
