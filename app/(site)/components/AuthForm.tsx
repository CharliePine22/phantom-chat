// 'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle, BsFacebook } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/app/components/inputs/Input';
import AuthSocialButton from './AuthSocialButton';
import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [showCallingCard, setShowCallingCard] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
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

  // delay time for calling card to appear
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }

          if (callback?.ok) {
            setShowCallingCard(true);
            delay(8000);
            router.push('/conversations');
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }

          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        console.log(callback);
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className='mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md home'
      style={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      {showCallingCard && (
        <div className='absolute top-0 left-0 z-50 h-full w-full overflow-hidden backdrop-blur-sm backdrop-brightness-[.3]'>
          <img
            className='absolute top-0 left-1/2 transform -translate-x-2/4 h-[290px] w-[375px] lg:w-[500px] lg:h-[320px] calling-card brightness-200'
            src='/images/calling-card.png'
          />
          <div className='spotlight1' />
          <div className='spotlight2' />
        </div>
      )}
      <div
        className='
        bg-white
          px-4
          py-6
          sm:py-8
          shadow
          rounded-lg
          sm:px-10
        '
        style={{
          background: 'rgba(255,255,255,.75)',
          backdropFilter: 'blur(3px)',
          boxShadow: '0 0 4px red',
        }}
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='name'
              label='Name'
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='Email'
            type='email'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='Password'
            type='password'
          />
          <div>
            <div className='mt-10' />
            <Button disabled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div
              className='
                absolute 
                inset-0 
                flex 
                items-center
              '
            >
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500'>Or continue with</span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            {/* <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            /> */}
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
            {/* <AuthSocialButton
              icon={BsFacebook}
              onClick={() => socialAction('facebook')}
            /> */}
          </div>
        </div>
        <div
          className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          '
        >
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
