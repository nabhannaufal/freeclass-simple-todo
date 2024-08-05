let todos = [];

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.round(new Date().getTime()).toString(36).substring(2);
};

const renderTodo = () => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className = "list";
    div.innerHTML = `
            <div class="checkBox ${todo.checked ? "checked" : ""}" onclick="onCheck('${todo.id}')"></div>
            <i class="list-text ${todo.checked ? "completed" : ""}" onclick="editTodo('${todo.id}')">${todo.text}</i>
            <div class="delete" onclick="deleteTodo('${todo.id}')"></div>
        `;
    list.appendChild(div);
  });

  document.getElementById("items-left").innerHTML = `${todos.filter((todo) => !todo.checked).length} items left`;
};

const addTodo = (e) => {
  e.preventDefault();
  const inputField = document.getElementById("input-todo");

  const newTodo = {
    text: inputField.value,
    checked: false,
    id: generateUniqueId(),
  };

  todos.push(newTodo);
  inputField.value = "";
  renderTodo();
};

const deleteTodo = (todoId) => {
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodo();
};

const onCheck = (todoId) => {
  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      todo.checked = !todo.checked;
    }
    return todo;
  });
  renderTodo();
};

const clearCompleted = () => {
  todos = todos.filter((todo) => !todo.checked);
  renderTodo();
};

const clearBtn = document.getElementById("clear-completed");
clearBtn.onclick = clearCompleted;

const editTodo = (todoId) => {
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  const todo = todos[todoIndex];
  const list = document.getElementById("list");
  const todoDiv = list.children[todoIndex];

  const input = document.createElement("input");
  input.className = "edit-input";
  input.value = todo.text;
  input.onblur = () => {
    todo.text = input.value;
    renderTodo();
  };
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      todo.text = input.value;
      renderTodo();
    }
  };

  todoDiv.replaceChild(input, todoDiv.querySelector(".list-text"));
  input.focus();
};
