import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { getApiKey } from "./services/apiServices";

const App = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const key = await getApiKey("thinh060903@gmail.com");
        setApiKey(key);
      } catch (error) {
        console.error("Failed to fetch API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  if (!apiKey) return <div>Loading API Key...</div>;

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoForm apiKey={apiKey} />
      <TodoList apiKey={apiKey} />
    </div>
  );
};

export default App;
