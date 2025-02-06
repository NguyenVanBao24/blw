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
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('https://bup-be.vercel.app/api/auth-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      const data = await response.json();
      console.log('Đăng nhập thành công:', data.status);
      if (data.status == 2000) {
        setUserLogIn(phone);
        router.push('/');
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
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
