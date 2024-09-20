import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { fetchTodos, deleteTodo } from "../services/apiServices";

const TodoList = ({ apiKey }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos(apiKey);
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setTodos([]);
      }
      setLoading(false);
    };

    getTodos();
  }, [apiKey]);

  const handleDelete = async (id) => {
    await deleteTodo(apiKey, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  if (loading) return <div>Loading todos...</div>;

  return (
    <div>
      {todos.length === 0 ? (
        <p>Không có todo</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default TodoList;
