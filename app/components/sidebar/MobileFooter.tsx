'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';
import UserAvatar from '../UserAvatar';
import { User } from '@prisma/client';

interface MobileSidebarProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className='
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-[#A40001]
        border-t-[1px] 
        lg:hidden
      '
    >
      <div
        // onClick={() => setIsOpen(true)}
        className='cursor-pointer hover:opacity-75 transition px-4'
      >
        <UserAvatar user={currentUser} />
      </div>
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
          title={route.title}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
