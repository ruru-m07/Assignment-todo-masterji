import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import TodoManager from "./lib/TodoManager";

const todoManager = new TodoManager();

function App() {
  const [todos, setTodos] = useState(todoManager.getTodos());
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      const updatedTodos = todoManager.addTodo(newTodo);
      setTodos(updatedTodos);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todoManager.deleteTodo(index);
    setTodos(updatedTodos);
  };

  const handleToggleTodoDone = (index: number) => {
    const updatedTodos = todoManager.toggleTodoDone(index);
    setTodos(updatedTodos);
  };

  const handleUpdateTodoText = (index: number, newText: string) => {
    const updatedTodos = todoManager.updateTodoText(index, newText);
    setTodos(updatedTodos);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <header className="my-5">
        <h1 className="text-2xl font-bold">
          Todo App - Assignment - chai aur code ☕{" "}
        </h1>
      </header>
      <div className="space-y-5 ">
        <form onSubmit={handleAddTodo} className="flex gap-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new task"
            className="w-full"
          />
          <Button type="submit">Add</Button>
        </form>
        {todos.length > 0 ? (
          <Card className="p-4 grid grid-cols-3 gap-3">
            {todos.map((todo, index) => (
              <Card key={index} className="p-3 space-y-3">
                <Input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleUpdateTodoText(index, e.target.value)}
                  className={todo.isDone ? "line-through" : ""}
                  disabled={todo.isDone}
                />
                <div className="space-x-4">
                  <Button onClick={() => handleToggleTodoDone(index)}>
                    {todo.isDone ? "Undo" : "Mark as Done"}
                  </Button>
                  <Button
                    onClick={() => handleDeleteTodo(index)}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </Card>
        ) : (
          <div className="text-muted-foreground mt-4">
            No todos yet! Add a new task using the input field above.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
