'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { LoginRequest } from '@/types/api';
import { login } from '@/services/auth';

const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, setUserLogIn, setUserInfo } = useAppContext();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const requestData: LoginRequest = { phone, password };
    const response = await login(requestData);

    if (response.success) {
      setUserLogIn(phone);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserInfo(response.data[0][1], response.data[0][0]);
      } else {
        console.error('Dữ liệu trả về không đúng định dạng');
        return;
      }
      router.push('/');
    } else {
      console.error('Lỗi từ API:', response.message);
    }

    setLoading(false);
  };

  console.log(isLoggedIn, 'isLoggedIn');

  if (loading) {
    return <Loading />;
  }

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
