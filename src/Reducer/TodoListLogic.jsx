import React from "react";
import { v4 as uuidv4 } from "uuid";

const TodoListLogic = (currentTodos, action) => {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.inputValue,
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "delete": {
      const deletTodo = currentTodos.filter((t) => t.id !== action.payload.id);

      localStorage.setItem("todos", JSON.stringify(deletTodo));
      return deletTodo;
    }

    case "taggelCompleted": {
      const updateTodo = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateTodo));
      return updateTodo;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos"));
      return Array.isArray(storageTodos) ? storageTodos : [];
    }

    default: 
      throw Error("Unknown action " + action.type);
  }
  return [];
};

export default TodoListLogic;
