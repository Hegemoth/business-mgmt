import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { employeesApi } from './api/employeesApi';
import { organizationApi } from './api/organizationApi';
import appContextSlice from './slices/appContextSlice';

const persistConfig = {
  key: appContextSlice.name,
  storage,
};

const persistedAppContextReducer = persistReducer(
  persistConfig,
  appContextSlice.reducer
);

const reducer = combineReducers({
  [appContextSlice.name]: persistedAppContextReducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
});

export default reducer;
