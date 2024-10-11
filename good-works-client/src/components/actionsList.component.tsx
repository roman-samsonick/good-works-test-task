import { ActionListItem } from '@/components/actionListItem.component';
import { TrashButton } from '@/components/circle-buttons/trash-button.component';
import { AccountIcon } from '@/icons/account.icon';
import { PlusIcon } from '@/icons/plus.icon';
import { TrashIcon } from '@/icons/trash.icon';
import { actionsSlice } from '@/store/slices/actions.slice';
import { friendshipSlice } from '@/store/slices/friendship.slice';
import { userSlice } from '@/store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { makeClientRequest } from '@/utils/request.utils';
import { useEffect, useState } from 'react';

export const ActionsList = () => {
  const user = useAppSelector(userSlice.selectors.user);
  const friendshipsRelatedUsers = useAppSelector(friendshipSlice.selectors.friendshipsRelatedUsers);
  const actions = useAppSelector(actionsSlice.selectors.actions);
  const selectedUserId = useAppSelector(actionsSlice.selectors.selectedUserId);
  const isSelfActions = user.id === selectedUserId;
  const dispatch = useAppDispatch();
  const [createValue, setCreateValue] = useState('');
  const friendships = useAppSelector(friendshipSlice.selectors.friendships);
  const friendshipWithUser = friendships.find(friendship => friendship.from === selectedUserId || friendship.to === selectedUserId);
  const selectedUser = friendshipsRelatedUsers.find(user => user.id === selectedUserId)!;

  const getUserActions = async (userId: number) => {
    if (userId !== user.id) {
      const actionsRequest = await makeClientRequest({
        method: 'POST',
        path: 'action/friendActions',
        body: { friendId: userId },
      });
      dispatch(actionsSlice.actions.setActions(actionsRequest));
    } else {
      const actionsRequest = await makeClientRequest({
        method: 'POST',
        path: 'action/my',
      });
      dispatch(actionsSlice.actions.setActions(actionsRequest));
    }
  };

  const createAction = async () => {
    const createActionResponse = await makeClientRequest({
      method: 'POST',
      path: 'action/create',
      body: {
        description: '',
        name: createValue,
        completed: false,
      },
    });
    setCreateValue('');
    dispatch(actionsSlice.actions.addAction(createActionResponse));
  };
  const removeFriendship = async (friendshipId: number) => {
    if (friendshipWithUser) {
      await makeClientRequest({
        method: 'POST',
        path: 'friendship/remove',
        body: { friendshipId },
      });
      dispatch(actionsSlice.actions.setSelectedUserId(user.id));
      dispatch(friendshipSlice.actions.removeFriendship(friendshipId));
    }
  };

  useEffect(() => {
    getUserActions(selectedUserId);
  }, [selectedUserId]);

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {isSelfActions ?
        <div className="flex flex-row items-center h-10 py-1 px-1 rounded-3xl border border-solid bg-red-600/10 peer-focus:border-red-600">
          <input type="text"
                 value={createValue}
                 placeholder="Type a name of the good work here..."
                 onChange={e => {
                   setCreateValue(e.target.value);
                 }}
                 className="peer h-9 w-full bg-transparent border-none focus:h-8 focus:ring-0" />

          <PlusIcon className={`h-full bg-blue-300 rounded-full cursor-pointer stroke-white hover:bg-blue-400 transition-colors duration-100 ease-in-out ${!createValue.length ? 'cursor-not-allowed hover:bg-blue-300' : ''}`}
                    onClick={() => {
                      if (createValue.length)
                        return createAction();
                    }} />
        </div> :
        <div className="flex flex-row w-full items-center justify-between h-14 p-2 box-border bg-gray-200 rounded-2xl">
          <div className=" h-full flex flex-row gap-4 ">
            <AccountIcon className="h-full box-border p-2 rounded-full bg-blue-300/70" />

            <div className="flex flex-col h-full justify-center gap-2">
              <div className="flex items-center h-4 text-xl">{selectedUser?.name}</div>
              <div className="flex items-center h-2 text-sm">@{selectedUser?.username}</div>
            </div>
          </div>

          <TrashButton onClick={() => removeFriendship(friendshipWithUser?.id!)} />
        </div>
      }

      <div className="flex h-full flex-col gap-2 scroll-hidden overflow-y-scroll rounded-2xl">
        {actions.map(action => (
          <ActionListItem key={action.id}
                          action={action} />
        ))}
        {!actions.length && <div className="flex justify-center items-center h-full text-2xl">
          {isSelfActions ? 'Create your first good work' : 'This user has not done any good works'}
        </div>}
      </div>
    </div>
  );
};
