'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarGroup from "@/app/components/AvatarGroup";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ 
  data, 
  selected 
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    console.log('CLCIKED')
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email,
  [session.data?.user?.email]);
  
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation';
  }, [lastMessage]);

  const convertNumberToDayOfWeek = (date: number) => {
    switch(date){
      case 0: 
      return 'Su';
      case 1:
        return 'Mo';
      case 2:
        return 'Tu';
      case 3:
        return 'We';
      case 4:
        return 'Th';
      case 5:
        return 'Fr';
      case 6:
        return 'Sa';
    }
  }
  const personaMonth = data?.lastMessageAt.getMonth() + 1
  const personaDate = data?.lastMessageAt.getDate()
  const personaDay = convertNumberToDayOfWeek(data?.lastMessageAt.getDay())
  return ( 
    <div
      onClick={handleClick}
      className={clsx(`
      conversation-box
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        transition
        cursor-pointer
        `,
        // selected ? 'bg-neutral-800' : 'bg-neutral-950'
      )}
    >
      <div className='persona-box-date'>
        {data?.lastMessageAt && 
        <div>
          <span>{personaMonth} /</span>
          <span>{personaDate}</span>
          <span> {personaDay}</span>
          </div>
        }
      </div>
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <div className='conversation-box-wrapper'>
        <Avatar user={otherUser} />
        </div>
      )}
      <div className={`min-w-0 flex-1 ${!data.isGroup && "inner-persona-box"}`} >
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="
                  text-xs 
                  font-light
                  relative
                  top-[-10px]
                  right-[-7px]
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={clsx(`
              truncate 
              text-[.9rem]
              `,
              hasSeen ? 'text-gray-400' : 'text-white font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  );
}
 
export default ConversationBox;
