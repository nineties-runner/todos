class Item {
  constructor(
    title,
    desc,
    date = new Date().toLocaleString(),
    isChecked = false,
    isDone = false,
    isDeleted = false
  ) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.isChecked = isChecked;
    this.isDone = isDone;
    this.isDeleted = isDeleted;
  }
}

const titleInput = document.querySelector(".text-add-title");
const descInput = document.querySelector(".text-add-desc");
const searchInput = document.querySelector(".text-search");
const dropdown = document.querySelector(".dropdown");
const buttonAdd = document.querySelector(".button-add");
const buttonRemove = document.querySelector(".button-remove");
const itemsContainer = document.querySelector(".items");

document.addEventListener(`DOMContentLoaded`, () => {
  if (localStorage.todos !== undefined) {
    todos = JSON.parse(localStorage.todos);
  } else todos = [];
  updateItems();
});

buttonAdd.addEventListener("click", () => {
  todos.push(new Item(titleInput.value, descInput.value));
  syncLocalStorage();
  updateItems();
});

buttonRemove.addEventListener("click", () => {
  indexesToRemove = [];
  todos.map((todo) => {
    todo.isChecked == true ? (todo.isDeleted = true) : null;
    todo.isChecked = false;
  });
  syncLocalStorage();
  updateItems();
});

searchInput.addEventListener("change", () => {
  updateItems();
});

dropdown.addEventListener("change", () => {
  updateItems();
});

function updateItems() {
  itemsContainer.innerHTML = "";
  todos.forEach((todo, index) => renderAndAppend(todo, index));
}

function renderAndAppend(todo, index) {
  if (
    (dropdown.value == "all"
      ? todo.isDeleted == false
      : dropdown.value == "done"
      ? todo.isDone == true && todo.isDeleted == false
      : dropdown.value == "selected"
      ? todo.isChecked == true
      : todo.isDeleted == true) &&
    todo.title.includes(`${searchInput.value}`)
  ) {
    const item = document.createElement("div");
    const checkbox = document.createElement("input");
    const title = document.createElement("input");
    const desc = document.createElement("input");
    const date = document.createElement("a");
    const done = document.createElement("input");
    item.classList.add("item");
    item.id = `${index}`;
    checkbox.type = "checkbox";
    checkbox.checked = todo.isChecked;
    title.value = todo.title;
    desc.value = todo.desc;
    date.innerText = todo.date;
    done.type = "checkbox";
    done.checked = todo.isDone;
    item.appendChild(checkbox);
    item.appendChild(title);
    item.appendChild(desc);
    item.appendChild(done);
    item.appendChild(document.createElement("br"));
    item.appendChild(date);
    itemsContainer.appendChild(item);
    title.addEventListener("change", () => {
      todo.title = title.value;
      syncLocalStorage();
    });
    desc.addEventListener("change", () => {
      todo.desc = desc.value;
      syncLocalStorage();
    });
    checkbox.addEventListener("change", () => {
      todo.isChecked = checkbox.checked;
      syncLocalStorage();
    });
    done.addEventListener("change", () => {
      todo.isDone = done.checked;
      syncLocalStorage();
    });
  }
}

function syncLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
