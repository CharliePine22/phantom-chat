'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";
import { Arsenal } from 'next/font/google';

import MessageBoxAvatar from "@/app/components/MessageBoxAvatar";
import ImageModal from "./ImageModal";

const aresenal = Arsenal({subsets:['latin'], weight:'700'})

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data, 
  isLast
}) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);


  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-2', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col ', isOwn ? 'items-end' : 'ml-[14px]');
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'text-black' : 'text-white', 
    data.image ? 'rounded-md p-0' : 'rounded-full pb-1 px-3'
  );

  return ( 
    <div className={container + ` persona-text-box ${isOwn ? 'message-right' : 'message-left'}`}>
    {!isOwn && <div className={avatar}>
        <MessageBoxAvatar user={data.sender} />
      </div>}
      <div className={body}>
        <div className="flex items-center gap-1">
         {/* Only show names in group chat */}
          {/* <div className="text-sm text-gray-500">
            {data.sender.name}
          </div> */}
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
          {data.image ? (
            <Image
              alt="Image"
              height="150"
              width="150"
              onClick={() => setImageModalOpen(true)} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div className={aresenal.className}>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
   );
}
 
export default MessageBox;
