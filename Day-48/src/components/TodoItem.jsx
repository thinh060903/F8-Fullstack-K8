import React from "react";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <input type="text" value={todo.text} readOnly />
      <button onClick={() => alert("Chỉnh sửa chưa triển khai")}>Sửa</button>
      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
