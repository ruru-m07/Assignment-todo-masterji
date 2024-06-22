// Interface for a single todo item
interface Todo {
  text: string; // Text description of the todo
  isDone: boolean; // Indicates whether the todo is completed
}

// TodoManager class manages CRUD operations for todos using localStorage
class TodoManager {
  private storageKey = "todos"; // Key for localStorage

  // Retrieves todos from localStorage or returns an empty array if none exist
  getTodos(): Todo[] {
    const storedTodos = localStorage.getItem(this.storageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  // Saves todos array to localStorage
  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  // Adds a new todo with specified text, sets isDone to false initially
  addTodo(text: string): Todo[] {
    const todos = this.getTodos();
    todos.push({ text, isDone: false });
    this.saveTodos(todos);
    return todos; // Returns updated todos array
  }

  // Deletes a todo at specified index
  deleteTodo(index: number): Todo[] {
    const todos = this.getTodos();
    todos.splice(index, 1);
    this.saveTodos(todos);
    return todos; // Returns updated todos array
  }

  // Toggles the isDone status of a todo at specified index
  toggleTodoDone(index: number): Todo[] {
    const todos = this.getTodos();
    todos[index].isDone = !todos[index].isDone;
    this.saveTodos(todos);
    return todos; // Returns updated todos array
  }

  // Updates the text of a todo at specified index
  updateTodoText(index: number, newText: string): Todo[] {
    const todos = this.getTodos();
    todos[index].text = newText;
    this.saveTodos(todos);
    return todos; // Returns updated todos array
  }
}

export default TodoManager; // Export TodoManager class
