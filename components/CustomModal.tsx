'use client';

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, text }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='custom-modal-title'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          id='custom-modal-title'
          variant='h6'
        >
          {text}
        </Typography>
        <Button
          onClick={onClose}
          sx={{ mt: 2 }}
          variant='contained'
          color='primary'
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
