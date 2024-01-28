import React from 'react';
import Modal from './Modal';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  requestModalOpen?: boolean;
  onClose: () => void;
  requestsList: { name: string; id: string }[];
  updateRequestList: (list: { name: string; id: string }[]) => void;
}

const FriendRequestModal: React.FC<Props> = ({
  requestModalOpen,
  onClose,
  requestsList,
  updateRequestList,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const determineFriendRequestStatus = (
    action: string,
    friendInfo: {
      name: string;
    }
  ): void => {
    if (action == 'ACCEPT') {
      axios
        .post('/api/friends', {
          friendInfo,
          method: 'ACCEPT',
        })
        .then(() => {
          router.refresh();
          toast.success(`${friendInfo.name} added to friends list`);
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data);
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post('/api/friends', {
          friendInfo,
          method: 'REJECT',
        })
        .then(() => {
          router.refresh();
          toast.success(`${friendInfo.name} friend request rejected.`);
          onClose();
        })
        .catch((error) => {
          toast.error(error.response.data);
        })
        .finally(() => setIsLoading(false));
      // toast.success(`${friendInfo.name} isn't cool enough!`);
    }
    let updatedRequests = requestsList.filter(function (obj) {
      return obj.name !== friendInfo.name;
    });
    updateRequestList(updatedRequests);
  };

  return (
    <Modal isOpen={requestModalOpen} onClose={onClose}>
      <div className='request-wrapper'>
        <h2 className='conversation-box-name text-4xl sm:text-5xl text-center text-white'>
          Friend Requests
        </h2>
        <div className='request-list-wrapper max-h-80	overflow-y-scroll mt-2'>
          <ul className='flex flex-col'>
            <TransitionGroup component='ul'>
              {requestsList.length > 0 ? (
                requestsList.map((request) => (
                  <CSSTransition
                    key={request.name}
                    timeout={700}
                    classNames='friend-request-item'
                  >
                    <li className='friend-request-item persona-IM sm:text-3xl text-2xl w-full flex justify-between my-4 py-4 pl-2'>
                      <p className='min-w-[75px] text-white'>{request.name}</p>
                      <div className='requests-actions flex justify-center items-center'>
                        <button
                          className='w-[35px] h-[35px] mx-2.5 check-button drop-shadow-[-2px_1px_1px_rgba(0,0,0,0.8)] hover:drop-shadow-[-2px_3px_2px_rgba(0,0,0,0.7)]'
                          onClick={() =>
                            determineFriendRequestStatus('ACCEPT', request)
                          }
                        >
                          <CiCircleCheck className='bg-white rounded-full	text-green-400 transition-all mx-auto h-full w-full' />
                        </button>
                        <button
                          className='w-[35px] h-[35px] mx-2.5 deny-button drop-shadow-[-2px_1px_1px_rgba(0,0,0,0.8)] hover:drop-shadow-[-2px_3px_2px_rgba(0,0,0,0.7)]'
                          onClick={() =>
                            determineFriendRequestStatus('accept', request)
                          }
                        >
                          <CiCircleRemove className='bg-white rounded-full text-rose-500 transition-all mx-auto h-full w-full' />
                        </button>
                      </div>
                    </li>
                  </CSSTransition>
                ))
              ) : (
                <div className='my-8 text-center font-black text-white text-[1.2rem]'>
                  No new requests
                </div>
              )}
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default FriendRequestModal;
