'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  phone: string;
  name: string;
  employeeId: string;
  setUserLogIn: (phone: string) => void;
  setUserLogOut: () => void;
  setUserInfo: (name: string, employeeId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Khi component mount, lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    const storedName = localStorage.getItem('name');
    const storedEmployeeId = localStorage.getItem('employeeId');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedIsLoggedIn === 'true' && storedPhone) {
      setPhone(storedPhone);
      setIsLoggedIn(true);
      if (storedName && storedEmployeeId) {
        setName(storedName);
        setEmployeeId(storedEmployeeId);
      }
    }
  }, []);

  // Hàm cập nhật user khi đăng nhập
  const setUserLogIn = (phone: string) => {
    setPhone(phone);
    setIsLoggedIn(true);
    localStorage.setItem('phone', phone);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Hàm cập nhật thông tin user
  const setUserInfo = (name: string, employeeId: string) => {
    setName(name);
    setEmployeeId(employeeId);
    localStorage.setItem('name', name);
    localStorage.setItem('employeeId', employeeId);
  };

  // Hàm đăng xuất
  const setUserLogOut = () => {
    setPhone('');
    setIsLoggedIn(false);
    setName('');
    setEmployeeId('');
    localStorage.removeItem('phone');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('name');
    localStorage.removeItem('employeeId');
  };

  return <AppContext.Provider value={{ isLoggedIn, phone, setUserLogIn, setUserLogOut, setUserInfo, name, employeeId }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
