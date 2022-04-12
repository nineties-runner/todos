import { localStorageService } from '../services/localStorage';

const getRandomId = () => (Math.random() * 1000000).toFixed();

export class Todos {
  constructor() {
    this.todos = localStorageService.getTodos();
  }

  addTodo = ({ title, desc, date = new Date().toISOString() }) => {
    const newTodo = {
      id: getRandomId().toString(),
      title,
      desc,
      date,
      isDone: false,
      isDeleted: false,
    };

    this.todos = [...this.todos, newTodo];

    return this.todos;
  };

  markAsDone = id => {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, isDone: true };
    });

    this.todos = updatedTodos;

    return this.todos;
  };

  removeTodo = id => {
    const updatedTodos = this.todos.map(todo => {
      return todo.id !== id ? todo : { ...todo, isDeleted: true };
    });

    this.todos = updatedTodos;

    return this.todos;
  };

  getTodos = () => {
    return this.todos;
  };
}
