import React from 'react';

const Loader = () => {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='w-10 h-10 border-black border-l-gray-300 border-4 rounded-full animate-spin' />
    </div>
  );
};

export default Loader;
