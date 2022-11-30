import Popup from '@lib/Popup';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@store/reducers/auth/api';

interface FormFields {
  login: string;
  password: string;
}

const AuthForm = () => {
  const [login] = useLoginMutation();
  const [isOpen, setIsOpen] = useState(true);
  const close = useCallback(() => setIsOpen(false), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { login: 'test__login', password: 'password' },
  });

  const onSubmit = (data: FormFields) => {
    login(data);
  };

  return (
    <Popup isOpen={isOpen} close={close}>
      <form
        className='w-screen h-full md:w-96 rounded flex flex-col justify-center gap-4 p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Login'
          className={classNames('input', {
            'border-b-red-700': errors.login,
          })}
          {...register('login', { required: true })}
        />
        <input
          placeholder='Password'
          type='password'
          className={classNames('input', {
            'border-b-red-700': errors.login,
          })}
          {...register('password', { required: true })}
        />
        <button type='submit' className='button-primary'>
          Login
        </button>
        <button className='button-link'>Registration</button>
      </form>
    </Popup>
  );
};

export default AuthForm;
