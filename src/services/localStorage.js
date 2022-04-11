const TODOS_STORAGE_KEY = 'todos';

class LocalStorage {
  setTodos = todos => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  };

  getTodos = () => {
    return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || [];
  };

  clearTodos = () => {
    localStorage.removeItem(TODOS_STORAGE_KEY);
  };
}
export const localStorageService = new LocalStorage();
