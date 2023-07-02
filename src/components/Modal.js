import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

const CustomModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal open={true} onClose={onCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal" style={{ backgroundColor: 'yellow', padding: '20px' }}>
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
