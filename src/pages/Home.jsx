import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import Footer from "../components/Footer";
import { v4 as uuid } from "uuid";
const Home = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuid(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  }

  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo))
  }
  
  console.log(todos);

  return (
    <div className="bg-slate-600 min-h-screen text-white">
      <Navbar />
      <Todo
        addTodo={addTodo}
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        editTask={editTask}
      />
      <Footer />
    </div>
  );
};

export default Home;
