import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar/Sidebar';
import UserList from './components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full bg-cover bg-center lg:bg-[length:100%_100%] persona-bg2'>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
