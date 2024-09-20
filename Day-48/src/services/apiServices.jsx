const API_URL = "https://api-todo-ebon.vercel.app/api/v1";

export const getApiKey = async (email) => {
  const response = await fetch(`${API_URL}/api-key?email=${email}`);
  if (!response.ok) {
    throw new Error("Failed to fetch API key");
  }
  const data = await response.json();
  return data.data.apiKey;
};

export const fetchTodos = async (apiKey) => {
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data = await response.json();
  return data.data;
};

export const addTodo = async (apiKey, todo) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ todo }),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
};

export const deleteTodo = async (apiKey, id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
