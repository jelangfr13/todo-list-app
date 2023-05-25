import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleStatus } from "./store";
import FA from "react-fontawesome";
import "./TodoList.css";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const defaultTodos = [
      { id: 1, title: "Membuang Sampah", status: "active" },
      { id: 2, title: "Menyapu Halaman Rumah", status: "active" },
      { id: 3, title: "Menyiram Tanaman", status: "active" },
    ];
    defaultTodos.forEach((todo) => dispatch(addTodo(todo)));
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const todo = {
        id: new Date().getTime(),
        title: newTodo,
        status: "active",
      };
      dispatch(addTodo(todo));
      setNewTodo("");
    }
  };

  const handleEditTodo = (id, updatedTodo) => {
    dispatch(editTodo(id, updatedTodo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <div className="buttonAdd">
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => handleFilterStatus("all")}>All</button>
        <button onClick={() => handleFilterStatus("active")}>Active</button>
        <button onClick={() => handleFilterStatus("completed")}>
          Completed
        </button>
      </div>

      <h2>Filtered Todos ({filterStatus})</h2>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${
              todo.status === "completed" ? "completed" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={todo.status === "completed"}
              onChange={() => handleToggleStatus(todo.id)}
            />
            <span className="todo-title">
              {todo.status === "completed" ? (
                <del>{todo.title}</del>
              ) : (
                todo.title
              )}
            </span>
            <div className="todo-actions">
              <button
                className="edit"
                onClick={() => {
                  const updatedTodo = {
                    title: prompt("Enter new title", todo.title),
                    status: todo.status,
                  };
                  handleEditTodo(todo.id, updatedTodo);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                Delete
                <FA name="trash" size="3x" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
