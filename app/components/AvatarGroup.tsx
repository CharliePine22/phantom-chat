'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: '-top-[6px] left-0 w-full h-[40px]',
    1: 'bottom-0 w-1/2',
    2: 'bottom-0 right-0 w-1/2',
  };

  return (
    <div className='group-avatar-wrapper bg-white absolute h-24 w-24 left-[-20px]'>
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            overflow-hidden
            h-[35px]
            w-[35px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            fill
            src={user?.image || '/images/placeholder.jpg'}
            alt='Avatar'
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
