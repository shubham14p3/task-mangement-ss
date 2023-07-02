import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, TextareaAutosize, Select, MenuItem, Button } from '@mui/material';
import Modal from './Modal';

const CreateTaskPage = ({ handleSaveTask, handleCancel }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });
  const [errors, setErrors] = useState({});
  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // For Chrome compatibility
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleGoHome = () => {
    if (unsavedChanges) {
      setShowModal(true);
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });

    if (e.target.value.length > 0) {
      setSaveDisabled(false); // Enable the save button
    } else {
      setSaveDisabled(true); // Disable the save button
    }
    setUnsavedChanges(true); // Set unsaved changes flag
  };

  const validateTask = () => {
    const { title, description } = task;
    let errors = {};

    if (!title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!description.trim()) {
      errors.description = 'Description is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateTask()) {
      handleSaveTask(task);
      setUnsavedChanges(false); // Reset unsaved changes flag after saving
    }
  };

  const handleCancelClick = () => {
    handleCancel();
    setUnsavedChanges(false); // Reset unsaved changes flag after canceling
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  return (
    <div className='main-container-createtask'>
      <div style={{ backgroundColor: '#17a2b8', padding: '10px', marginBottom: '20px', color: 'white' }}>
        <Typography variant="h5">Task Management System</Typography>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Task Title:</label>
        <br/>
        <TextField
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          maxLength={100}
          pattern="[a-zA-Z0-9\s]+"
          required
          style={{ width: '30%' }}
        />
      </div>
      {errors.title && <p>{errors.title}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>Task Description:</label>
        <br/>
        <TextareaAutosize
          name="description"
          value={task.description}
          onChange={handleInputChange}
          maxLength={500}
          rowsMin={2}
          required
          style={{ width: '30%' }}
        />
      </div>
      {errors.description && <p>{errors.description}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>Task Priority:</label> <br/>
        <Select name="priority" value={task.priority} onChange={handleInputChange} style={{ width: '30%' }}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </div>
      <div className='create-tab-button'>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saveDisabled}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
      <Button onClick={handleCancelClick}>Home</Button>
      {showModal && (
        <Modal
          message="If you leave this page, all your changes will be lost. Do you want to continue?"
          onConfirm={handleConfirm}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
};

export default CreateTaskPage;
