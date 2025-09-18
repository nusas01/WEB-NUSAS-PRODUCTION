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
            state.successLogin = action.payload || false
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
    errorFieldPassword: null,
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
            state.errorForgotPassword = action.payload.error 
            state.errorFieldPassword = action.payload.errorField
        },
        resetForgotPassword: (state) => {
            state.errorForgotPassword = null
            state.succesForgotPassword = false
            state.errorFieldPassword = null
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

const initialSendEmailUpdateChangePaymentGatewayState = {
    sendEmailUpdateChangePaymentGatewaySuccess: null,
    sendEmailUpdateChangePaymentGatewayError: null,
    loadingSendEmailUpdateChangePaymentGateway: false
}
export const sendEmailUpdateChangePaymentGatewaySlice = createSlice({
    name: "sendEmailUpdateChangePaymentGateway",
    initialState: initialSendEmailUpdateChangePaymentGatewayState,
    reducers: {
        setLoadingSendEmailUpdateChangePaymentGateway: (state, action) => {
            state.loadingSendEmailUpdateChangePaymentGateway = action.payload
        },
        setSendEmailUpdateChangePaymentGatewaySuccess: (state, action) => {
            state.sendEmailUpdateChangePaymentGatewaySuccess = action.payload
        },
        setSendEmailUpdateChangePaymentGatewayError: (state, action) => {
            state.sendEmailUpdateChangePaymentGatewayError = action.payload || null
        },
        resetSendEmailUpdateChangePaymentGateway: (state) => {
            state.sendEmailUpdateChangePaymentGatewaySuccess = null
            state.sendEmailUpdateChangePaymentGatewayError = null
        }
    }
})

const initialStartChangePaymentGatewayState = {
    startChangePaymentGatewaySuccess: null,
    startChangePaymentGatewayError: null,
    loadingStartChangePaymentGateway: false
}
export const startChangePaymentGatewaySlice = createSlice({
    name: "startChangePaymentGateway",
    initialState: initialStartChangePaymentGatewayState,
    reducers: {
        setLoadingStartChangePaymentGateway: (state, action) => {
            state.loadingStartChangePaymentGateway = action.payload
        },
        setStartChangePaymentGatewaySuccess: (state, action) => {
            state.startChangePaymentGatewaySuccess = action.payload
        },
        setStartChangePaymentGatewayError: (state, action) => {
            state.startChangePaymentGatewayError = action.payload || null
        },
        resetStartChangePaymentGateway: (state) => {
            state.startChangePaymentGatewaySuccess = null
            state.startChangePaymentGatewayError = null
        }
    }
})

const initialFinishedChangePaymentGatewayState = {
    finishedChangePaymentGatewaySuccess: null,
    finishedChangePaymentGatewayError: null,
    loadingFinishedChangePaymentGateway: false
}
export const finishedChangePaymentGatewaySlice = createSlice({
    name: "finishedChangePaymentGateway",
    initialState: initialFinishedChangePaymentGatewayState,
    reducers: {
        setLoadingFinishedChangePaymentGateway: (state, action) => {
            state.loadingFinishedChangePaymentGateway = action.payload
        },
        setFinishedChangePaymentGatewaySuccess: (state, action) => {
            state.finishedChangePaymentGatewaySuccess = action.payload
        },
        setFinishedChangePaymentGatewayError: (state, action) => {
            state.finishedChangePaymentGatewayError = action.payload || null
        },
        resetFinishedChangePaymentGateway: (state) => {
            state.finishedChangePaymentGatewaySuccess = null
            state.finishedChangePaymentGatewayError = null
        }
    }
})

const initialCheckPendingTransactionState = {
    checkPendingTransactionSuccess: null,
    checkPendingTransactionError: null,
    loadingCheckPendingTransaction: false
}
export const checkPendingTransactionSlice = createSlice({
    name: "checkPendingTransaction",
    initialState: initialCheckPendingTransactionState,
    reducers: {
        setLoadingCheckPendingTransaction: (state, action) => {
            state.loadingCheckPendingTransaction = action.payload
        },
        setCheckPendingTransactionSuccess: (state, action) => {
            state.checkPendingTransactionSuccess = action.payload
        },
        setCheckPendingTransactionError: (state, action) => {
            state.checkPendingTransactionError = action.payload || null
        },
        resetCheckPendingTransaction: (state) => {
            state.checkPendingTransactionSuccess = null
            state.checkPendingTransactionError = null
        }
    }
})


const initialCheckSubmissionPendingTransactionState = {
    checkPendingSubmissionTransactionSuccess: null,
    checkPendingSubmissionTransactionError: null,
    loadingCheckPendingSubmissionTransaction: false
}
export const checkPendingSubmissionTransactionSlice = createSlice({
    name: "checkPendingSubmissionTransaction",
    initialState: initialCheckSubmissionPendingTransactionState,
    reducers: {
        setLoadingCheckPendingSubmissionTransaction: (state, action) => {
            state.loadingCheckPendingSubmissionTransaction = action.payload
        },
        setCheckPendingSubmissionTransactionSuccess: (state, action) => {
            state.checkPendingSubmissionTransactionSuccess = action.payload
        },
        setCheckPendingSubmissionTransactionError: (state, action) => {
            state.checkPendingSubmissionTransactionError = action.payload || null
        },
        resetCheckPendingSubmissionTransaction: (state) => {
            state.checkPendingSubmissionTransactionSuccess = null
            state.checkPendingSubmissionTransactionError = null
        }
    }
})


const initialPaymentGatewayFailedState = {
    paymentGatewayFailedSuccess: null,
    paymentGatewayFailedError: null,
    loadingPaymentGatewayFailed: false
}
export const paymentGatewayFailedSlice = createSlice({
    name: "paymentGatewayFailed",
    initialState: initialPaymentGatewayFailedState,
    reducers: {
        setLoadingPaymentGatewayFailed: (state, action) => {
            state.loadingPaymentGatewayFailed = action.payload
        },
        setPaymentGatewaySuccess: (state, action) => {
            state.paymentGatewayFailedSuccess = action.payload
        },
        setPaymentGatewayFailedError: (state, action) => {
            state.paymentGatewayFailedError = action.payload || null
        },
        resetPaymentGatewayFailed: (state) => {
            state.paymentGatewayFailedSuccess = null
            state.paymentGatewayFailedError = null
        }
    }
})


const initialChangePaymentGatewayFailedState = {
    changePaymentGatewayFailedSuccess: null,
    changePaymentGatewayFailedError: null,
    loadingChangePaymentGatewayFailed: false
}
export const changePaymentGatewayFailedSlice = createSlice({
    name: "changePaymentGatewayFailed",
    initialState: initialChangePaymentGatewayFailedState,
    reducers: {
        setLoadingChangePaymentGatewayFailed: (state, action) => {
            state.loadingChangePaymentGatewayFailed = action.payload
        },
        setChangePaymentGatewaySuccess: (state, action) => {
            state.changePaymentGatewayFailedSuccess = action.payload
        },
        setChangePaymentGatewayFailedError: (state, action) => {
            state.changePaymentGatewayFailedError = action.payload || null
        },
        resetChangePaymentGatewayFailed: (state) => {
            state.changePaymentGatewayFailedSuccess = null
            state.changePaymentGatewayFailedError = null
        }
    }
})


const initialSignupState = {
    signupSuccess: null,
    signupError: null,
    signupErrorField: [],
    loadingSignup: false
}
export const signupSlice = createSlice({
    name: "signup",
    initialState: initialSignupState,
    reducers: {
        setLoadingSignup: (state, action) => {
            state.loadingSignup = action.payload
        },
        setSignupSuccess: (state, action) => {
            state.signupSuccess = action.payload
        },
        setSignupError: (state, action) => {
            state.signupError = action.payload.error || null
            state.signupErrorField = action.payload.errorField || []
        },
        resetSignup: (state) => {
            state.signupSuccess = null
            state.signupError = null
            state.signupErrorField = []
        }
    }
})

