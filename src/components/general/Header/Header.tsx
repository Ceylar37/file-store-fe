import AuthForm from '@general/AuthForm';
import React, { useRef, useState } from 'react';

import { useMyFilesQuery, useUploadFileMutation } from '@store/reducers/fs/api';

const Header = () => {
  const { error, isLoading, refetch } = useMyFilesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const inpRef = useRef<HTMLInputElement>(null);
  const [upload] = useUploadFileMutation();

  return (
    <>
      <div className='w-screen h-max bg-slate-500 flex items-center justify-between px-10 md:px-20 py-2.5 md:py-5'>
        <h1 className='text-white font-bold text-xl w-max'>File Store</h1>
        {!isLoading && error ? (
          <button className='button-primary' onClick={() => setIsOpen(true)}>
            Login
          </button>
        ) : (
          <div className='flex gap-2.5'>
            <button
              className='button-primary'
              onClick={() => {
                inpRef.current?.click();
              }}
            >
              Upload file
            </button>
            <input
              ref={inpRef}
              type='file'
              className='hidden'
              onChange={e => {
                if (!e.target.files || !e.target.files[0]) return;
                console.log(e.target.files[0]);
                debugger;
                const formData = new FormData();

                formData.append('name', e.target.files[0].name);
                formData.append('file', e.target.files[0]);

                upload(formData);
              }}
            />
            <button
              className='button-primary'
              onClick={() => {
                localStorage.removeItem('token');
                refetch();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <AuthForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Header;
