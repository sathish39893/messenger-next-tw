'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn, useSession } from 'next-auth/react';
import Input from '../FormInputs/Input';
import Button from '../Button';
import AuthSocialButton from '../AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';
type Message = {
  type: MessageType;
  text: string;
};
type MessageType = 'success' | 'error' | 'warning';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    type: 'success',
    text: '',
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    setMessage({ type: 'success', text: '' });
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .catch(() =>
          setMessage({ type: 'error', text: 'Something went wrong' })
        )
        .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            setMessage({ type: 'error', text: 'Invalid credentials' });
          }

          if (response?.ok && !response.error) {
            setMessage({ type: 'success', text: 'Logged in' });
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((response) => {
        if (response?.error) {
          setMessage({ type: 'error', text: 'Invalid credentials' });
        }
        if (response?.ok && !response?.error) {
          setMessage({ type: 'success', text: 'Logged in' });
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label="Name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email address"
            id="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button type="submit" fullWidth disabled={isLoading}>
              {variant === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
          {message.text && (
            <div
              className={clsx(
                'mt-4 text-sm',
                message.type === 'error' && 'text-rose-600',
                message.type === 'success' && 'text-sky-500'
              )}
            >
              {message.text}
            </div>
          )}
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
