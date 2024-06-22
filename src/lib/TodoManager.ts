interface Todo {
  text: string;
  isDone: boolean;
}

class TodoManager {
  private storageKey = "todos";

  getTodos(): Todo[] {
    const storedTodos = localStorage.getItem(this.storageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  addTodo(text: string): Todo[] {
    const todos = this.getTodos();
    todos.push({ text, isDone: false });
    this.saveTodos(todos);
    return todos;
  }

  deleteTodo(index: number): Todo[] {
    const todos = this.getTodos();
    todos.splice(index, 1);
    this.saveTodos(todos);
    return todos;
  }

  toggleTodoDone(index: number): Todo[] {
    const todos = this.getTodos();
    todos[index].isDone = !todos[index].isDone;
    this.saveTodos(todos);
    return todos;
  }

  updateTodoText(index: number, newText: string): Todo[] {
    const todos = this.getTodos();
    todos[index].text = newText;
    this.saveTodos(todos);
    return todos;
  }
}

export default TodoManager;
