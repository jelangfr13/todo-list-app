import { createStore } from "redux";

export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};

export const editTodo = (id, updatedTodo) => {
  return {
    type: "EDIT_TODO",
    payload: { id, updatedTodo },
  };
};

export const toggleStatus = (id) => {
  return {
    type: "TOGGLE_STATUS",
    payload: id,
  };
};

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT_TODO":
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.updatedTodo.title,
            status: action.payload.updatedTodo.status,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    case "TOGGLE_STATUS":
      const toggledTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            status: todo.status === "active" ? "completed" : "active",
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: toggledTodos,
      };
    default:
      return state;
  }
};

const store = createStore(todoReducer);

export default store;
