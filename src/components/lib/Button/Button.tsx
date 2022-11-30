import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'link';
}

const Button: FC<ButtonProps> = props => {
  const { children, className, variant = 'primary', ...rest } = props;

  switch (variant) {
    case 'link':
      return (
        <button
          className={`w-max h-max underline text-blue-700 py-1 hover:text-blue-900 transition-colors cursor-pointer ${className}`}
          {...rest}
        >
          {children}
        </button>
      );

    default:
      return (
        <button
          className={`bg-cornflowerblue px-3 py-1 rounded text-white w-max h-max hover:bg-dark-cornflowerblue transition-colors cursor-pointer ${className}`}
          {...rest}
        >
          {children}
        </button>
      );
  }
};

export default Button;
