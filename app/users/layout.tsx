import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar';
import UserList from './components/UserList';
import getCurrentUser from '../actions/getCurrentUser';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  const user = await getCurrentUser();
  // const currentUserFriendRequests = user?.friendRequests;

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full bg-cover bg-center lg:bg-[length:100%_100%] persona-bg2'>
        <UserList items={users} user={user} />
        {children}
      </div>
    </Sidebar>
  );
}
