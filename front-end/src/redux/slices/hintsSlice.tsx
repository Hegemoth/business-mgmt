import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface HintsSlice {
  visible: boolean;
}

const initialState: HintsSlice = {
  visible: true,
};

const hintsSlice = createSlice({
  name: 'hintsSlice',
  initialState,
  reducers: {
    toggleHintsVisible: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const hintsSelector = (s: RootState) => s.hintsSlice;

export const getHintsVisible = createSelector(hintsSelector, (s) => s.visible);
export const { toggleHintsVisible } = hintsSlice.actions;

export default hintsSlice;
