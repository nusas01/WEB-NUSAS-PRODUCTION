import axios from "axios";
import {
   loginStatusSlice,
    logoutSlice,
    storesVerificationSlice,
    accessKeySlice,
    accountTestingCustomerStoreSlice,
    storeRequiredVerifiedSlice,
    tenantSubmissionChangePaymentSlice,
    transactionPaidSlice,
    transactionPendingSlice,
    accessKeyStoreTestingSlice,
    transactionSubmissionPaidSlice,
    transactionSubmissionPendingSlice,
    tenantsSlice, 
    tenantStoresSlice,
    findTransactionSlice,
    storesExpiredSlice,
    findTransactionSubmissionChangePaymentGatewaySlice,
    findTenantSlice,
} from '../reducers/get'
import { statusExpiredUserTokenSlice } from '../reducers/expToken'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {setLoginStatus} = loginStatusSlice.actions
export const fetchAuthStatusLogin = () => {
    return async (dispatch) => {
        try {
            const response = await  axios.get(`${process.env.REACT_APP_AUTH_STATUS_LOGIN}`,{
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true, 
            })
            dispatch(setLoginStatus(response?.data.loggedIn))
        } catch (error) {
            // if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            //     dispatch(setStatusExpiredUserToken(true));
            // }
            dispatch(setLoginStatus(false))
        }
    }
} 

const {setSuccessLogout, setErrorLogout, setLoadingLogout} = logoutSlice.actions
export const fetchLogout = () => {
    return async (dispatch) => {
      dispatch(setLoadingLogout(true))
      try{
          const response = await  axios.get(`${process.env.REACT_APP_LOGOUT}`, {
              headers: {
                  "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
              },
              withCredentials: true
          })
          dispatch(setSuccessLogout(response?.data.success))
          // reset data customer ketika sudah di buat endpoint
      } catch(error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
          dispatch(setErrorLogout(error.response?.data?.error))
      } finally {
          dispatch(setLoadingLogout(false))
      }
    }
}

const { setStoresVerificationData, setStoresVerificationError, setLoadingStoresVerification } = storesVerificationSlice.actions
export const fetchStoresVerificationRequired = () => {
    return async (dispatch) => {
        dispatch(setLoadingStoresVerification(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_VERIFICATION_DEPLOY_REQUIRED}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setStoresVerificationData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setStoresVerificationError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingStoresVerification(false))
        }
    }
}

const { setAccessKeyData, setAccessKeyError, setLoadingAccessKey } = accessKeySlice.actions
export const createAccessKeyStore = (store_id, tenant_id) => {
    return async (dispatch) => {
        dispatch(setLoadingAccessKey(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_STORE}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    store_id: store_id,
                    tenant_id: tenant_id,
                },
            })
            dispatch(setAccessKeyData(response?.data?.secret_access_key))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setAccessKeyError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingAccessKey(false))
        }
    }
}

const { setAccountTestingCustomerStoreData, setAccountTestingCustomerStoreError, setLoadingAccountTestingCustomerStore } = accountTestingCustomerStoreSlice.actions
export const fetchAccountTestingCustomerStore = () => {
    return async (dispatch) => {
        dispatch(setLoadingAccountTestingCustomerStore(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_ACCOUNT_TESTING_CUSTOMER_STORE}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setAccountTestingCustomerStoreData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setAccountTestingCustomerStoreError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingAccountTestingCustomerStore(false))
        }
    }
}

const { setStoreRequiredVerifiedData, setStoreRequiredVerifiedError, setLoadingStoreRequiredVerified } = storeRequiredVerifiedSlice.actions
export const getAllStoreRequiredVerified = () => {
    return async (dispatch) => {
        dispatch(setLoadingStoreRequiredVerified(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_ALL_STORE_REQUIRED_VERIFIED}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setStoreRequiredVerifiedData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setStoreRequiredVerifiedError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingStoreRequiredVerified(false))
        }
    }
}

const { setTenantSubmissionChangePaymentData, setTenantSubmissionChangePaymentError, setLoadingTenantSubmissionChangePayment } = tenantSubmissionChangePaymentSlice.actions
export const getTenantSubmissionChangePaymentGateway = () => {
    return async (dispatch) => {
        dispatch(setLoadingTenantSubmissionChangePayment(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_TENANT_SUBMISSION_CHANGE_PAYMENT_GATEWAY}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setTenantSubmissionChangePaymentData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTenantSubmissionChangePaymentError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTenantSubmissionChangePayment(false))
        }
    }
}

const { setTransactionPaidData, setTransactionPaidError, setLoadingTransactionPaid } = transactionPaidSlice.actions
export const fetchTransactionPaid = (page, isLoadMore = false) => {
    return async (dispatch, getState) => {
        const currentState = getState().persisted.transactionPaid

        if (currentState.isLoadingMore && isLoadMore) {
            return;
        }

        dispatch(setLoadingTransactionPaid({loading: true, isLoadMore: isLoadMore}))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_PAID}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    page: page,
                }
            })

            const responseData = {
                data: response?.data?.data, 
                hasMore: response?.data?.hasMore || false,
                page: page,
                totalRecord: response?.data?.total_record,
            }

            dispatch(setTransactionPaidData(responseData))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransactionPaidError(error.response?.data?.error || 'Terjadi kesalahan'))
        }
    }
}

const { setTransactionPendingData, setTransactionPendingError, setLoadingTransactionPending } = transactionPendingSlice.actions
export const fetchTransactionPending = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionPending(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_PENDING}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setTransactionPendingData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransactionPendingError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTransactionPending(false))
        }
    }
}

