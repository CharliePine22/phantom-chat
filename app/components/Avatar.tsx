'use client';

import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";
import Image from "next/image";

interface AvatarProps {
  user?: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="absolute h-full w-full">
      <div className="
        relative 
        inline-block 
        overflow-hidden
        h-[90px]
        w-[105px]
        md:h-11 
        md:w-11
        transform skew-x-15 rotate-y-1
      ">
        {/* position: absolute;
    height: 90px;
    width: 105px;
    transform: perspective(12px) skewX(15deg) rotateY(0.5deg); */}

        <Image
          fill
          src={user?.image || '/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <span 
          className="
            absolute 
            block
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
      ) : null}
    </div>
  );
}

export default Avatar;
