import axiosInstance from "./axiosInstance.js";
import {
    loginSlice,
    sendEmailCredentialsSlice,
    deployAppSlice,
    deployFinishedSlice,
    deployAppTestingSlice,
    createAccountCustomerStoreTestingSlice,
    startChangePaymentGatewaySlice,
    finishedChangePaymentGatewaySlice,
    checkPendingTransactionSlice,
    sendEmailUpdateChangePaymentGatewaySlice,
    checkPendingSubmissionTransactionSlice,
    paymentGatewayFailedSlice,
    changePaymentGatewayFailedSlice,
    signupSlice,
    forgotPasswordSlice,
} from "../reducers/post"
import {
    loginStatusSlice,
    storesVerificationSlice,
    transactionSubmissionPendingSlice,
    transactionPendingSlice,
} from "../reducers/get"
import { statusExpiredUserTokenSlice } from '../reducers/expToken'
import {collectFingerprintAsync} from '../components/fp.js'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {setLoginStatus} = loginStatusSlice.actions
const { loginSuccess, loginError, setLoadingLogin } = loginSlice.actions
export const login = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
        }, 
        withCredentials: true,
    }
    dispatch(setLoadingLogin(true))
    try {
        const nonce_data = await collectFingerprintAsync();

        const formData = {
            ...data,
            nonce: nonce_data.nonce,
            value: nonce_data.value,
            iv: nonce_data.iv,
        }

        const response = await axiosInstance.post(`${process.env.REACT_APP_LOGIN}`, formData, config);
        dispatch(loginSuccess(response?.data?.success));
        dispatch(setLoginStatus(true))
    } catch(error) {
        const errorData = error.response?.data || {};

        const response = {
            errorLogin: errorData?.error,
            errorField: errorData.ErrorField,
        };

        dispatch(loginError(response));
    } finally {
        dispatch(setLoadingLogin(false))
    }
}

const {setSuccessForgotPassword, setErrorForgotPassword, setLoadingForgotPassword} = forgotPasswordSlice.actions
export const forgotPassword = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
        },
        withCredentials: true,
    }
    dispatch(setLoadingForgotPassword(true))
    try {
        const nonce_data = await collectFingerprintAsync();

        const formData = {
            ...data,
            nonce: nonce_data.nonce,
            value: nonce_data.value,
            iv: nonce_data.iv,
        }

        const response = await axiosInstance.post(`${process.env.REACT_APP_FORGOT_PASSWORD}`, formData, config)
        dispatch(setSuccessForgotPassword(response?.data?.success))
    } catch (error) {
        dispatch(setErrorForgotPassword({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField
        }))
    } finally {
        dispatch(setLoadingForgotPassword(false))
    }
}

const { setSendEmailCredentialsSuccess, setSendEmailCredentialsError, setLoadingSendEmailCredentials } = sendEmailCredentialsSlice.actions
export const sendEmailRequiredCredentialsPayment = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingSendEmailCredentials(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SEND_EMAIL_TENANT_REQUIRED_CREDENTIALS_PAYMENT_GATEWAY}`, data, config)
            dispatch(setSendEmailCredentialsSuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            
            dispatch(setSendEmailCredentialsError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingSendEmailCredentials(false))
        }
    }
}

const { setDeployAppSuccess, setDeployAppError, setLoadingDeployApp } = deployAppSlice.actions
export const deployApp = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingDeployApp(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_DEPLOY_APP_STORE}`, data, config)
            dispatch(setDeployAppSuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setDeployAppError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeployApp(false))
        }
    }
}

const {removeStoresVerificationById} = storesVerificationSlice.actions
const { setDeployFinishedSuccess, setDeployFinishedError, setLoadingDeployFinished } = deployFinishedSlice.actions
export const deployFinished = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingDeployFinished(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_DEPLOY_STORE_FINISHED}`, data, config)
            dispatch(setDeployFinishedSuccess(response?.data?.success))
            dispatch(removeStoresVerificationById(data.store_id))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setDeployFinishedError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeployFinished(false))
        }
    }
}

const { setDeployAppTestingSuccess, setDeployAppTestingError, setLoadingDeployAppTesting } = deployAppTestingSlice.actions
export const deployAppTesting = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingDeployAppTesting(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_DEPLOY_APP_STORE_TESTING}`, data, config)
            dispatch(setDeployAppTestingSuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setDeployAppTestingError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeployAppTesting(false))
        }
    }
}

