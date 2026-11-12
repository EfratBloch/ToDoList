import React, { useEffect, useState } from 'react';
import service from './service.js';

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = todos.length;
  const done = todos.filter(todo => todo.isComplete).length;
  const remaining = total - done;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
    setLoading(false);
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;//don't add an empty task
    await service.addTask(newTodo.trim());
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="todoapp">
      <header className="header">
        <h1>My Tasks</h1>
        <p className="subtitle">Well, let's take on the day ☀️</p>
      </header>

      <form className="add-form" onSubmit={createTodo}>
        <input
          className="new-todo"
          placeholder="What do you want to do?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-button" type="submit" disabled={!newTodo.trim()}>
          + Add
        </button>
      </form>

      <section className="stats">
        <div className="stat stat-total">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat stat-remaining">
          <span className="stat-number">{remaining}</span>
          <span className="stat-label">To do</span>
        </div>
        <div className="stat stat-done">
          <span className="stat-number">{done}</span>
          <span className="stat-label">Done</span>
        </div>
      </section>

      <div className="progress" aria-label={`${progress}% done`}>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {loading && <p className="message">Loading tasks… (the server may take up to a minute to wake up)</p>}
      {!loading && total === 0 && <p className="message">No tasks yet. Add your first one! 🌱</p>}

      <ul className="todo-list">
        {todos.map(todo => {
          return (
            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
              <input
                className="toggle"
                type="checkbox"
                checked={!!todo.isComplete}
                onChange={(e) => updateCompleted(todo, e.target.checked)}
                aria-label="Mark as done"
              />
              <span className="todo-name" dir="auto">{todo.name}</span>
              <button className="destroy" onClick={() => deleteTodo(todo.id)} aria-label="Delete task" title="Delete">
                <TrashIcon />
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
