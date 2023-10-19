import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

import UserListAvatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/modals/LoadingModal';

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className='
          bg-transparent
          relative 
          flex 
          items-center
          flex-col
          space-x-3 
          bg-black
          p-3 
          rounded-lg
          transition
          cursor-pointer
          my-6
          persona-avatar-box
        '
      >
        <UserListAvatar user={data} />
        <div className='min-w-0 flex-1' style={{ marginLeft: 0 }}>
          <div className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            <div className='absolute bottom-[-32px] left-[8px] flex justify-center items-center mb-1 w-full'>
              <p className='text-2xl font-medium text-white whitespace-nowrap friend-name'>
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
