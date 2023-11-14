'use client';

import { User } from '@prisma/client';

import useActiveList from '../hooks/useActiveList';
import Image from 'next/image';

interface AvatarProps {
  user?: User;
}

const MessageBoxAvatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  // Grab sender image and split it up to get the image type
  const transformedTypes = ['png', 'webp'];
  const senderImage = user?.image?.split('.');
  // Transformed styles = PNG, WEBP, No Transform = JPEG, JPG
  const imgType = senderImage && senderImage[senderImage.length - 1];
  const transformedImage = transformedTypes.includes(imgType);
  const finalizedCSS = transformedImage
    ? 'message-avatar-wrapper w-full'
    : 'message-avatar-wrapper no-transform w-full';
  return (
    <div className={finalizedCSS}>
      <div
        className='
        relative 
        h-[65px]
        w-[75px]
        md:h-16
        md:w-[4.5rem]
        lg:h-[5rem]
        lg:w-[6.5rem]
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

export default MessageBoxAvatar;
