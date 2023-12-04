import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';
import EmptyConversationList from './components/EmptyConversationList';

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full bg-[100%_50%] bg-cover lg:bg-[length:100%_100%] persona-bg'>
        {conversations?.length > 0 ? (
          <ConversationList
            users={users}
            title='Messages'
            initialItems={conversations}
          />
        ) : (
          <EmptyConversationList />
        )}
        {children}
      </div>
    </Sidebar>
  );
}
