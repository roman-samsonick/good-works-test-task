import { IFriendshipsWithRelatedUsers } from '@/models/IFriendship.model';
import { IUser } from '@/models/IUser.model';
import { actionsSlice } from '@/store/slices/actions.slice';
import { friendshipSlice } from '@/store/slices/friendship.slice';
import { userSlice } from '@/store/slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';
import React, { ReactNode, useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [friendshipSlice.name]: friendshipSlice.reducer,
      [actionsSlice.name]: actionsSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export default function StoreProvider({
  children,
  user,
  friendshipsWithRelatedUsers,
  actionsSelectedUserId,
}: {
  children: ReactNode
  user: IUser,
  friendshipsWithRelatedUsers: IFriendshipsWithRelatedUsers
  actionsSelectedUserId: number
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(userSlice.actions.setUser(user));
    storeRef.current.dispatch(friendshipSlice.actions.setFriendshipsWithRelatedUsers(friendshipsWithRelatedUsers));
    storeRef.current.dispatch(actionsSlice.actions.setSelectedUserId(actionsSelectedUserId));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
