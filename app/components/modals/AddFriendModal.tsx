import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../inputs/Input';
import Button from '../Button';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface Props {
  friendModalOpen?: boolean;
  onClose: () => void;
}

const AddFriendModal: React.FC<Props> = ({ friendModalOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post('/api/friends', {
        ...data,
      })
      .then(() => {
        router.refresh();
        toast.success('Friend request sent!');
        onClose();
      })
      .catch((error) => {
        toast.error(error.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={friendModalOpen} onClose={onClose}>
      <div className='request-wrapper'>
        <h2 className='conversation-box-name text-4xl text-center text-white'>
          Add a Friend
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <p className='mt-1 text-sm leading-6 text-white'>
                Type the name of the person you'd like to send a friend request
                to.
              </p>
              <div className='mt-8 flex flex-col gap-y-8 text-white'>
                <Input
                  disabled={isLoading}
                  label='Name'
                  id='name'
                  errors={errors}
                  required
                  register={register}
                />
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button
              disabled={isLoading}
              onClick={onClose}
              type='button'
              secondary
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddFriendModal;
