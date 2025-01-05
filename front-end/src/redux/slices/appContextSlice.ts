import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../../types/organization';
import { RootState } from '../store';

export interface AppContextState {
  currentOrg: Organization | null;
}

const initialState: AppContextState = {
  currentOrg: null,
};

const appContextSlice = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    setCurrentOrg: (state, action: PayloadAction<Organization>) => {
      state.currentOrg = action.payload;
    },
  },
});

const appContextSelector = (s: RootState) => s.appContext;

export const getCurrentOrg = createSelector(
  appContextSelector,
  (s) => s.currentOrg
);

export const { setCurrentOrg } = appContextSlice.actions;

export default appContextSlice;
