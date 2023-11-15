'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Arsenal } from 'next/font/google';

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const aresenal = Arsenal({ subsets: ['latin'], weight: '700' });

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
}) => {
  const classes = `${aresenal.className}  
  text-black
  font-light
  py-2
  px-4
  bg-neutral-100 
  w-full 
  focus:outline-none`;

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className={classes}
      />
    </div>
  );
};

export default MessageInput;
