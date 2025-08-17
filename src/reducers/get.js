import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatusState = {
    loggedIn: false,
}
export const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialLoginStatusState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.loggedIn = action.payload
        }
    }
})

const initialLogoutState = {
    logoutSuccess: false,
    logoutError: null,
    loadingLogout: false
}
export const logoutSlice = createSlice({
    name: "logout",
    initialState: initialLogoutState,
    reducers: {
        setLoadingLogout: (state, action) => {
            state.loadingLogout = action.payload
        },
        setSuccessLogout: (state, action) => {
            state.logoutSuccess = action.payload
        }, 
        setErrorLogout: (state, action) => {
            state.logoutError = action.payload || null
        },
        resetLogout: (state) => {
            state.logoutSuccess = false
            state.logoutError = null
        }
    }
})

const initialStoresVerificationState = {
    storesVerificationData: null,
    storesVerificationError: null,
    loadingStoresVerification: false
}
export const storesVerificationSlice = createSlice({
    name: "storesVerification",
    initialState: initialStoresVerificationState,
    reducers: {
        setLoadingStoresVerification: (state, action) => {
            state.loadingStoresVerification = action.payload
        },
        setStoresVerificationData: (state, action) => {
            state.storesVerificationData = action.payload
        },
        setStoresVerificationError: (state, action) => {
            state.storesVerificationError = action.payload || null
        },
        resetStoresVerification: (state) => {
            state.storesVerificationData = null
            state.storesVerificationError = null
        }
    }
})

const initialAccessKeyState = {
    accessKeyData: null,
    accessKeyError: null,
    loadingAccessKey: false
}
export const accessKeySlice = createSlice({
    name: "accessKey",
    initialState: initialAccessKeyState,
    reducers: {
        setLoadingAccessKey: (state, action) => {
            state.loadingAccessKey = action.payload
        },
        setAccessKeyData: (state, action) => {
            state.accessKeyData = action.payload
        },
        setAccessKeyError: (state, action) => {
            state.accessKeyError = action.payload || null
        },
        resetAccessKey: (state) => {
            state.accessKeyData = null
            state.accessKeyError = null
        }
    }
})

