'use client';

import { User } from '@prisma/client';

import useActiveList from '../hooks/useActiveList';
import Image from 'next/image';

interface UserListAvatarProps {
  user?: User;
}

const UserListAvatar: React.FC<UserListAvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className='avatar-wrapper absolute h-full w-full'>
      <div
        className='
        relative 
        inline-block 
        overflow-hidden
        h-[90px]
        w-[95px]
        users-avatar-box
        left-[9px]
        '
      >
        <Image
          fill
          src={user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
        />
      </div>
      {isActive ? (
        <span
          className='
            absolute 
            block
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          '
        />
      ) : null}
    </div>
  );
};

export default UserListAvatar;
