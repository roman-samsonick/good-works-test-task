import { IAction } from '@/models/IAction.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
  name: 'actionsSlice',
  initialState: {
    actions: [] as IAction[],
    selectedUserId: -52,
  },
  reducers: {
    setActions: (state, action: PayloadAction<IAction[]>) => {
      state.actions = action.payload;
    },
    addAction: (state, action: PayloadAction<IAction>) => {
      state.actions = [...state.actions, action.payload];
    },
    removeAction: (state, action: PayloadAction<number>) => {
      state.actions = state.actions.filter(a => a.id !== action.payload);
    },
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
    updateAction: (state, payload: PayloadAction<IAction>) => {
      const selectedActionIndex = state.actions.findIndex(a => a.id === payload.payload.id);
      const clonedActions = state.actions;
      clonedActions[selectedActionIndex] = payload.payload;
      state.actions = clonedActions;
    },

  },
  selectors: {
    actions: state => state.actions,
    selectedUserId: state => state.selectedUserId,
  },
});
