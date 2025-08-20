import axios from "axios"
import {
   loginStatusSlice,
    logoutSlice,
    storesVerificationSlice,
    accessKeySlice,
    accountTestingCustomerStoreSlice,
    storeRequiredVerifiedSlice,
    tenantSubmissionChangePaymentSlice,
    sendEmailPaymentVerificationSlice,
    transactionPaidSlice,
    transactionPendingSlice,
    accessKeyStoreTestingSlice,
} from '../reducers/get'

const {setLoginStatus} = loginStatusSlice.actions
export const fetchAuthStatusLogin = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_AUTH_STATUS_LOGIN}`,{
                withCredentials: true, 
            })
            dispatch(setLoginStatus(response?.data.loggedIn))
        } catch (error) {
            dispatch(setLoginStatus(false))
        }
    }
} 

const {setSuccessLogout, setErrorLogout, setLoadingLogout} = logoutSlice.actions
export const fetchLogout = () => {
    return async (dispatch) => {
      dispatch(setLoadingLogout(true))
      try{
          const response = await axios.get(`${process.env.REACT_APP_LOGOUT}`, {
              withCredentials: true
          })
          dispatch(setSuccessLogout(response?.data.success))
          dispatch(setLoginStatus(false))
          // reset data customer ketika sudah di buat endpoint
      } catch(error) {
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
            const response = await axios.get(`${process.env.REACT_APP_VERIFICATION_DEPLOY_REQUIRED}`, {
                withCredentials: true
            })
            dispatch(setStoresVerificationData(response?.data))
        } catch (error) {
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
            const response = await axios.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_STORE}`, {
                withCredentials: true,
                params: {
                    store_id: store_id,
                    tenant_id: tenant_id,
                },
            })
            dispatch(setAccessKeyData(response?.data))
        } catch (error) {
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
            const response = await axios.get(`${process.env.REACT_APP_ACCOUNT_TESTING_CUSTOMER_STORE}`, {
                withCredentials: true
            })
            dispatch(setAccountTestingCustomerStoreData(response?.data))
        } catch (error) {
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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tenant/stores/deploy/verification-required`, {
                withCredentials: true
            })
            dispatch(setStoreRequiredVerifiedData(response?.data))
        } catch (error) {
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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tenant/submission/change-payment-gateway`, {
                withCredentials: true
            })
            dispatch(setTenantSubmissionChangePaymentData(response?.data))
        } catch (error) {
            dispatch(setTenantSubmissionChangePaymentError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTenantSubmissionChangePayment(false))
        }
    }
}

const { setSendEmailPaymentVerificationData, setSendEmailPaymentVerificationError, setLoadingSendEmailPaymentVerification } = sendEmailPaymentVerificationSlice.actions
export const sendEmailRequiredCredentialPaymentGateway = (email) => {
    return async (dispatch) => {
        dispatch(setLoadingSendEmailPaymentVerification(true))
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tenant/store/send/email/payment-verification-requried`, {
                withCredentials: true,
                params: {
                    email: email,
                }
            })
            dispatch(setSendEmailPaymentVerificationData(response?.data))
        } catch (error) {
            dispatch(setSendEmailPaymentVerificationError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingSendEmailPaymentVerification(false))
        }
    }
}

const { setTransactionPaidData, setTransactionPaidError, setLoadingTransactionPaid } = transactionPaidSlice.actions
export const getAllTransactionPaid = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionPaid(true))
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transaction/paid`, {
                withCredentials: true
            })
            dispatch(setTransactionPaidData(response?.data))
        } catch (error) {
            dispatch(setTransactionPaidError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingTransactionPaid(false))
        }
    }
}

const { setTransactionPendingData, setTransactionPendingError, setLoadingTransactionPending } = transactionPendingSlice.actions
export const getAllTransactionPending = () => {
    return async (dispatch) => {
        dispatch(setLoadingTransactionPending(true))
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transaction/pending`, {
                withCredentials: true
            })
            dispatch(setTransactionPendingData(response?.data))
        } catch (error) {
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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/create/access/key/store/testing`, {
                withCredentials: true,
                params: {
                    tenant_id: tenant_id,
                    store_id: store_id,
                }
            })
            dispatch(setAccessKeyStoreTestingData(response?.data))
        } catch (error) {
            dispatch(setAccessKeyStoreTestingError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingAccessKeyStoreTesting(false))
        }
    }
}
