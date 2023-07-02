import React from 'react';
import { TableRow, TableCell, Button, Typography } from '@mui/material';

const CustomTask = ({
  task,
  handleEditTask,
  handleDeleteTask,
  handleMarkAsComplete,
  tableRowStyle,
  tableDataStyle,
}) => {
  const { id, title, description, priority, completed } = task;

  const handleEdit = () => {
    handleEditTask(task);
  };

  const handleDelete = () => {
    handleDeleteTask(task);
  };

  const handleMarkComplete = () => {
    handleMarkAsComplete(task);
  };

  return (
    <TableRow style={tableRowStyle}>
      <TableCell style={tableDataStyle}>
        <Typography variant="body1">{title}</Typography>
      </TableCell>
      <TableCell style={tableDataStyle}>
        <Typography variant="body1">{description}</Typography>
      </TableCell>
      {priority && (
        <TableCell style={tableDataStyle}>
          <Typography variant="body1">{priority}</Typography>
        </TableCell>
      )}
      <TableCell style={tableDataStyle}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      </TableCell>
      <TableCell style={tableDataStyle}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
      <TableCell style={tableDataStyle}>
        <Button variant="contained" color="success" onClick={handleMarkComplete}>
          Completed
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CustomTask;
