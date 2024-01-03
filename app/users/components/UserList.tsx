'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';

import UserBox from './UserBox';
import FriendRequestModal from '@/app/components/modals/FriendRequestModal';
import AddFriendModal from '@/app/components/modals/AddFriendModal';

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const requests = [
    { name: 'Cj The Coolest Kid' },
    { name: 'Jessica' },
    { name: 'Yuna' },
  ];
  const [friendRequests, setFriendRequests] = useState(requests);
  // const addFriendship = async (userIdA: string, userIdB: string) => {
  //   await prisma.user.update({
  //     where: {id: userIdA},
  //     data: {friends: {connect: [{id: userIdB}]}},
  //   });
  //   await prisma.user.update({
  //     where: {id: userIdB},
  //     data: {friends: {connect: [{id: userIdA}]}},
  //   });
  // };

  // const removeFriendship = async (userIdA: string, userIdB: string) => {
  //   await prisma.user.update({
  //     where: {id: userIdA},
  //     data: {friends: {disconnect: [{id: userIdB}]}},
  //   });
  //   await prisma.user.update({
  //     where: {id: userIdB},
  //     data: {friends: {disconnect: [{id: userIdA}]}},
  //   });
  // }

  return (
    <aside
      className='
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-[25rem] 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      '
    >
      {/* Incoming Friend Requests Component */}
      {requestModalOpen && (
        <FriendRequestModal
          requestModalOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          requestsList={friendRequests}
          updateRequestList={(item) => setFriendRequests(item)}
        />
      )}

      {/* New Friend Input Component */}
      {addFriendOpen && (
        <AddFriendModal
          friendModalOpen={addFriendOpen}
          onClose={() => setAddFriendOpen(false)}
        />
      )}
      <div
        className='px-5 
        overflow-x-hidden
        h-full
        '
      >
        <div className='flex-col'>
          <div
            className='
              text-5xl 
              font-bold 
              text-white
              py-4
              persona-menu-font
            '
          >
            Friends
          </div>
        </div>
        {/* Add New Friend */}
        <div
          className='
         rounded-full 
         p-2 
         bg-gray-100 
         text-gray-600 
         cursor-pointer 
         hover:opacity-75 
         transition
         fixed
         right-[30px]
         top-[22px]'
          onClick={() => setAddFriendOpen(true)}
        >
          <BsFillPersonPlusFill />
        </div>

        {/* View Friend Requests */}
        <div
          className='
         rounded-full 
         p-2 
         bg-gray-100 
         text-gray-600 
         cursor-pointer 
         hover:opacity-75 
         transition
         fixed
         right-[85px]
         top-[22px]'
          onClick={() => setRequestModalOpen(true)}
        >
          <IoIosNotifications />
          <div className='flex justify-center items-center h-[20px] w-[20px] text-center bg-red absolute -top-[13px] -right-[7px] bg-[#8B0000] text-white font-black'>
            <span className='friend-name text-[.9rem]'>
              {friendRequests.length}
            </span>
          </div>
        </div>
        <div className='flex justify-between flex-wrap'>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
