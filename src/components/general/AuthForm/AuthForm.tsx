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

import { useAppDispatch } from '@store/hooks';
import { useLoginMutation } from '@store/reducers/auth/api';
import { fsApi } from '@store/reducers/fs/api';

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

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  const close = useCallback(() => setIsOpen(false), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { login: 'test__login', password: 'password' },
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
      dispatch(fsApi.util.invalidateTags(['myFiles']));
      close();
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
          disabled={isLoading}
        />
        <input
          placeholder='Password'
          type='password'
          className={classNames('input', {
            'border-b-red-700': errors.login,
          })}
          {...register('password', { required: true })}
          autoComplete='on'
          disabled={isLoading}
        />
        <button type='submit' className='button-primary' disabled={isLoading}>
          Login
        </button>
        <button className='button-link' disabled={isLoading}>
          Registration
        </button>
      </form>
    </Popup>
  );
};

export default AuthForm;
