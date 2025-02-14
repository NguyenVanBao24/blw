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
import Loading from './Loading';
import { SalaryInfo, SalaryInfoRequest } from '@/types/api';
import { salaryInfo } from '@/services/user';

export default function UseInformation() {
  const router = useRouter();

  const { isLoggedIn, phone } = useAppContext();
  const [open, setOpen] = useState(true);
  const [employee, setEmployee] = useState<SalaryInfo | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(phone, 'phone');
      const requestData: SalaryInfoRequest = { phone };
      const response = await salaryInfo(requestData);

      setEmployee(response.data);

      setLoading(false);
    };

    fetchData();
  }, [phone]);
  if (loading) {
    return <Loading />;
  }
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
          {employee &&
            Object.entries(employee).map(([key, value]) => (
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
