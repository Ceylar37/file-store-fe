import { PopupContext } from '@lib/Popup/PopupProvider';
import classNames from 'classnames';
import React, { FC, ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';

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

  const root = useContext(PopupContext);

  if (!root?.current && isOpen)
    throw new Error('Using popup without PopupProvider');

  if (!root?.current) {
    return null;
  }

  const popup = (
    <div
      className={classNames(
        'absolute top-0 left-0 z-50 w-screen h-screen bg-black/70 items-center justify-center',
        {
          flex: isOpen,
          hidden: !isOpen,
        }
      )}
    >
      <span className='absolute top-5 right-5 text-xl font-extrabold sm:hidden cursor-pointer'>
        x
      </span>
      <div
        className='w-full h-full bg-white opacity-100 md:w-max md:h-max'
        ref={ref}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(popup, root?.current);
};

export default Popup;
