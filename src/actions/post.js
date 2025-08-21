import axios from "axios"
import {
    loginSlice,
    sendEmailCredentialsSlice,
    deployAppSlice,
    deployFinishedSlice,
    deployAppTestingSlice,
    createAccountCustomerStoreTestingSlice,
    sendEmailCredentialPaymentSlice,
    startChangePaymentGatewaySlice,
    finishedChangePaymentGatewaySlice,
    checkPendingTransactionSlice,
    sendEmailUpdateChangePaymentGatewaySlice,
    checkPendingSubmissionTransactionSlice,
} from "../reducers/post"
import {
    loginStatusSlice,
    storesVerificationSlice,
    transactionSubmissionPendingSlice,
} from "../reducers/get"

const {setLoginStatus} = loginStatusSlice.actions
const { loginSuccess, loginError, setLoadingLogin } = loginSlice.actions
export const login = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }, 
        withCredentials: true,
    }
    dispatch(setLoadingLogin(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_LOGIN}`, data, config);
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

const { setSendEmailCredentialsSuccess, setSendEmailCredentialsError, setLoadingSendEmailCredentials } = sendEmailCredentialsSlice.actions
export const sendEmailRequiredCredentialsPayment = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingSendEmailCredentials(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_SEND_EMAIL_TENANT_REQUIRED_CREDENTIALS_PAYMENT_GATEWAY}`, data, config)
            dispatch(setSendEmailCredentialsSuccess(response?.data?.success))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingDeployApp(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_APP_STORE}`, data, config)
            dispatch(setDeployAppSuccess(response?.data?.success))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingDeployFinished(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_STORE_FINISHED}`, data, config)
            dispatch(setDeployFinishedSuccess(response?.data?.success))
            dispatch(removeStoresVerificationById(data.store_id))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingDeployAppTesting(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_APP_STORE_TESTING}`, data, config)
            dispatch(setDeployAppTestingSuccess(response?.data?.success))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingAccountCustomerStoreTesting(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_ACCOUNT_TESTING_CUSTOMER_STORE}`, data, config)
            dispatch(setAccountCustomerStoreTestingSuccess(response?.data?.success))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingSendEmailUpdateChangePaymentGateway(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_SEND_EMAIL_UPDATE_CHANGE_PAYMENT_GATEWAY}`, data, config)
            dispatch(setSendEmailUpdateChangePaymentGatewaySuccess(response?.data?.message || 'Email berhasil dikirim'))
        } catch (error) {
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
            }, 
            withCredentials: true,
        }
        dispatch(setLoadingStartChangePaymentGateway(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_START_CHANGE_PAYMENT_GATEWAY}`, data, config)
            dispatch(setStartChangePaymentGatewaySuccess(response?.data?.message || 'Perubahan payment gateway dimulai'))
        } catch (error) {
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
            const response = await axios.post(`${process.env.REACT_APP_FINISHED_CHANGE_PAYMENT_GATEWAY}`, data, {
                withCredentials: true
            })
            dispatch(setFinishedChangePaymentGatewaySuccess(response?.data?.message || 'Perubahan payment gateway selesai'))
        } catch (error) {
            dispatch(setFinishedChangePaymentGatewayError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingFinishedChangePaymentGateway(false))
        }
    }
}

const {deleteTransactionPendingById} = transctionPendingSlice.actions
const { setCheckPendingTransactionSuccess, setCheckPendingTransactionError, setLoadingCheckPendingTransaction } = checkPendingTransactionSlice.actions
export const checkPendingTransactionPaymentGateway = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingCheckPendingTransaction(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_CHECK_PENDING_TRANSACTION_PAYMENT_GATEWAY}`, data, {
                withCredentials: true
            })
            dispatch(setCheckPendingTransactionSuccess(response?.data))
            dispatch(deleteTransactionPendingById(data.transaction_id))
        } catch (error) {
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
            const response = await axios.post(`${process.env.REACT_APP_CHECK_PENDING_SUBMISSION_TRANSACTION_PAYMENT_GATEWAY}`, data, {
                withCredentials: true
            })
            dispatch(setCheckPendingSubmissionTransactionSuccess(response?.data))
            dispatch(deleteTransactionSubmissionPendingById(data.transaction_id))
        } catch (error) {
            dispatch(setCheckPendingSubmissionTransactionError(error.response?.data?.error || 'Terjadi kesalahan'))
        } finally {
            dispatch(setLoadingCheckPendingSubmissionTransaction(false))
        }
    }
}
