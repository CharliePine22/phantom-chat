import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../inputs/Input';
import Select from '../inputs/Select';

interface Props {
  friendModalOpen?: boolean;
  onClose: () => void;
}

const AddFriendModal: React.FC<Props> = ({ friendModalOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    console.log('TEST FRIEND REQUEST');
    // axios
    //   .post('/api/conversations', {
    //     ...data,
    //     isGroup: true,
    //   })
    //   .then(() => {
    //     router.refresh();
    //     onClose();
    //   })
    //   .catch(() => toast.error('Something went wrong!'))
    //   .finally(() => setIsLoading(false));
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
              <h2
                className='
                text-xl
                font-semibold 
                leading-7 
                text-white
              '
              >
                Start a group chat!
              </h2>
              <p className='mt-1 text-sm leading-6 text-white'>
                Create a chat with more than 2 people.
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
                <Select
                  disabled={isLoading}
                  label='Members'
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  onChange={(value) =>
                    setValue('members', value, {
                      shouldValidate: true,
                    })
                  }
                  value={members}
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddFriendModal;
