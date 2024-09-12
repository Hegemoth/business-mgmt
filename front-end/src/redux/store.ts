import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: {},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
