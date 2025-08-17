import axios from "axios"
import {
    loginSlice,
    sendEmailCredentialsSlice,
    deployAppSlice,
    deployFinishedSlice,
} from "../reducers/post"
import {
    loginStatusSlice
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
        dispatch(setLoadingSendEmailCredentials(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_SEND_EMAIL_TENANT_REQUIRED_CREDENTIALS_PAYMENT_GATEWAY}`, data, {
                withCredentials: true
            })
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
        dispatch(setLoadingDeployApp(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_APP_STORE}`, data, {
                withCredentials: true
            })
            dispatch(setDeployAppSuccess(response?.data?.success))
        } catch (error) {
            dispatch(setDeployAppError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeployApp(false))
        }
    }
}

const { setDeployFinishedSuccess, setDeployFinishedError, setLoadingDeployFinished } = deployFinishedSlice.actions
export const deployFinished = (data) => {
    return async (dispatch) => {
        dispatch(setLoadingDeployFinished(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_STORE_FINISHED}`, data, {
                withCredentials: true
            })
            dispatch(setDeployFinishedSuccess(response?.data?.success))
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
        dispatch(setLoadingDeployAppTesting(true))
        try {
            const response = await axios.post(`${process.env.REACT_APP_DEPLOY_APP_STORE_TESTING}`, data, {
                withCredentials: true
            })
            dispatch(setDeployAppTestingSuccess(response?.data?.success))
        } catch (error) {
            dispatch(setDeployAppTestingError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeployAppTesting(false))
        }
    }
}