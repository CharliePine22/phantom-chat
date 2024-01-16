import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import messageIcon from '../../public/images/icons/message-icon.png';
import navIcon from '../../public/images/icons/logout.png';
import contactsIcon from '../../public/images/icons/contacts.png';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/conversations', 
      icon: messageIcon,
      temp: HiChat,
      active: pathname === '/conversations' || !!conversationId,
      title: 'Chat'
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: contactsIcon, 
      temp: HiUsers,
      active: pathname === '/users',
      title: 'Friends'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: navIcon, 
      temp: HiArrowLeftOnRectangle,
      title: 'Logout'
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;
