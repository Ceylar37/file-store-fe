import { useEffect, useRef, useState } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  callback: Function
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside: EventListenerOrEventListenerObject = e => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, true);
  }, []);

  return { ref };
};
