import Header from '@general/Header';
import React, { FC, ReactNode } from 'react';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <Header />
      {children}
    </div>
  );
};

export const getMainLayout: (page: ReactNode) => JSX.Element = page => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
