import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatusState = {
    loggedIn: false,
}
export const loginStatusSlice = createSlice({
    name: 'loginStatus',
    initialState: initialLoginStatusState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.loggedIn = action.payload || false
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
    storesVerificationData: [],
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
            state.storesVerificationData = action.payload || []
        },
        setStoresVerificationError: (state, action) => {
            state.storesVerificationError = action.payload || null
        },
        resetErrorStoresVerification: (state) => {
            state.storesVerificationError = null
        },
        removeStoresVerificationById: (state, action) => {
            const idToRemove = action.payload
            state.storesVerificationData = state.storesVerificationData.filter(
                item => item.id !== idToRemove
            )
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


const initialAccountTestingCustomerStoreState = {
    dataAccountTestingCustomerStore: null,
    errorAccountTestingCustomerStore: null,
    loadingAccountTestingCustomerStore: false
}
export const accountTestingCustomerStoreSlice = createSlice({
    name: "accountTestingCustomerStore",
    initialState: initialAccountTestingCustomerStoreState,
    reducers: {
        setLoadingAccountTestingCustomerStore: (state, action) => {
            state.loadingAccountTestingCustomerStore = action.payload
        },
        setAccountTestingCustomerStoreData: (state, action) => {
            state.dataAccountTestingCustomerStore = action.payload
        },
        setAccountTestingCustomerStoreError: (state, action) => {
            state.errorAccountTestingCustomerStore = action.payload || null
        },
        resetErrorAccountTestingCustomerStore: (state) => {
            state.errorAccountTestingCustomerStore = null
        }
    }
})

