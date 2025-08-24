import axiosInstance from './axiosInstance'
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
} from '../reducers/get'
import { statusExpiredUserTokenSlice } from '../reducers/expToken'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {setLoginStatus} = loginStatusSlice.actions
export const fetchAuthStatusLogin = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_AUTH_STATUS_LOGIN}`,{
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true, 
            })
            dispatch(setLoginStatus(response?.data.loggedIn))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setLoginStatus(false))
        }
    }
} 

const {setSuccessLogout, setErrorLogout, setLoadingLogout} = logoutSlice.actions
export const fetchLogout = () => {
    return async (dispatch) => {
      dispatch(setLoadingLogout(true))
      try{
          const response = await axiosInstance.get(`${process.env.REACT_APP_LOGOUT}`, {
              headers: {
                  "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
              },
              withCredentials: true
          })
          dispatch(setSuccessLogout(response?.data.success))
          dispatch(setLoginStatus(false))
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
            const response = await axiosInstance.get(`${process.env.REACT_APP_VERIFICATION_DEPLOY_REQUIRED}`, {
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
            const response = await axiosInstance.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_STORE}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    store_id: store_id,
                    tenant_id: tenant_id,
                },
            })
            dispatch(setAccessKeyData(response?.data))
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
            const response = await axiosInstance.get(`${process.env.REACT_APP_ACCOUNT_TESTING_CUSTOMER_STORE}`, {
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
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_ALL_STORE_REQUIRED_VERIFIED}`, {
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
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_TENANT_SUBMISSION_CHANGE_PAYMENT_GATEWAY}`, {
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
export const fetchTransactionPaid = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionPaid(true))
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_PAID}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setTransactionPaidData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransactionPaidError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTransactionPaid(false))
        }
    }
}

const { setTransactionPendingData, setTransactionPendingError, setLoadingTransactionPending } = transactionPendingSlice.actions
export const fetchTransactionPending = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionPending(true))
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_PENDING}`, {
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

const { setAccessKeyStoreTestingData, setAccessKeyStoreTestingError, setLoadingAccessKeyStoreTesting } = accessKeyStoreTestingSlice.actions
export const createAccessKeyMaintananceTenant = (tenant_id, store_id) => {
    return async (dispatch) => {
        dispatch(setLoadingAccessKeyStoreTesting(true))
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_STORE}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
                params: {
                    tenant_id: tenant_id,
                    store_id: store_id,
                }
            })
            dispatch(setAccessKeyStoreTestingData(response?.data))
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

const { setTransctionSubmissionPaidData, setTransctionSubmissionPaidError, setLoadingTransactionSubmissionPaid } = transactionSubmissionPaidSlice.actions
export const fetchTransactionSubmissionPaid = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionSubmissionPaid(true))
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_SUBMISSION_PAID}`, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
            })
            dispatch(setTransctionSubmissionPaidData(response?.data))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setTransctionSubmissionPaidError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTransactionSubmissionPaid(false))
        }
    }
}

const { setTransctionSubmissionPendingData, setTransctionSubmissionPendingError, setLoadingTransactionSubmissionPending } = transactionSubmissionPendingSlice.actions
export const fetchTransactionSubmissionPending = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionSubmissionPending(true))
        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_GET_ALL_TRANSACTION_SUBMISSION_PENDING}`, {
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

