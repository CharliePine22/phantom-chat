'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ 
  items, 
}) => {
  return ( 
    <aside 
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div 
            className="
              text-4xl 
              font-bold 
              text-white
              py-4
              persona-menu-font
            "
          >
            Friends
          </div>
        </div>
        <div className='flex justify-between flex-wrap'>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
        </div>
      </div>
    </aside>
  );
}
 
export default UserList;
