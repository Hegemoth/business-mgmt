import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { employeesApi } from './api/employeesApi';
import { materialsApi } from './api/materialsApi';
import { organizationApi } from './api/organizationApi';
import appContextSlice from './slices/appContextSlice';
import hintsSlice from './slices/hintsSlice';

const persistConfig = {
  key: appContextSlice.name,
  storage,
};

const persistConfigHints = {
  key: hintsSlice.name,
  storage,
};

const persistedAppContextReducer = persistReducer(persistConfig, appContextSlice.reducer);
const persistedHintsReducer = persistReducer(persistConfigHints, hintsSlice.reducer);

const reducer = combineReducers({
  [appContextSlice.name]: persistedAppContextReducer,
  [hintsSlice.name]: persistedHintsReducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [materialsApi.reducerPath]: materialsApi.reducer,
});

export default reducer;
