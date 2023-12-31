'use client';

import { User } from '@prisma/client';

import useActiveList from '../hooks/useActiveList';
import Image from 'next/image';

interface AvatarProps {
  user?: User;
}

const UserAvatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className='relative h-full'>
      <div
        className='
        relative 
        overflow-hidden
        h-[50px]
        w-[50px]
        md:h-14 
        md:w-14
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

export default UserAvatar;
