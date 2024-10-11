import { Header } from '@/components/header.component';
import { IUser } from '@/models/IUser.model';
import { AccountComponent } from '@/pages/account/account.сomponent';
import StoreProvider from '@/store/store';
import { getAccessToken, getRefreshToken, makeApiRequest, setAccessToken } from '@/utils/request.utils';
import { GetServerSideProps } from 'next';

interface IAccountProps {
  user: IUser;
}

export const getServerSideProps: GetServerSideProps<IAccountProps> = async (context) => {
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

    return {
      props: {
        user,
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


export default function Account({ user }: IAccountProps) {
  return <StoreProvider user={user}
                        friendshipsWithRelatedUsers={{
                          relatedUsers: [],
                          friendships: [],
                        }}
                        actionsSelectedUserId={user.id}>
    <Header />

    <AccountComponent />
  </StoreProvider>;
}

