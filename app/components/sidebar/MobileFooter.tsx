'use client';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';
import UserAvatar from '../UserAvatar';
import SettingsModal from './SettingsModal';
import { User } from '@prisma/client';

interface MobileSidebarProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

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
        shadow-[-7px_-5px_3px_rgba(0,0,0,.5)];
      '
      >
        <div
          onClick={() => setSettingsOpen(true)}
          className='cursor-pointer hover:opacity-75 transition px-4'
        >
          <img src='/images/icons/settings-gear.png' />

          {/* <UserAvatar user={currentUser} /> */}
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
    </>
  );
};

export default MobileFooter;
