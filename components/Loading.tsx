import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-slate-400 bg-opacity-50 flex justify-center items-center'>
      <CircularProgress />
    </div>
  );
};

export default Loading;
