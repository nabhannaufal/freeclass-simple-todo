// Constants
const listElement = document.getElementById("list");
const inputField = document.getElementById("input-todo");
const itemsLeftElement = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");

let todos = [];

// Functions
// -- ID Generation
function generateUniqueId() {
  return crypto.randomUUID();
}

// -- Create Todo element
function createTodoElement(todo) {
  const listItem = document.createElement("div");
  listItem.classList.add("list");

  const checkBox = document.createElement("button");
  checkBox.type = "button";
  checkBox.classList.add("checkBox");
  if (todo.checked) {
    checkBox.classList.add("checked");
  }
  checkBox.addEventListener("click", () => toggleChecked(todo.id));

  const listText = document.createElement("div");
  listText.classList.add("list-text");
  if (todo.checked) {
    listText.classList.add("completed");
  }
  listText.textContent = todo.text;
  listText.addEventListener("click", () => editTodo(todo.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  listItem.appendChild(checkBox);
  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

// -- Rendering Todo Items
function renderTodo() {
  listElement.innerHTML = ""; // Clear the list container
  todos.forEach((todo) => {
    const listItem = createTodoElement(todo);
    listElement.appendChild(listItem);
  });

  updateItemsLeft();
}

// -- Create Todo Item
function addTodo(event) {
  event.preventDefault();
  const text = inputField.value.trim();
  if (text) {
    todos.push({ text, checked: false, id: generateUniqueId() });
    inputField.value = "";
    renderTodo();
  }
}

// -- Delete Todo Item
function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodo();
}

// -- Toggle Checked State
function toggleChecked(todoId) {
  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, checked: !todo.checked } : todo));
  renderTodo();
}

// -- Clear Completed
function clearCompleted() {
  todos = todos.filter((todo) => !todo.checked);
  renderTodo();
}

// -- Edit Todo Item
function editTodo(todoId) {
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  const todo = todos[todoIndex];
  const listItem = listElement.children[todoIndex];
  const textElement = listItem.querySelector(".list-text");

  const input = document.createElement("input");
  input.classList.add("edit-input");
  input.value = todo.text;

  textElement.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    todo.text = input.value;
    renderTodo();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      input.blur();
    }
  });
}

// -- Update items left counter
function updateItemsLeft() {
  itemsLeftElement.textContent = `${todos.filter((todo) => !todo.checked).length} items left`;
}

//Event Listener
document.querySelector("form").addEventListener("submit", addTodo);
clearBtn.addEventListener("click", clearCompleted);

// Initial Rendering
renderTodo();
