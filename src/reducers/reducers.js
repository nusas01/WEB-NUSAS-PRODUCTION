import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTenants,
  fetchTenantStores,
  fetchTransactionPaid,
  fetchTransactionSubmissionPaid,
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

export const loadMoreTransactionPaid = () => {
  return async (dispatch, getState) => {
    const state = getState().persisted;
    const { transactionPaid } = state;

    if (
      !transactionPaid.hasMore || 
      transactionPaid.isLoadingMore || 
      transactionPaid.loadingTenants
    ) {
      return
    }

    const nextPage = transactionPaid.page  + 1;

    return dispatch(fetchTransactionPaid(nextPage, true))
  } 
}

export const loadMoreTransactionSubmissionPaid = () => {
  return async (dispatch, getState) => {
    const state = getState().persisted;
    const { transactionSubmissionPaid } = state;

    if (
      !transactionSubmissionPaid.hasMore || 
      transactionSubmissionPaid.isLoadingMore || 
      transactionSubmissionPaid.loadingTenants
    ) {
      return
    }

    const nextPage = transactionSubmissionPaid.page  + 1;

    return dispatch(fetchTransactionSubmissionPaid(nextPage, true))
  } 
}
