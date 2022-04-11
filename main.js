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
  localStorage.todos !== undefined
    ? (todos = JSON.parse(localStorage.todos))
    : (todos = []);
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
  todos.map((todo, index) => renderAndAppend(todo, index));
}

function syncLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
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
    const checkbox = document.createElement("button");
    const title = document.createElement("input");
    const desc = document.createElement("input");
    const date = document.createElement("div");
    const done = document.createElement("button");
    item.classList.add("item");
    item.id = `${index}`;
    checkbox.innerText = "•";
    todo.isChecked ? checkbox.classList.add("selected") : null;
    title.value = todo.title;
    title.classList.add("title-text");
    title.type = "text";
    desc.value = todo.desc;
    desc.classList.add("desc-text");
    desc.type = "text";
    date.innerText = todo.date;
    date.classList.add("date-text");
    done.innerText = "✓";
    done.checked = todo.isDone;
    todo.isDone ? item.classList.add("done") : null;
    item.appendChild(done);
    item.appendChild(title);
    item.appendChild(desc);
    item.appendChild(checkbox);
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
    checkbox.addEventListener("click", () => {
      todo.isChecked = todo.isChecked ? false : true;
      checkbox.classList.toggle("selected");
      syncLocalStorage();
    });
    done.addEventListener("click", () => {
      todo.isDone = todo.isDone ? false : true;
      item.classList.toggle("done");
      syncLocalStorage();
    });
  }
}
