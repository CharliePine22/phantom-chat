'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { FullMessageType } from '@/app/types';
import { Arsenal } from 'next/font/google';

import MessageBoxAvatar from '@/app/components/MessageBoxAvatar';
import ImageModal from './ImageModal';

const aresenal = Arsenal({ subsets: ['latin'], weight: '700' });

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  setCoords: (
    coords:
      | {
          bottom: number;
          height: number;
          left: number;
          right: number;
          top: number;
          width: number;
          x: number;
          y: number;
        }
      | undefined
  ) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast, setCoords }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [skewAngle, setSkewAngle] = useState(0);
  const [boxPlacement, setBoxPlacement] = useState(0);
  // Ref for finding coordinates of div for connecting line
  const coordsRef = useRef<HTMLInputElement>(null);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex p-2', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx(
    'flex flex-col ',
    isOwn ? 'items-end' : 'justify-center relative z-10 w-full'
  );
  const message = clsx(
    'text-base w-fit overflow-hidden',
    isOwn ? 'text-black' : 'text-white',
    data.image ? 'rounded-md p-0' : 'px-4 py-1'
  );

  // Only want to change message box shapes when the conversation starts
  useEffect(() => {
    // Generate random number to determine skew to make them slightly different
    const randomNumber: number = Math.floor(Math.random() * (15 - 3 + 1) + 3); // Gemerate mumber between 3 and 12
    setSkewAngle(randomNumber * -1);
    setBoxPlacement(randomNumber);

    // Get coordinates of current message box position
    let coords = coordsRef?.current?.getBoundingClientRect();
    setCoords(coords);
  }, []);

  return (
    <div
      ref={coordsRef}
      className={
        container +
        ` persona-text-box ${isLast && 'last-message'} ${
          isOwn ? 'message-right' : 'message-left'
        }`
      }
      style={
        {
          '--skew-angle': skewAngle + 'deg',
          '--box-placement': boxPlacement + 'px',
        } as React.CSSProperties
      }
    >
      {!isOwn && (
        <div className={avatar}>
          <MessageBoxAvatar user={data.sender} />
        </div>
      )}
      <div className={body}>
        {/* <Image
          alt='chat bubble'
          className='p5-chat-bubble'
          src={'/images/p5-speech-bubble.png'}
          height={500}
          width={500}
        /> */}
        <div className='flex items-center absolute right-0 outline outline-2 outline-black p-1 bg-white whitespace-nowrap date-container'>
          {/* Only show names in group chat */}
          {/* <div className="text-sm text-gray-500">
            {data.sender.name}
          </div> */}
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt='Image'
              height={150}
              width={150}
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className='
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              '
            />
          ) : (
            <div className={aresenal.className}>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className='
            text-xs 
            font-light 
            text-gray-500
            pl-2
            '
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
