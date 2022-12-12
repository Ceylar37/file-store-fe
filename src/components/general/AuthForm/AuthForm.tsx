import Popup from '@lib/Popup';
import classNames from 'classnames';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@store/reducers/auth/api';

import { HttpError } from '../../../types';

interface FormFields {
  login: string;
  password: string;
}

interface AuthFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: FC<AuthFormProps> = props => {
  const { setIsOpen, isOpen } = props;

  const [login] = useLoginMutation();
  const [error, setError] = useState('');
  const close = useCallback(() => setIsOpen(false), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { login: 'login2', password: 'password' },
  });

  const onSubmit = async (data: FormFields) => {
    const response = await login(data);
    if ('error' in response) {
      const error = response.error as HttpError;
      setError(error.message);
    }
    if ('data' in response) {
      const data = response.data;
      localStorage.setItem('token', data.token);
    }
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
