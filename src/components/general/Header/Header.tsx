import AuthForm from '@general/AuthForm';
import React, { useState } from 'react';

import { useMyFilesQuery } from '@store/reducers/fs/api';

const Header = () => {
  const { error, isLoading, refetch } = useMyFilesQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='w-screen h-max bg-slate-500 flex items-center justify-between px-10 md:px-20 py-2.5 md:py-5'>
        <h1 className='text-white font-bold text-xl w-max'>File Store</h1>
        {!isLoading && error ? (
          <button className='button-primary' onClick={() => setIsOpen(true)}>
            Login
          </button>
        ) : (
          <button
            className='button-primary'
            onClick={() => {
              localStorage.removeItem('token');
              refetch();
            }}
          >
            Logout
          </button>
        )}
      </div>
      <AuthForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Header;
