import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';
import { employeesApi } from './api/employeesApi';
import { organizationApi } from './api/organizationApi';
import reducer from './reducer';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([organizationApi.middleware, employeesApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
