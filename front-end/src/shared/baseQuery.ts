import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BACKEND_URL } from '../constants/constants';
import { AppContextState } from '../redux/slices/appContextSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers, api) => {
    // @ts-ignore
    const currentAppState: AppContextState = api.getState().appContext;

    if (currentAppState.currentOrg?.id) {
      headers.set('X-Org-Id', currentAppState.currentOrg.id);
    }

    return headers;
  },
});

export default baseQuery;
