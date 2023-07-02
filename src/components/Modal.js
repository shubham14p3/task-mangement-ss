import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

const CustomModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal open={true} onClose={onCancel}>
      <div className="modal">
        <div className="modal-content">
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <div className="modal-actions">
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={onCancel}>
              No
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
