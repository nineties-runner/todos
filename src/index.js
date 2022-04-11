import { Todos } from './models/Todos';
import { UiState } from './models/UiState';
import { localStorageService } from './services/localStorage';
import { UI } from './views/ui';
import { renderItems } from './views/render';

import './css/style.css';

const todos = new Todos();
const uiState = new UiState();

const render = () => {
  renderItems(todos.getTodos(), uiState.getUiState());
};

// listeners
document.addEventListener('click', e => {
  if (e.target.classList.contains('select-button')) {
    const selectedId = e.target.id;
    uiState.toggleItemSelection(selectedId);

    render();
  }
});

UI.BUTTON_ADD.addEventListener('click', () => {
  const updatedTodos = todos.addTodo({ title: UI.TITLE_INPUT.value, desc: UI.DESCRIPTION_INPUT.value });
  localStorageService.setTodos(updatedTodos);

  render();
});

UI.BUTTON_REMOVE.addEventListener('click', () => {
  const selectedItems = uiState.getSelectedItems();

  selectedItems.forEach(id => {
    todos.removeTodo(id);
  });

  const updatedTodos = todos.getTodos();
  localStorageService.setTodos(updatedTodos);
  uiState.deselectItems();

  render();
});

UI.SEARCH_INPUT.addEventListener('change', e => {
  uiState.setSearch(e.target.value);

  render();
});

UI.DROPDOWN.addEventListener('change', e => {
  uiState.setFilter(e.target.value);

  render();
});

// Entry point
render();
