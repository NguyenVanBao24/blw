'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';

const Header = () => {
  const router = useRouter();
  const { isLoggedIn, setUserLogOut, phone } = useAppContext();

  const handleLogout = () => {
    console.log('first');
    setUserLogOut();
    router.push('/login');
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h5'
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          My App
        </Typography>
        {!isLoggedIn && (
          <Button
            color='inherit'
            onClick={() => router.push('/login')}
          >
            Đăng Nhập
          </Button>
        )}
        {isLoggedIn && (
          <>
            <Button
              color='inherit'
              onClick={() => router.push('/user')}
            >
              Ngày nghỉ
            </Button>
            <Button
              color='inherit'
              onClick={() => router.push('/send')}
            >
              Gửi yêu cầu
            </Button>
            <Button
              color='inherit'
              onClick={() => router.push('/list-send')}
            >
              Yêu cầu đã gửi
            </Button>
            {phone == '0708034532' && (
              <Button
                color='inherit'
                onClick={() => router.push('/admin')}
              >
                Admin
              </Button>
            )}
            <Button
              color='inherit'
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
