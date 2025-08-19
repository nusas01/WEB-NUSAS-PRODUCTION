import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
    successLogin: false, 
    errorLogin: null, 
    loadingLogin: false, 
    errorField: {},
}
export const loginSlice = createSlice({
    name: 'login', 
    initialState: initialLoginState, 
    reducers: {
        loginSuccess: (state, action) => {
            state.successLogin = action.payload
        },
        loginError: (state, action) => {
            state.errorLogin = action.payload.errorLogin 
            state.errorField = action.payload.errorField || {}
        },
        setLoadingLogin: (state, action) => {
            state.loadingLogin = action.payload
        }, 
        resetLogin: (state) => {
            state.successLogin = false
            state.errorLogin = null
            state.errorField = {}
        }
    }
})

const initialForgotPassword = {
    succesForgotPassword: false,
    errorForgotPassword: null, 
    loadingForgotPassword: false,
}
export const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: initialForgotPassword,
    reducers: {
        setLoadingForgotPassword: (state, action) => {
            state.loadingForgotPassword = action.payload
        },
        setSuccessForgotPassword: (state, action) => {
            state.succesForgotPassword = action.payload
        },
        setErrorForgotPassword: (state, action) => {
            state.errorForgotPassword = action.payload
        },
        resetForgotPassword: (state) => {
            state.errorForgotPassword = null
            state.succesForgotPassword = false
        }
    }
})


const initialSendEmailCredentialsState = {
    sendEmailCredentialsSuccess: false,
    sendEmailCredentialsError: null,
    loadingSendEmailCredentials: false
}
export const sendEmailCredentialsSlice = createSlice({
    name: "sendEmailCredentials",
    initialState: initialSendEmailCredentialsState,
    reducers: {
        setLoadingSendEmailCredentials: (state, action) => {
            state.loadingSendEmailCredentials = action.payload
        },
        setSendEmailCredentialsSuccess: (state, action) => {
            state.sendEmailCredentialsSuccess = action.payload
        },
        setSendEmailCredentialsError: (state, action) => {
            state.sendEmailCredentialsError = action.payload || null
        },
        resetSendEmailCredentials: (state) => {
            state.sendEmailCredentialsSuccess = false
            state.sendEmailCredentialsError = null
        }
    }
})


const initialDeployAppState = {
    deployAppSuccess: false,
    deployAppError: null,
    loadingDeployApp: false
}
export const deployAppSlice = createSlice({
    name: "deployApp",
    initialState: initialDeployAppState,
    reducers: {
        setLoadingDeployApp: (state, action) => {
            state.loadingDeployApp = action.payload
        },
        setDeployAppSuccess: (state, action) => {
            state.deployAppSuccess = action.payload
        },
        setDeployAppError: (state, action) => {
            state.deployAppError = action.payload || null
        },
        resetDeployApp: (state) => {
            state.deployAppSuccess = false
            state.deployAppError = null
        }
    }
})


const initialDeployFinishedState = {
    deployFinishedSuccess: false,
    deployFinishedError: null,
    loadingDeployFinished: false
}
export const deployFinishedSlice = createSlice({
    name: "deployFinished",
    initialState: initialDeployFinishedState,
    reducers: {
        setLoadingDeployFinished: (state, action) => {
            state.loadingDeployFinished = action.payload
        },
        setDeployFinishedSuccess: (state, action) => {
            state.deployFinishedSuccess = action.payload
        },
        setDeployFinishedError: (state, action) => {
            state.deployFinishedError = action.payload || null
        },
        resetDeployFinished: (state) => {
            state.deployFinishedSuccess = false
            state.deployFinishedError = null
        }
    }
})

const initialDeployAppTestingState = {
    deployAppTestingSuccess: false,
    deployAppTestingError: null,
    loadingDeployAppTesting: false
}
export const deployAppTestingSlice = createSlice({
    name: "deployAppTesting",
    initialState: initialDeployAppTestingState,
    reducers: {
        setLoadingDeployAppTesting: (state, action) => {
            state.loadingDeployAppTesting = action.payload
        },
        setDeployAppTestingSuccess: (state, action) => {
            state.deployAppTestingSuccess = action.payload
        },
        setDeployAppTestingError: (state, action) => {
            state.deployAppTestingError = action.payload || null
        },
        resetDeployAppTesting: (state) => {
            state.deployAppTestingSuccess = false
            state.deployAppTestingError = null
        }
    }
})

const initialAccountCustomerStoreTestingState = {
    accountCustomerStoreTestingSuccess: false,
    accountCustomerStoreTestingError: null,
    loadingAccountCustomerStoreTesting: false
}
export const createAccountCustomerStoreTestingSlice = createSlice({
    name: "accountCustomerStoreTesting",
    initialState: initialAccountCustomerStoreTestingState,
    reducers: {
        setLoadingAccountCustomerStoreTesting: (state, action) => {
            state.loadingAccountCustomerStoreTesting = action.payload
        },
        setAccountCustomerStoreTestingSuccess: (state, action) => {
            state.accountCustomerStoreTestingSuccess = action.payload
        },
        setAccountCustomerStoreTestingError: (state, action) => {
            state.accountCustomerStoreTestingError = action.payload || null
        },
        resetAccountCustomerStoreTesting: (state) => {
            state.accountCustomerStoreTestingSuccess = false
            state.accountCustomerStoreTestingError = null
        }
    }
})