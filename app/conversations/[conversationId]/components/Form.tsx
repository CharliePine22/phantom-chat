'use client';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import useConversation from '@/app/hooks/useConversation';

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className='
        py-4 
        px-4 
        bg-black
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
        overflow-hidden
      '
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset='hmkgjadi'
      >
        <HiPhoto size={30} className='text-[#FF0401]' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Type a message'
        />
        <button
          type='submit'
          id='submit-button'
          className='
            rounded-full 
            p-0
            cursor-pointer 
            hover:text-sky-600 
            transition
            w-20
            relative
          '
        >
          <span className='fallback persona-IM text-white text-2xl'>Send</span>
          <div className='shape-wrapper'>
            <div className='shape red-fill jelly'>
              <svg
                x='0px'
                y='0px'
                viewBox='0 0 108.1 47'
                enableBackground='new 0 0 108.1 47'
              >
                <polygon
                  fill='#FF0000'
                  points='0,7.1 127.3,0 32.3,64 4.8,58.2'
                />
              </svg>
            </div>
            <div className='shape cyan-fill jelly'>
              <svg
                x='0px'
                y='0px'
                viewBox='0 0 108.1 47'
                enableBackground='new 0 0 108.1 47'
              >
                <polygon
                  fill='#00FFFF'
                  points='14,0.5 127.4,0 77.4,164 2.3,61.1 '
                />
              </svg>
            </div>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Form;
