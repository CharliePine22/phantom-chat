'use client';

import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

import useActiveList from '../hooks/useActiveList';
import Image from 'next/image';

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  const [randomColor, setRandomColor] = useState<string>();

  const colors = [
    '#4BEF05',
    '#2740B4',
    '#26CFFA',
    '#A858CB',
    '#616161',
    '#FF69B4',
    '#FFFF00',
  ];

  useEffect(() => {
    let selectedColor = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(selectedColor);
  }, [user]);

  return (
    <div className='avatar-wrapper absolute h-full w-full'>
      <div
        className='
        relative 
        inline-block 
        overflow-hidden
        h-[90px]
        w-[95px]
        friend-avatar-box
        left-[9px]
        '
        style={{ backgroundColor: randomColor }}
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

export default Avatar;
