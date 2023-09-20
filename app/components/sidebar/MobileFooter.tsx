'use client';

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import UserAvatar from "../UserAvatar";
import { User } from "@prisma/client";


interface MobileSidebarProps {
  currentUser: User
}

const MobileFooter: React.FC<MobileSidebarProps> = ({currentUser}) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return ( 
    <div 
      className="
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
      "
    >
      {routes.map((route) => (
        <MobileItem 
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            onClick={() => setIsOpen(true)} 
            className="cursor-pointer hover:opacity-75 transition"
          >
            <UserAvatar user={currentUser} />
          </div>
        </nav>
    </div>
   );
}
 
export default MobileFooter;