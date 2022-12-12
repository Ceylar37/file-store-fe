import React, { FC, ReactNode, RefObject, createContext, useRef } from 'react';

export const PopupContext = createContext<RefObject<HTMLDivElement> | null>(
  null
);

const PopupProvider: FC<{ children: ReactNode }> = props => {
  const { children } = props;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className='flex flex-1 flex-col'>
      <PopupContext.Provider value={ref}>{children}</PopupContext.Provider>
    </div>
  );
};

export default PopupProvider;
