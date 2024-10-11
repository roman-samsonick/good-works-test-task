import { IFriendship, IFriendshipsWithRelatedUsers } from '@/models/IFriendship.model';
import { IUser } from '@/models/IUser.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const friendshipSlice = createSlice({
  name: 'friendshipSlice',
  initialState: {
    friendships: [] as IFriendship[],
    relatedUsers: [] as IUser[],
  },
  reducers: {
    setFriendshipsWithRelatedUsers: (state, action: PayloadAction<IFriendshipsWithRelatedUsers>) => {
      state.friendships = action.payload.friendships;
      state.relatedUsers = action.payload.relatedUsers;
    },

    setFriendships: (state, action: PayloadAction<IFriendship[]>) => {
      state.friendships = action.payload;
    },
    addFriendship: (state, action: PayloadAction<IFriendship>) => {
      state.friendships = [...state.friendships, action.payload];
    },

    addRelatedUser: (state, action: PayloadAction<IUser>) => {
      state.relatedUsers = [...state.relatedUsers, action.payload];
    },

    removeFriendship(state, action: PayloadAction<number>) {
      state.friendships = state.friendships
        .filter(f => f.id !== action.payload);
    },

    acceptFriendship(state, action: PayloadAction<number>) {
      state.friendships.find(f => f.id === action.payload)!.pending = false;
    },

    setRelatedUsers: (state, action: PayloadAction<IUser[]>) => {
      state.relatedUsers = action.payload;
    },

  },
  selectors: {
    friendships: state => state.friendships,
    friendshipsRelatedUsers: state => state.relatedUsers,
  },
});
