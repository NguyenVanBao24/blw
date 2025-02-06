'use client';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatKey } from '@/contrants';

export default function UseInformation() {
  const router = useRouter();

  const { isLoggedIn, phone } = useAppContext();
  const [open, setOpen] = useState(true);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bup-be.vercel.app/api/find-salary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //   body: JSON.stringify({ phone }),
          body: JSON.stringify({ name: 'nguyễn văn a' }),
        });

        if (!response.ok) {
          throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setEmployee(data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, [phone]);

  const handleClose = () => setOpen(true);
  const handleLogin = () => {
    setOpen(false);
    router.push('/login');
  };

  return isLoggedIn ? (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}
    >
      <Table>
        <TableBody>
          {Object.entries(employee).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{formatKey(key)}</TableCell>
              <TableCell>{String(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
        >
          Bạn phải đăng nhập
        </Typography>
        <Typography
          id='modal-modal-description'
          sx={{ mt: 2 }}
        >
          Nhấp đăng nhập để tiếp tục
          {'  '}{' '}
          <Button
            size='small'
            variant='contained'
            onClick={handleLogin}
          >
            Đi đăng nhập
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
