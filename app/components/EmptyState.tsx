// bg-[#A40001]
const EmptyState = () => {
  return (
    <div
      className='
        px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center 
        '
    >
      <div className='text-center items-center flex flex-col'>
        <h3 className='mt-2 text-5xl font-semibold text-white friend-name chat-default-msg'>
          Choose someone from your friends list to begin chatting.
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
