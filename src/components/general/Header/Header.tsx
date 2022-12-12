import AuthForm from '@general/AuthForm';
import React, { useState } from 'react';

const Header = () => {
  // const { error, isLoading, refetch } = useMyFilesQuery();
  const [isOpen, setIsOpen] = useState(false);

  const crossOriginFetch = async () => {
    const response = await fetch('http://localhost:3000/api/hello');
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <div className='w-screen bg-slate-500 flex items-center justify-between px-10 md:px-20 py-2.5 md:py-5'>
        <h1 className='text-white font-bold text-xl w-max'>File Store</h1>
        {/*{!isLoading && error ? (*/}
        {/*  <button className='button-primary' onClick={() => setIsOpen(true)}>*/}
        {/*    Login*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <button*/}
        {/*    className='button-primary'*/}
        {/*    onClick={() => {*/}
        {/*      localStorage.removeItem('token');*/}
        {/*      refetch();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    Logout*/}
        {/*  </button>*/}
        {/*)}*/}
        <button onClick={crossOriginFetch} className='button-primary'>
          cross origin fetch
        </button>
      </div>
      <AuthForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Header;
