import React, { useState } from 'react';

import "./App.css";


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const enterEditMode = (id, text) => {
    setEditMode(id);
    setEditedTodo(text);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodo } : todo
      )
    );
    setEditMode(null);
  };

  return (
    <div className="todo-app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
        <button className="delete-all-btn" onClick={deleteAllTodos}>
          Delete All
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editMode === todo.id ? (
              <input
                type="text"
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
            ) : (
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
            )}
            {editMode === todo.id ? (
              <button className="update-btn" onClick={() => updateTodo(todo.id)}>
                Update
              </button>
            ) : (
              <>
                <button className="edit-btn" onClick={() => enterEditMode(todo.id, todo.text)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
