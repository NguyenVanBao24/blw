'use client';

import React from 'react';
import { useAppContext } from '@/app/context/AppContext';

const Accept = () => {
  const { phone } = useAppContext();

  return phone == '0708034532' ? <div>Accept</div> : <div>Bạn không được cấp quyền truy cập</div>;
};

export default Accept;
