import { AcceptButton } from '@/components/circle-buttons/accept-button.component';
import { CancelButton } from '@/components/circle-buttons/cancel-button.component';
import { PlusButton } from '@/components/circle-buttons/plus-button.component';
import { FriendshipList } from '@/components/friendshipList.component';
import { Search, useSearchState } from '@/components/search.component';
import { IUser } from '@/models/IUser.model';
import { actionsSlice } from '@/store/slices/actions.slice';
import { friendshipSlice } from '@/store/slices/friendship.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { makeClientRequest } from '@/utils/request.utils';

export interface IBaseProps {
  onClick?: () => void;
  title?: string;
}

const SearchItem = ({ user }: { user: IUser }) => {
  const friendships = useAppSelector(friendshipSlice.selectors.friendships);
  const friendshipWithUser = friendships.find(friendship => friendship.from === user.id || friendship.to === user.id);
  const dispatch = useAppDispatch();

  const cancelFriendshipRequest = async (friendshipId: number) => {
    await makeClientRequest({
      method: 'POST',
      path: 'friendship/cancel',
      body: { friendshipId },
    });

    dispatch(friendshipSlice.actions.removeFriendship(friendshipId));
  };
  const rejectFriendshipRequest = async (friendshipId: number) => {
    await makeClientRequest({
      method: 'POST',
      path: 'friendship/reject',
      body: { friendshipId },
    });

    dispatch(friendshipSlice.actions.removeFriendship(friendshipId));
  };
  const acceptFriendshipRequest = async (friendshipId: number) => {
    await makeClientRequest({
      method: 'POST',
      path: 'friendship/accept',
      body: { friendshipId },
    });
    dispatch(friendshipSlice.actions.acceptFriendship(friendshipId));
  };
  const inviteFriendRequest = async (userId: number) => {
    const newFriendship = await makeClientRequest({
      method: 'POST',
      path: 'friendship/invite',
      body: { userId },
    });
    dispatch(friendshipSlice.actions.addFriendship(newFriendship));
    dispatch(friendshipSlice.actions.addRelatedUser(user));
  };

  return <div className={`flex items-center justify-between p-3 w-full h-10 bg-gray-400/50 transition-colors duration-100 ease-in-out ${friendshipWithUser && !friendshipWithUser?.pending && 'bg-transparent cursor-pointer hover:bg-blue-400 '}`}
              onClick={() => {
                if (friendshipWithUser && !friendshipWithUser?.pending) {
                  dispatch(actionsSlice.actions.setSelectedUserId(user.id));
                }
              }}
  >
    <div>{user.username}</div>

    <div>
      {!friendshipWithUser && <PlusButton title="Invite user to friends"
                                          onClick={() => inviteFriendRequest(user.id)} />}

      {friendshipWithUser && friendshipWithUser.pending && (friendshipWithUser?.to === user.id
        ? <CancelButton title="Cancel friend request"
                        onClick={() => cancelFriendshipRequest(friendshipWithUser.id)} />
        :
        (<div className="flex flex-row gap-1">
          <AcceptButton title="Accept friend request"
                        onClick={() => acceptFriendshipRequest(friendshipWithUser.id)} />

          <CancelButton onClick={() => rejectFriendshipRequest(friendshipWithUser.id)}
                        title="Reject friend request" />
        </div>))}
    </div>
  </div>;
};

export const SearchResults = ({ users }: { users: IUser[] }) => {
  if (!users.length) {
    return <div className="flex justify-center py-2 w-full">No users found</div>;
  }

  return <div className="relative h-full scroll-hidden overflow-y-scroll ">
    <div className="h-fit divide-y divide-solid divide-amber-400">
      {users.map(user => <SearchItem key={user.id}
                                     user={user} />)}
    </div>
  </div>;
};

export const Sidebar = () => {
  const {
    rawTerm,
    setRawTerm,
    searchResults,
    loading,
  } = useSearchState();

  return (
    <div className="flex flex-col w-[300px] h-full bg-blue-200 divide-y divide-solid divide-amber-400">
      <Search loading={loading}
              term={rawTerm}
              setTerm={setRawTerm} />
      {rawTerm.length
        ? <SearchResults users={searchResults} />
        : <FriendshipList />
      }
    </div>
  );
};
