import { IUser } from '@/models/IUser.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
      username: '',
      id: -52,
      name: '',
    } as IUser,
  },
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    user: state => state.user,
  },
});
