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

const initialStoreRequiredVerifiedState = {
    dataStoreRequiredVerified: [],
    errorStoreRequiredVerified: null,
    loadingStoreRequiredVerified: false
}
export const storeRequiredVerifiedSlice = createSlice({
    name: "storeRequiredVerified",
    initialState: initialStoreRequiredVerifiedState,
    reducers: {
        setLoadingStoreRequiredVerified: (state, action) => {
            state.loadingStoreRequiredVerified = action.payload
        },
        setStoreRequiredVerifiedData: (state, action) => {
            state.dataStoreRequiredVerified = action.payload || []
        },
        setStoreRequiredVerifiedError: (state, action) => {
            state.errorStoreRequiredVerified = action.payload || null
        },
        resetErrorStoreRequiredVerified: (state) => {
            state.errorStoreRequiredVerified = null
        }
    }
})

const initialTenantSubmissionChangePaymentState = {
    dataTenantSubmissionChangePayment: [],
    errorTenantSubmissionChangePayment: null,
    loadingTenantSubmissionChangePayment: false
}
export const tenantSubmissionChangePaymentSlice = createSlice({
    name: "tenantSubmissionChangePayment",
    initialState: initialTenantSubmissionChangePaymentState,
    reducers: {
        setLoadingTenantSubmissionChangePayment: (state, action) => {
            state.loadingTenantSubmissionChangePayment = action.payload
        },
        setTenantSubmissionChangePaymentData: (state, action) => {
            state.dataTenantSubmissionChangePayment = action.payload || []
        },
        setTenantSubmissionChangePaymentError: (state, action) => {
            state.errorTenantSubmissionChangePayment = action.payload || null
        },
        resetErrorTenantSubmissionChangePayment: (state) => {
            state.errorTenantSubmissionChangePayment = null
        }
    }
})

const initialTransactionPaidState = {
    dataTransactionPaid: [],
    errorTransactionPaid: null,
    loadingTransactionPaid: false
}
export const transactionPaidSlice = createSlice({
    name: "transactionPaid",
    initialState: initialTransactionPaidState,
    reducers: {
        setLoadingTransactionPaid: (state, action) => {
            state.loadingTransactionPaid = action.payload
        },
        setTransactionPaidData: (state, action) => {
            state.dataTransactionPaid = action.payload || []
        },
        setTransactionPaidError: (state, action) => {
            state.errorTransactionPaid = action.payload || null
        },
        resetErrorTransactionPaid: (state) => {
            state.errorTransactionPaid = null
        }
    }
})

const initialTransactionPendingState = {
    dataTransactionPending: [],
    errorTransactionPending: null,
    loadingTransactionPending: false
}
export const transactionPendingSlice = createSlice({
    name: "transactionPending",
    initialState: initialTransactionPendingState,
    reducers: {
        setLoadingTransactionPending: (state, action) => {
            state.loadingTransactionPending = action.payload
        },
        setTransactionPendingData: (state, action) => {
            state.dataTransactionPending = action.payload || []
        },
        setTransactionPendingError: (state, action) => {
            state.errorTransactionPending = action.payload || null
        },
        resetErrorTransactionPending: (state) => {
            state.errorTransactionPending = null
        },
        deleteTransactionPendingById: (state, action) => {
            const id = action.payload
            if (Array.isArray(state.dataTransactionPending)) {
                state.dataTransactionPending = state.dataTransactionPending.filter(
                    item => item.id !== id
                )
            }
        },
    }
})

const initialAccessKeyStoreTestingState = {
    dataAccessKeyStoreTesting: null,
    errorAccessKeyStoreTesting: null,
    loadingAccessKeyStoreTesting: false
}
export const accessKeyStoreTestingSlice = createSlice({
    name: "accessKeyStoreTesting",
    initialState: initialAccessKeyStoreTestingState,
    reducers: {
        setLoadingAccessKeyStoreTesting: (state, action) => {
            state.loadingAccessKeyStoreTesting = action.payload
        },
        setAccessKeyStoreTestingData: (state, action) => {
            state.dataAccessKeyStoreTesting = action.payload
        },
        setAccessKeyStoreTestingError: (state, action) => {
            state.errorAccessKeyStoreTesting = action.payload || null
        },
        resetErrorAccessKeyStoreTesting: (state) => {
            state.errorAccessKeyStoreTesting = null
        },
        resetAccessKeyStoreTesting: (state) => {
            state.dataAccessKeyStoreTesting = null
        },
    }
})


const initialTransactionSubmissionPaidState = {
    dataTransactionSubmissionPaid: [],
    errorTransactionSubmissionPaid: null,
    loadingTransactionSubmissionPaid: false
}
export const transactionSubmissionPaidSlice = createSlice({
    name: "transactionPaidSubmission",
    initialState: initialTransactionSubmissionPaidState,
    reducers: {
        setLoadingTransactionSubmissionPaid: (state, action) => {
            state.loadingTransactionSubmissionPaid = action.payload
        },
        setTransctionSubmissionPaidData: (state, action) => {
            state.dataTransactionSubmissionPaid = action.payload || []
        },
        setTransctionSubmissionPaidError: (state, action) => {
            state.errorTransactionSubmissionPaid = action.payload || null
        },
        resetErrorTransctionSubmissionPaid: (state) => {
            state.errorTransactionSubmissionPaid = null
        },
    }
})

const initialTransctionSubmissionPendingState = {
    dataTransctionSubmissionPending: [],
    errorTransctionSubmissionPending: null,
    loadingTransctionSubmissionPending: false
}
export const transactionSubmissionPendingSlice = createSlice({
    name: "transactionSubmissionPending",
    initialState: initialTransctionSubmissionPendingState,
    reducers: {
        setLoadingTransactionSubmissionPending: (state, action) => {
            state.loadingTransctionSubmissionPending = action.payload
        },
        setTransctionSubmissionPendingData: (state, action) => {
            state.dataTransctionSubmissionPending = action.payload || []
        },
        setTransctionSubmissionPendingError: (state, action) => {
            state.errorTransctionSubmissionPending = action.payload || null
        },
        resetErrorTransctionSubmissionPending: (state) => {
            state.errorTransctionSubmissionPending = null
        },
        deleteTransactionSubmissionPendingById: (state, action) => {
            const id = action.payload
            if (Array.isArray(state.dataTransctionSubmissionPending)) {
                state.dataTransctionSubmissionPending = state.dataTransctionSubmissionPending.filter(
                    item => item.id !== id
                )
            }
        }
    }
})


