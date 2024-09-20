import React, { useState } from "react";
import { addTodo } from "../services/apiServices";
import PropTypes from "prop-types";

const TodoForm = ({ apiKey }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addTodo(apiKey, newTodo);
      setNewTodo("");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Thêm một việc làm mới"
      />
      <button type="submit">Thêm mới</button>
    </form>
  );
};

TodoForm.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default TodoForm;
