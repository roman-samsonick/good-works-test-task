import { AcceptButton } from '@/components/circle-buttons/accept-button.component';
import { CancelButton } from '@/components/circle-buttons/cancel-button.component';
import { CheckmarkIcon } from '@/icons/checkmark.icon';
import { CrossIcon } from '@/icons/cross.icon';
import { IFriendship } from '@/models/IFriendship.model';
import { IUser } from '@/models/IUser.model';
import { actionsSlice } from '@/store/slices/actions.slice';
import { friendshipSlice } from '@/store/slices/friendship.slice';
import { useAppDispatch } from '@/store/store';
import { makeClientRequest } from '@/utils/request.utils';

export const FriendshipItem = ({
    friend,
    friendship,
  }: { friend: IUser; friendship: IFriendship },
) => {
  const dispatch = useAppDispatch();
  const friendId = friend.id;
  let isOutgoingRequest = friendship?.to === friendId;

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

  return <div onClick={() => {
    if (!friendship?.pending) {
      dispatch(actionsSlice.actions.setSelectedUserId(friendId));
    }
  }}
              className={`flex items-center justify-between p-3 w-full h-10 hover:bg-blue-400 bg-inherit cursor-pointer transition-colors duration-100 ease-in-out ${friendship.pending && 'backdrop-brightness-75 cursor-default hover:bg-inherit'}`}>
    <div>
      {friend.username}
    </div>

    {friendship.pending &&
      (isOutgoingRequest
          ? <CancelButton title="Cancel friend request"
                          onClick={() => cancelFriendshipRequest(friendship.id)} />
          :
          (<div className="flex flex-row gap-1">
            <AcceptButton title="Accept friend request"
                          onClick={() => acceptFriendshipRequest(friendship.id)} />
            <CancelButton title="Reject friend request"
                          onClick={() => rejectFriendshipRequest(friendship.id)} />
          </div>)
      )}
  </div>;
};
