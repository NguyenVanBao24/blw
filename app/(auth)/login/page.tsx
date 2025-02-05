'use client'; // Nếu dùng App Router

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setUserLogIn } = useAppContext();
  const router = useRouter();

  // Xử lý đăng nhập
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Đăng nhập với:', { phone, password });
    setUserLogIn('0708034532');
    router.push('/');
  };

  console.log(isLoggedIn, 'isLoggedIn');

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 400, margin: 'auto', mt: 5 }}
    >
      <Typography
        variant='h5'
        align='center'
        gutterBottom
      >
        Đăng Nhập
      </Typography>
      <Box
        component='form'
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label='Số điện thoại'
          type='phone'
          fullWidth
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label='Mật khẩu'
          type='password'
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
        >
          Đăng Nhập
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
