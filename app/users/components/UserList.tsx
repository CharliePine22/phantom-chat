'use client';

import { User } from '@prisma/client';
import { BsFillPersonPlusFill } from 'react-icons/bs';

import UserBox from './UserBox';

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
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
  console.log(items);
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
              text-[#c00202]
              py-4
              persona-menu-font
            '
          >
            Friends
          </div>
        </div>
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
        >
          <BsFillPersonPlusFill />
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
