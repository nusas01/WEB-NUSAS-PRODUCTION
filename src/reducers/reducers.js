import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTenants,
  fetchTenantStores
} from '../actions/get'

export const navbarSlice = createSlice({
  name: "navbarInternal",
  initialState: {
    isOpen: false,
    isMobileDeviceType: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsMobileDeviceType: (state, action) => {
       state.isMobileDeviceType = action.payload;
    }
  },
});

export const loadMoreTenants = () => {
  return async (dispatch, getState) => {
    const state = getState().persisted;
    const { tenants } = state;

    if (
      !tenants.hasMore || 
      tenants.isLoadingMore || 
      tenants.loadingTenants
    ) {
      return
    }

    const nextPage = tenants.page  + 1;

    return dispatch(fetchTenants(nextPage, true))
  } 
}

