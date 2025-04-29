'use client';

import { Box, LinearProgress } from '@mui/material';
import Image from 'next/image';

const LoadingWithProgress = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="flex w-[400px] flex-col items-center justify-center p-8">
        <Image src="/logo.png" alt="Logo" width={70} height={70} />

        <Box sx={{ width: '100%', mt: 3 }}>
          <LinearProgress />
        </Box>
      </div>
    </div>
  );
};

export default LoadingWithProgress;
