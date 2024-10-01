import { combineReducers } from '@reduxjs/toolkit';
import { organizationApi } from './api/organizationApi';

// const persistConfig = {
//   key: appSlice.name,
//   storage,
// };

// const persistConfigTable = {
//   key: tableSlice.name,
//   storage,
// };

// const persistedAppReducer = persistReducer(persistConfig, appSlice.reducer);
// const persistedTableReducer = persistReducer(persistConfigTable, tableSlice.reducer);

const reducer = combineReducers({
  [organizationApi.reducerPath]: organizationApi.reducer,
});

export default reducer;
