import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import { useOutsideClick } from '@hooks/useOutsideClick';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

const Popup: FC<PopupProps> = props => {
  const { children, close, isOpen } = props;

  const { ref } = useOutsideClick<HTMLDivElement>(() => {
    close();
  });

  return (
    <div
      className={classNames(
        'absolute top-0 left-0 z-50 w-screen h-screen bg-black/70 items-center justify-center',
        { flex: isOpen, hidden: !isOpen }
      )}
    >
      <div
        className='w-full h-full bg-white opacity-100 md:w-max md:h-max'
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
