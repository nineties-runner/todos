import { FILTERS } from '../constants';
import { UI } from './ui';

const FILTER_TO_HANDLER = {
  [FILTERS.ALL]: todos => todos,
  [FILTERS.DELETED]: todos => todos.filter(todo => todo.isDeleted),
  [FILTERS.DONE]: todos => todos.filter(todo => todo.isDone),
};

export const renderItems = (todos, uiState) => {
  const { search, selectedItems, selectedFilter } = uiState;
  const filter = FILTER_TO_HANDLER[selectedFilter];

  const filteredTodos = filter(todos);
  const searchedTodos = search
    ? filteredTodos.filter(todo => todo.title.includes(search) || todo.desc.includes(search))
    : filteredTodos;

  const todosTemplate = searchedTodos.map(todo => {
    const isSelected = selectedItems.includes(todo.id);

    return `
      <div class="item ${todo.isDone ? 'done' : ''}" >
        <button>✓</button> 
        <input type="text" class="title-text" value="${todo.title}" />\
        <input type="text" class="desc-text" value="${todo.desc}" />
        <button id="${todo.id}" class="select-button ${isSelected ? 'selected' : ''}">•</button>
        <div class="date-text">${todo.date}</div>
      </div>
    `;
  });

  UI.ITEMS_CONTAINER.innerHTML = todosTemplate.join('');
};
