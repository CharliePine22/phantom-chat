import Link from 'next/link';

import clsx from 'clsx';

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  title: string;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon,
  active,
  onClick,
  title,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group 
        flex 
        flex-col
        items-center
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-1/4
        justify-center 
        p-1
        text-white
        hover:text-black 
        hover:bg-gray-100
      `,
        active && 'bg-black text-black'
      )}
    >
      {/* <Icon className='h-6 w-6' /> */}
      <span className='icon-label'>{title}</span>
      <img
        src={icon.src}
        className={`h-[50px] w-[50px] 
          ${title == 'Chat' && '-translate-y-[0.3rem]'}
        `}
      />
    </Link>
  );
};

export default MobileItem;
