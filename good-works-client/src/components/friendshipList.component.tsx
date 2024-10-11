import { FriendshipItem } from '@/components/friendshipItem.component';
import { IFriendship } from '@/models/IFriendship.model';
import { actionsSlice } from '@/store/slices/actions.slice';
import { friendshipSlice } from '@/store/slices/friendship.slice';
import { userSlice } from '@/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const FriendshipList = () => {
  const friendships = useAppSelector(friendshipSlice.selectors.friendships);
  const relatedUsers = useAppSelector(friendshipSlice.selectors.friendshipsRelatedUsers);
  const user = useAppSelector(userSlice.selectors.user);
  const selectedUserId = useAppSelector(actionsSlice.selectors.selectedUserId);
  const dispatch = useAppDispatch();

  const getFriendId = (friendship: IFriendship) => {
    return friendship.from === user.id
      ? friendship.to
      : friendship.from;
  };
  const getUserById = (friendId: number) => {
    return relatedUsers.find(user => user.id === friendId)!;
  };

  return <div>
    <div className={`flex items-center p-3 w-full h-10 cursor-pointer hover:bg-blue-400 transition-colors duration-100 ease-in-out ${selectedUserId === user.id && 'bg-blue-500'} select-none transition-colors duration-100 ease-in-out`}
         onClick={() => dispatch(actionsSlice.actions.setSelectedUserId(user.id))}>
      <div>
        My good works
      </div>
    </div>
    <div className="relative h-full scroll-hidden overflow-y-scroll">
      <div className="h-fit divide-y divide-solid divide-amber-400">
        {friendships.map(friendship =>
          (<FriendshipItem friend={getUserById(getFriendId(friendship))}
                           friendship={friendship}
                           key={friendship.id} />
          ))}
      </div>
    </div>
  </div>;
};
