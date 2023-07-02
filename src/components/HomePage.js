import React from "react";
import Task from "./Task";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const HomePage = ({
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleMarkAsComplete,
}) => {
  const openTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const tableHeadingStyle = {
    fontWeight: "bold",
  };

  const renderOpenTasks = () => {
    if (openTasks.length === 0) {
      return <Typography variant="body1">There are no open tasks to display.</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeadingStyle}>Title</TableCell>
              <TableCell style={tableHeadingStyle}>Description</TableCell>
              <TableCell style={tableHeadingStyle}>Priority</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
                handleMarkAsComplete={handleMarkAsComplete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderCompletedTasks = () => {
    if (completedTasks.length === 0) {
      return <Typography variant="body1">There are no completed tasks to display.</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={tableHeadingStyle}>Title</TableCell>
              <TableCell style={tableHeadingStyle}>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className='task-container'>
      <Typography variant="h4">OPEN TASKS :</Typography>
      {renderOpenTasks()}
<span className='task-container-break' ></span>
      <Typography variant="h4">COMPLETED TASKS :</Typography>
      {renderCompletedTasks()}
    </div>
  );
};

export default HomePage;
