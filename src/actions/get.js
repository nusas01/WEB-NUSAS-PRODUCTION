import axios from "axios"
import {
   loginStatusSlice,
    logoutSlice,
    storesVerificationSlice,
    accessKeySlice,
    accountTestingCustomerStoreSlice,
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
export const createAccessKeyStore = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingAccessKey(true))
        try {
            const response = await axios.get(`${process.env.REACT_APP_CREATE_ACCESS_KEY_STORE}`, {
                withCredentials: true,
                params: data,
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