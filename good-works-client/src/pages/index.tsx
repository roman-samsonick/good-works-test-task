import { ActionsList } from '@/components/actionsList.component';
import { Header } from '@/components/header.component';
import { Sidebar } from '@/components/sidebar.component';
import { IFriendship } from '@/models/IFriendship.model';
import { IUser } from '@/models/IUser.model';
import { userSlice } from '@/store/slices/user.slice';
import StoreProvider, { useAppSelector } from '@/store/store';
import { getAccessToken, getRefreshToken, makeApiRequest, setAccessToken } from '@/utils/request.utils';
import { GetServerSideProps } from 'next';

interface IHomeProps {
  user: IUser;
  friendship: {
    friendships: IFriendship[];
    relatedUsers: IUser[]
  };
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async (context) => {
  try {
    const user = await makeApiRequest({
      method: 'GET',
      path: 'user/my',
      accessToken: getAccessToken(context.req),
      refreshToken: getRefreshToken(context.req),
      setAccessToken: accessToken => {
        setAccessToken(context.res, accessToken);
      },
    });
    const friendship = await makeApiRequest({
      method: 'GET',
      path: 'friendship/my',
      accessToken: getAccessToken(context.req),
      refreshToken: getRefreshToken(context.req),
      setAccessToken: accessToken => {
        setAccessToken(context.res, accessToken);
      },
    });


    return {
      props: {
        user,
        friendship,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        destination: '/login',
      },
      props: undefined!,
    };
  }
};


export default function Home({
  user,
  friendship,
}: IHomeProps) {

  return <StoreProvider user={user}
                        friendshipsWithRelatedUsers={friendship}
                        actionsSelectedUserId={user.id}>
    <Header />
    <div className="h-[calc(100vh-40px)] w-full flex flex-row">
      <Sidebar />

      <ActionsList />
    </div>
  </StoreProvider>;
}
