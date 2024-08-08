const todoForm = document.getElementById("todo-form");
const newTodoInput = document.getElementById("new-todo");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const todoText = newTodoInput.value.trim();

  if (todoText) {
    addTodo(todoText);
    newTodoInput.value = ""; // Clear the input field
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

  // Add event listener to checkbox and delete button
  li.querySelector("input").addEventListener("change", toggleComplete);
  li.querySelector(".delete").addEventListener("click", deleteTodo);
}

function toggleComplete(event) {
  event.target.parentElement.classList.toggle("completed");
}

function deleteTodo(event) {
  event.target.parentElement.remove();
}
