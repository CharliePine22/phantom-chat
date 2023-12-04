'use client';

import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { IoTrash } from 'react-icons/io5';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';

import UserAvatar from '@/app/components/UserAvatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ProfileDrawer from './ProfileDrawer';
import ConfirmModal from './ConfirmModal';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return conversation.users.map((user) => (
        <p key={user.id} className='mr-4'>
          {user.name}
        </p>
      ));
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  console.log(conversation.users);

  return (
    <>
      <ConfirmModal isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div
        className='
        bg-black
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-4 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        z-10
      '
      >
        <div className='flex gap-1.5 items-center'>
          <Link
            href='/conversations'
            className='
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          '
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            // <AvatarGroup users={conversation.users} />
            <span />
          ) : (
            <UserAvatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div className='text-white text-lg'>
              {conversation.name || otherUser.name}
            </div>
            <div className='text-sm font-light text-neutral-500 flex'>
              {statusText}
            </div>
          </div>
        </div>
        <div className='flex gap-10'>
          <div
            onClick={() => setDrawerOpen(true)}
            className='flex flex-col gap-3 items-center cursor-pointer hover:opacity-75'
          >
            <div className='w-10 h-10 bg-red-800 text-white rounded-md flex items-center justify-center'>
              <IoTrash size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
