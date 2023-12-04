'use client';

import clsx from 'clsx';

import useConversation from '../hooks/useConversation';
import EmptyState from '../components/EmptyState';

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        'lg:pl-[25rem] h-full lg:block lg:hidden',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
