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
  user: any;
}

const UserList: React.FC<UserListProps> = ({ items, user }) => {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const incomingFriendRequests = user.friendRequests;
  const friendListIds = user.friendsList;
  const userFriendsList = items.filter((item) =>
    friendListIds.includes(item.id)
  );

  const friendRequestIds = items?.filter((item) => {
    return incomingFriendRequests.includes(item.id);
  });

  const [friendRequests, setFriendRequests] = useState(friendRequestIds);
  const [friendsList, setFriendsList] = useState(userFriendsList);

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
         absolute
         right-[20px]
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
         absolute
         right-[70px]
         top-[22px]
         '
          onClick={() => setRequestModalOpen(true)}
        >
          <IoIosNotifications />
          <div className='flex justify-center items-center h-[20px] w-[20px] text-center bg-red absolute -top-[13px] -right-[7px] bg-[#8B0000] text-white font-black'>
            <span className='text-[.9rem]'>{friendRequests.length}</span>
          </div>
        </div>
        <div className='flex justify-between flex-wrap'>
          {userFriendsList.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