const { setAccountCustomerStoreTestingSuccess, setAccountCustomerStoreTestingError, setLoadingAccountCustomerStoreTesting } = createAccountCustomerStoreTestingSlice.actions
export const createAccountTestingCustomerStore = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingAccountCustomerStoreTesting(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_ACCOUNT_TESTING_CUSTOMER_STORE}`, data, config)
            dispatch(setAccountCustomerStoreTestingSuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setAccountCustomerStoreTestingError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingAccountCustomerStoreTesting(false))
        }
    }
}

const { setSendEmailUpdateChangePaymentGatewaySuccess, setSendEmailUpdateChangePaymentGatewayError, setLoadingSendEmailUpdateChangePaymentGateway } = sendEmailUpdateChangePaymentGatewaySlice.actions
export const sendEmailUpdateChangePaymentGateway = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingSendEmailUpdateChangePaymentGateway(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SEND_EMAIL_UPDATE_CHANGE_PAYMENT_GATEWAY}`, data, config)
            dispatch(setSendEmailUpdateChangePaymentGatewaySuccess(response?.data?.message || 'Email berhasil dikirim'))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setSendEmailUpdateChangePaymentGatewayError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingSendEmailUpdateChangePaymentGateway(false))
        }
    }
}

const { setStartChangePaymentGatewaySuccess, setStartChangePaymentGatewayError, setLoadingStartChangePaymentGateway } = startChangePaymentGatewaySlice.actions
export const startChangePaymentGatewayTenant = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
            },
            withCredentials: true,
        }
        dispatch(setLoadingStartChangePaymentGateway(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_START_CHANGE_PAYMENT_GATEWAY}`, data, config)
            dispatch(setStartChangePaymentGatewaySuccess(response?.data?.message || 'Perubahan payment gateway dimulai'))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setStartChangePaymentGatewayError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingStartChangePaymentGateway(false))
        }
    }
}

const { setFinishedChangePaymentGatewaySuccess, setFinishedChangePaymentGatewayError, setLoadingFinishedChangePaymentGateway } = finishedChangePaymentGatewaySlice.actions
export const finishedChangePaymentGatewayTenant = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingFinishedChangePaymentGateway(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_FINISHED_CHANGE_PAYMENT_GATEWAY}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setFinishedChangePaymentGatewaySuccess(response?.data?.message || 'Perubahan payment gateway selesai'))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setFinishedChangePaymentGatewayError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingFinishedChangePaymentGateway(false))
        }
    }
}

const {deleteTransactionPendingById} = transactionPendingSlice.actions
const { setCheckPendingTransactionSuccess, setCheckPendingTransactionError, setLoadingCheckPendingTransaction } = checkPendingTransactionSlice.actions
export const checkPendingTransactionPaymentGateway = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingCheckPendingTransaction(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_CHECK_PENDING_TRANSACTION_PAYMENT_GATEWAY}`, data, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setCheckPendingTransactionSuccess(response?.data))
            dispatch(deleteTransactionPendingById(data.transaction_id))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setCheckPendingTransactionError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingCheckPendingTransaction(false))
        }
    }
}


const {deleteTransactionSubmissionPendingById} = transactionSubmissionPendingSlice.actions
const {setCheckPendingSubmissionTransactionSuccess, setCheckPendingSubmissionTransactionError, setLoadingCheckPendingSubmissionTransaction} = checkPendingSubmissionTransactionSlice.actions
export const checkPendingTransactionSubmissionPaymentGateway = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingCheckPendingSubmissionTransaction(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_CHECK_PENDING_SUBMISSION_TRANSACTION_PAYMENT_GATEWAY}`, data, {
                headers: {
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setCheckPendingSubmissionTransactionSuccess(response?.data))
            dispatch(deleteTransactionSubmissionPendingById(data.transaction_id))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setCheckPendingSubmissionTransactionError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingCheckPendingSubmissionTransaction(false))
        }
    }
}


const {setPaymentGatewaySuccess, setPaymentGatewayFailedError, setLoadingPaymentGatewayFailed} = paymentGatewayFailedSlice.actions
export const paymentGatewayFailed = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingPaymentGatewayFailed(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_PAYMENT_GATEWAY_FAILED}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setPaymentGatewaySuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setPaymentGatewayFailedError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingPaymentGatewayFailed(false))
        }
    }
}


const {setChangePaymentGatewaySuccess, setChangePaymentGatewayFailedError, setLoadingChangePaymentGatewayFailed} = changePaymentGatewayFailedSlice.actions
export const changePaymentGatewayFailed = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingChangePaymentGatewayFailed(true))
        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_SUBMISSION_CHANGE_PAYMENT_GATEWAY}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true
            })
            dispatch(setChangePaymentGatewaySuccess(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setChangePaymentGatewayFailedError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingChangePaymentGatewayFailed(false))
        }
    }
}

const {setSignupSuccess, setSignupError, setLoadingSignup} = signupSlice.actions
export const signup = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingSignup(true))
        try {
            const nonce_data = await collectFingerprintAsync();

            const formData = {
                ...data,
                nonce_data,
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true,
            }

            const response = await axiosInstance.post(`${process.env.REACT_APP_SIGNUP}`, formData, config)

            dispatch(setSignupSuccess(response?.data?.success))
        } catch (error) {
            const errorData = error.response?.data || {};

            const response = {
                error: errorData?.error,
                errorField: errorData?.ErrorField,
            };

            dispatch(setSignupError(response))
        } finally {
            dispatch(setLoadingSignup(false))
        }
    }
}