const { setSuccessFindTransaction, setErrorFindTransaction, setLoadingFindTransaction } = findTransactionSlice.actions
export const findTransaction = (key) => {
    return async (dispatch) => {
        dispatch(setLoadingFindTransaction(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_FIND_TRANSACTION}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    key: key,
                }
            })
            dispatch(setSuccessFindTransaction(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setErrorFindTransaction(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingFindTransaction(false))
        }
    }
}

const { setAccessKeyStoreTestingData, setAccessKeyStoreTestingError, setLoadingAccessKeyStoreTesting } = accessKeyStoreTestingSlice.actions
export const createAccessKeyMaintananceTenant = (tenant_id, store_id) => {
    return async (dispatch) => {
        dispatch(setLoadingAccessKeyStoreTesting(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_TESTING_STORE}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    tenant_id: tenant_id,
                    store_id: store_id,
                }
            })
            dispatch(setAccessKeyStoreTestingData(response?.data?.access_key_maintanance))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setAccessKeyStoreTestingError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingAccessKeyStoreTesting(false))
        }
    }
}

const { setSuccessFindTransactionSubmissionChangePaymentGateway, setErrorFindTransactionSubmissionChangePaymentGateway, setLoadingFindTransactionSubmissionChangePaymentGateway } = findTransactionSubmissionChangePaymentGatewaySlice.actions
export const findTransactionSubmissionChangePaymentGateway = (key) => {
    return async (dispatch) => {
        dispatch(setLoadingFindTransactionSubmissionChangePaymentGateway(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_FIND_TRANSACTION_SUBMISSION_FIND}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    key: key,
                }
            })
            dispatch(setSuccessFindTransactionSubmissionChangePaymentGateway(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setErrorFindTransactionSubmissionChangePaymentGateway(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingFindTransactionSubmissionChangePaymentGateway(false))
        }
    }
}

const { setTransctionSubmissionPaidData, setTransctionSubmissionPaidError, setLoadingTransactionSubmissionPaid } = transactionSubmissionPaidSlice.actions
export const fetchTransactionSubmissionPaid = (page, isLoadMore = false) => {
    return async (dispatch, getState) => {
        const currentState = getState().persisted.transactionSubmissionPaid

        if (currentState.isLoadingMore && isLoadMore) {
            return
        }

        dispatch(setLoadingTransactionSubmissionPaid({loading: true, isLoadMore: isLoadMore}))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_SUBMISSION_PAID}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    page: page,
                }
            })

            const responseData = {
                data: response?.data?.data, 
                hasMore: response?.data?.hasMore || false,
                page: page,
                totalRecord: response?.data?.total_record,
            }

            dispatch(setTransctionSubmissionPaidData(responseData))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransctionSubmissionPaidError(error.response?.data?.error || 'Terjadi kesalahan'))
        } 
    }
}

const { setTransctionSubmissionPendingData, setTransctionSubmissionPendingError, setLoadingTransactionSubmissionPending } = transactionSubmissionPendingSlice.actions
export const fetchTransactionSubmissionPending = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionSubmissionPending(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_SUBMISSION_PENDING}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
            })
            dispatch(setTransctionSubmissionPendingData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransctionSubmissionPendingError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTransactionSubmissionPending(false))
        }
    }
}

const { setSuccessFindTenant, setErrorFindTenant, setLoadingFindTenant } = findTenantSlice.actions
export const findTenant = (key) => {
    return async (dispatch) => {
        dispatch(setLoadingFindTenant(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_FINDTENANT}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    key: key,
                }
            })
            dispatch(setSuccessFindTenant(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setErrorFindTenant(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingFindTenant(false))
        }
    }
}

const { setTenantsSuccess, setTenantsError, setLoadingTenants } = tenantsSlice.actions
export const fetchTenants = (page, isLoadMore = false) => {
    return async (dispatch, getState) => {
        const currentState = getState().persisted.tenants

        if (currentState.isLoadingMore && isLoadMore) {
            return;
        }

        dispatch(setLoadingTenants({loading: true, isLoadMore: isLoadMore}))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_TENANTS}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    page: page,
                }
            })

            const responseData = {
                data: response?.data?.data, 
                hasMore: response?.data?.hasMore || false,
                page: page,
                totalRecord: response?.data?.total_record,
            }
            dispatch(setTenantsSuccess(responseData))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTenantsError(error.response?.data?.error))
        } 
    }
}

const { setTenantStoresSuccess, setTenantStoresError, setLoadingTenantStores } = tenantStoresSlice.actions
export const fetchTenantStores = (id) => {
    return async (dispatch) => {
        dispatch(setLoadingTenantStores(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_TENANT_STORES}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    id: id,
                },
            })
            dispatch(setTenantStoresSuccess(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTenantStoresError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingTenantStores(false))
        }
    }
}

const {setStoresExpiredSuccess, setStoresExpiredError, setLoadingStoresExpired} = storesExpiredSlice.actions
export const fetchStoresExpired = (id) => {
    return async (dispatch) => {
        dispatch(setLoadingStoresExpired(true))
        try {
            const response = await  axios.get(`${process.env.REACT_APP_STORES_EXPIRED}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    id: id,
                },
            })
            dispatch(setStoresExpiredSuccess(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setStoresExpiredError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingStoresExpired(false))
        }
    }
}

export const fetchNonce = async () => {
  try {
    const response = await  axios.get(
      `${process.env.REACT_APP_NONCE}`,
      {
        headers: {
          "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
        },
        withCredentials: true,
      }
    );

    return { data: response?.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || "Unexpected error" };
  }
};

