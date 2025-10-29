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
        },
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
    loadingTransactionPaid: false,
    page: 1,
    totalRecordTransactionPaid: 0,
    currentPage: 1,
    hasMore: true, 
    isLoadingMore: false,
}
export const transactionPaidSlice = createSlice({
    name: "transactionPaid",
    initialState: initialTransactionPaidState,
    reducers: {
        setLoadingTransactionPaid: (state, action) => {
            if (state.page === 1 && !action.payload.isLoadingMore) {
                state.loadingTransactionPaid = action.payload.loading 
            } else {
                state.hasMore = action.payload.loading
            }
        },
        setTransactionPaidData: (state, action) => {
            const { data, hasMore, page, totalRecord} = action.payload;

            if (page === 1) {
                // reset kalau page 1
                state.dataTransactionPaid = [data || []]
            } else {
                // simpan data per-page
                state.dataTransactionPaid = [
                ...state.dataTransactionPaid,
                data || []
                ]
            }

            state.totalRecordTransactionPaid = totalRecord
            state.hasMore = hasMore
            state.page = page
            state.loadingTransactionPaid = false
            state.isLoadingMore = false
        },
        setTransactionPaidError: (state, action) => {
            state.errorTransactionPaid = action.payload || null
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        resetErrorTransactionPaid: (state) => {
            state.errorTransactionPaid = null
            state.page = 1
            state.isLoadingMore = false
            state.loadingTransactionPaid = false
        }
    }
})

const initialFindTransaction = {
    dataFindTransaction: null, 
    errorFindTransaction: null,
    loadingFindTransaction: false,
}
export const findTransactionSlice = createSlice({
    name: "findTransaction", 
    initialState: initialFindTransaction, 
    reducers: {
        setLoadingFindTransaction: (state, action) => {
            state.loadingFindTransaction = action.payload
        },
        setSuccessFindTransaction: (state, action) => {
            state.dataFindTransaction = action.payload
        }, 
        setErrorFindTransaction: (state, action) => {
            state.errorFindTransaction = action.payload
        }, 
        resetFindTransaction: (state) => {
            state.errorFindTransaction = null
            state.dataFindTransaction = null
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


const initialFindTransactionSubmissionChangePaymentGateway = {
    dataFindTransactionSubmissionChangePaymentGateway: null, 
    errorFindTransactionSubmissionChangePaymentGateway: null,
    loadingFindTransactionSubmissionChangePaymentGateway: false,
}
export const findTransactionSubmissionChangePaymentGatewaySlice = createSlice({
    name: "findTransactionSubmissionChangePaymentGateway", 
    initialState: initialFindTransactionSubmissionChangePaymentGateway, 
    reducers: {
        setLoadingFindTransactionSubmissionChangePaymentGateway: (state, action) => {
            state.loadingFindTransactionSubmissionChangePaymentGateway = action.payload
        },
        setSuccessFindTransactionSubmissionChangePaymentGateway: (state, action) => {
            state.dataFindTransactionSubmissionChangePaymentGateway = action.payload
        }, 
        setErrorFindTransactionSubmissionChangePaymentGateway: (state, action) => {
            state.errorFindTransactionSubmissionChangePaymentGateway = action.payload
        }, 
        resetFindTransactionSubmissionChangePaymentGateway: (state) => {
            state.errorFindTransactionSubmissionChangePaymentGateway = null
            state.dataFindTransactionSubmissionChangePaymentGateway = null
        }
    }
})

const initialTransactionSubmissionPaidState = {
    dataTransactionSubmissionPaid: [],
    errorTransactionSubmissionPaid: null,
    loadingTransactionSubmissionPaid: false,
    page: 1,
    totalRecordTransactionSubmissionPaid: 0,
    currentPage: 1,
    hasMore: true, 
    isLoadingMore: false,
}
export const transactionSubmissionPaidSlice = createSlice({
    name: "transactionPaidSubmission",
    initialState: initialTransactionSubmissionPaidState,
    reducers: {
        setLoadingTransactionSubmissionPaid: (state, action) => {
            if (state.page === 1 && !action.payload.isLoadingMore) {
                state.loadingTransactionSubmissionPaid = action.payload.loading 
            } else {
                state.hasMore = action.payload.loading
            }
        },
        setTransctionSubmissionPaidData: (state, action) => {
            const { data, hasMore, page, totalRecord} = action.payload;

            if (page === 1) {
                // reset kalau page 1
                state.dataTransactionSubmissionPaid = [data || []]
            } else {
                // simpan data per-page
                state.dataTransactionSubmissionPaid = [
                ...state.dataTransactionSubmissionPaid,
                data || []
                ]
            }

            state.totalRecordTransactionSubmissionPaid = totalRecord
            state.hasMore = hasMore
            state.page = page
            state.loadingTransactionSubmissionPaid = false
            state.isLoadingMore = false
        },
        setTransctionSubmissionPaidError: (state, action) => {
            state.errorTransactionSubmissionPaid = action.payload || null
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        resetErrorTransctionSubmissionPaid: (state) => {
            state.errorTransactionSubmissionPaid = null
            state.page = 1
            state.isLoadingMore = false
            state.loadingTransactionSubmissionPaid = false
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


const initialTenantsState = {
    dataTenants: [],
    errorTenants: null,
    loadingTenants: false,
    totalRecordTenants: 0,
    page: 1,
    hasMore: true, 
    isLoadingMore: false,
    currentPage: 1,
}
export const tenantsSlice = createSlice({
    name: "tenants",
    initialState: initialTenantsState,
    reducers: {
        setLoadingTenants: (state, action) => {
            if (state.page === 1 && !action.payload.isLoadingMore) {
                state.loadingTenants = action.payload.loading 
            } else {
                state.hasMore = action.payload.loading
            }
        },
        setTenantsSuccess: (state, action) => {
            const { data, hasMore, page, totalRecord} = action.payload;

            if (page === 1) {
                state.dataTenants = [data || []]
            } else {
                state.dataTenants = [
                    ...state.dataTenants,
                    data || []
                ]
            }

            state.totalRecordTenants = totalRecord
            state.hasMore = hasMore
            state.page = page
            state.loadingTenants = false
            state.isLoadingMore = false
        },
        setTenantsError: (state, action) => {
            state.errorTenants = action.payload || null
            state.isLoadingMore = false
            state.loadingTenants = false
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        resetErrortenants: (state) => {
            state.errorTenants = null
            state.page = 1
            state.isLoadingMore = false
        },
    }
})

const initialFindTenant = {
    dataFindTenant: null, 
    errorFindTenant: null,
    loadingFindTenant: false,
}
export const findTenantSlice = createSlice({
    name: "findTenant", 
    initialState: initialFindTenant, 
    reducers: {
        setLoadingFindTenant: (state, action) => {
            state.loadingFindTenant = action.payload
        },
        setSuccessFindTenant: (state, action) => {
            state.dataFindTenant = action.payload
        }, 
        setErrorFindTenant: (state, action) => {
            state.errorFindTenant = action.payload
        }, 
        resetFindTenant: (state) => {
            state.errorFindTenant = null
            state.dataFindTenant = null
        }
    }
})

const initialTenantStoresState = {
    dataTenantStores: [],
    errorTenantStores: null,
    loadingTenantStores: false,
}
export const tenantStoresSlice = createSlice({
    name: "tenantStores",
    initialState: initialTenantStoresState,
    reducers: {
        setLoadingTenantStores: (state, action) => {
            state.loadingTenantStores = action.payload
        },
        setTenantStoresSuccess: (state, action) => {
            state.dataTenantStores = action.payload || []
        },
        setTenantStoresError: (state, action) => {
            state.errorTenantStores = action.payload || null
        },
        resetErrorTenantStores: (state) => {
            state.errorTenantStores = null
        },
    }
})


const initialStoresExpiredState = {
    dataStoresExpired: [],
    errorStoresExpired: null,
    loadingStoresExpired: false,
}
export const storesExpiredSlice = createSlice({
    name: "storesExpired",
    initialState: initialStoresExpiredState,
    reducers: {
        setLoadingStoresExpired: (state, action) => {
            state.loadingStoresExpired = action.payload
        },
        setStoresExpiredSuccess: (state, action) => {
            state.dataStoresExpired = action.payload || []
        },
        setStoresExpiredError: (state, action) => {
            state.errorStoresExpired = action.payload || null
        },
        resetErrorStoresExpired: (state) => {
            state.errorStoresExpired = null
        },
        deleteStoresExpiredById: (state, action) => {
            const idToDelete = action.payload
            state.dataStoresExpired = state.dataStoresExpired.filter(
                (item) => item.id !== idToDelete
            )
        },
    }
})

const initialEmployeTestingStoreState = {
    employeTestingStoreId: null,
    employeTestingStoreError: null,
    loadingEmployeTestingStore: false
}
export const employeTestingStoreSlice = createSlice({
    name: "employeTestingStore",
    initialState: initialEmployeTestingStoreState,
    reducers: {
        setLoadingEmployeTestingStore: (state, action) => {
            state.loadingEmployeTestingStore = action.payload
        },
        setEmployeTestingStoreData: (state, action) => {
            state.employeTestingStoreId = action.payload || null
        },
        setEmployeTestingStoreError: (state, action) => {
            state.employeTestingStoreError = action.payload || null
        },
        resetErrorEmployeTestingStore: (state) => {
            state.employeTestingStoreError = null
        },
        resetEmployeTestingStore: (state) => {
            state.employeTestingStoreId = null
        },
    }
})


