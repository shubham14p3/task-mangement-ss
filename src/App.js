import React, { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar, Container } from "@mui/material";
import HomePage from "./components/HomePage";
import CreateTaskPage from "./components/CreateTaskPage";
import ErrorPage from "./components/ErrorPage";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleCreateTask = () => {
    setIsCreating(true);
    navigate("/create-task"); // Redirect to the create task page
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    navigate("/create-task"); // Redirect to the create task page
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleMarkAsComplete = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: true };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleSaveTask = (task) => {
    if (isCreating) {
      const newTask = { ...task, id: Date.now(), completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setIsCreating(false);
      navigate("/"); // Redirect to the home page
    } else if (isEditing) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === task.id) {
          return { ...task };
        }
        return t;
      });
      setTasks(updatedTasks);
      setIsEditing(false);
      navigate("/"); // Redirect to the home page
    }
    setCurrentTask({});
  };

  const handleCancel = () => {
    setCurrentTask({});
    setIsCreating(false);
    setIsEditing(false);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Button onClick={handleCreateTask} color="inherit">
            Create Task
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route
            path="/"
            element={
              isCreating || isEditing ? (
                <CreateTaskPage
                  handleSaveTask={handleSaveTask}
                  handleCancel={handleCancel}
                />
              ) : (
                <HomePage
                  tasks={tasks}
                  handleCreateTask={handleCreateTask}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={handleDeleteTask}
                  handleMarkAsComplete={handleMarkAsComplete}
                />
              )
            }
          />
          <Route
            path="/create-task"
            element={
              <CreateTaskPage
                handleSaveTask={handleSaveTask}
                handleCancel={handleCancel}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
