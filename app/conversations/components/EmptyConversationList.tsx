import React from 'react';

type Props = {};

const EmptyConversationList = (props: Props) => {
  return (
    <div className='h-full flex justify-center items-center px-2 pb-20 text-center text-white friend-name text-4xl tracking-widest backdrop-brightness-[.5]'>
      <img
        src='/images/persona-chat-default.png'
        className='w-full absolute bottom-[15%] h-[300px] md:h-[360px] lg:w-3/4 lg:bottom-[5%] xl:h-[500px] drop-shadow-[-10px_3px_1px_black]'
      />
    </div>
  );
};

export default EmptyConversationList;
