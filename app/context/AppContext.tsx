'use client'; // Nếu bạn dùng App Router

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Xác định kiểu dữ liệu cho context
type AppContextType = {
  isLoggedIn: boolean;
  phone: string;
  name: string;
  employeeId: string;
  setUserLogIn: (phone: string) => void;
  setUserLogOut: () => void;
  setUserInfo: (name: string, employeeId: string) => void;
};

// 2. Khởi tạo context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Tạo Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Hàm cập nhật user
  const setUserLogIn = (phone: string) => {
    setPhone(phone);
    setIsLoggedIn(true);
  };

  const setUserInfo = (name: string, employeeId: string) => {
    setName(name);
    setEmployeeId(employeeId);
  };

  const setUserLogOut = () => {
    setPhone('');
    setIsLoggedIn(false);
  };

  return <AppContext.Provider value={{ isLoggedIn, phone, setUserLogIn, setUserLogOut, setUserInfo, name, employeeId }}>{children}</AppContext.Provider>;
};

// 4. Hook để sử dụng context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
