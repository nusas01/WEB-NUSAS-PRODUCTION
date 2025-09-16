import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { 
  navbarSlice,
} from './reducers'
import {
    loginStatusSlice,
    logoutSlice,
    storesVerificationSlice,
    accessKeySlice,
    accountTestingCustomerStoreSlice,
    accessKeyStoreTestingSlice,
    storeRequiredVerifiedSlice,
    tenantSubmissionChangePaymentSlice,
    transactionPendingSlice, 
    transactionPaidSlice, 
    transactionSubmissionPendingSlice,
    transactionSubmissionPaidSlice,
    tenantsSlice,
    tenantStoresSlice,
    findTransactionSlice,
    findTransactionSubmissionChangePaymentGatewaySlice,
} from './get'
import {
    loginSlice,
    sendEmailCredentialsSlice,
    deployAppSlice,
    deployFinishedSlice,
    deployAppTestingSlice,
    createAccountCustomerStoreTestingSlice,
    startChangePaymentGatewaySlice,
    finishedChangePaymentGatewaySlice,
    sendEmailUpdateChangePaymentGatewaySlice,
    checkPendingTransactionSlice,
    checkPendingSubmissionTransactionSlice,
    paymentGatewayFailedSlice,
    changePaymentGatewayFailedSlice,
    signupSlice,
    forgotPasswordSlice,
} from './post'
import {
  signupVerificationSlice
} from './patch'
import {
  statusExpiredUserTokenSlice
} from './expToken'

// 1. Reducer yang dipersist
const persistedReducers = combineReducers({
  navbar: navbarSlice.reducer,
  loginStatus: loginStatusSlice.reducer,
  storesVerification: storesVerificationSlice.reducer,
  accountTestingCustomerStore: accountTestingCustomerStoreSlice.reducer,
  storeRequiredVerified: storeRequiredVerifiedSlice.reducer,
  tenantSubmissionChangePayment: tenantSubmissionChangePaymentSlice.reducer,
  transactionPaid: transactionPaidSlice.reducer,
  transactionPending: transactionPendingSlice.reducer,
  transactionSubmissionPending: transactionSubmissionPendingSlice.reducer,
  transactionSubmissionPaid: transactionSubmissionPaidSlice.reducer,
  tenants: tenantsSlice.reducer,
  tenantStores: tenantStoresSlice.reducer,
})

// 2. Konfigurasi persist
const persistConfig = {
  key: 'persisted',
  storage: sessionStorage,
}

// 3. Reducer yang tidak dipersist
const nonPersistedReducers = {
  loginState: loginSlice.reducer,
  logoutState: logoutSlice.reducer,
  signupState: signupSlice.reducer,
  sendEmailCredentialsState: sendEmailCredentialsSlice.reducer,
  deployAppState: deployAppSlice.reducer,
  deployFinishedState: deployFinishedSlice.reducer,
  accessKeyState: accessKeySlice.reducer,
  deployAppTestingState: deployAppTestingSlice.reducer,
  createAccountCustomerStoreTestingState: createAccountCustomerStoreTestingSlice.reducer,
  accessKeyStoreTestingState: accessKeyStoreTestingSlice.reducer,
  startChangePaymentGatewayState: startChangePaymentGatewaySlice.reducer,
  finishedChangePaymentGatewayState: finishedChangePaymentGatewaySlice.reducer,
  sendEmailUpdateChangePaymentGatewayState: sendEmailUpdateChangePaymentGatewaySlice.reducer,
  checkPendingTransactionState: checkPendingTransactionSlice.reducer,
  checkPendingSubmissionTransactionState: checkPendingSubmissionTransactionSlice.reducer,
  statusExpiredUserTokenState: statusExpiredUserTokenSlice.reducer,
  paymentGatewayFailedState: paymentGatewayFailedSlice.reducer,
  changePaymentGatewayFailedState: changePaymentGatewayFailedSlice.reducer,
  signupVerificationState: signupVerificationSlice.reducer,
  forgotPasswordState: forgotPasswordSlice.reducer,
  findTransactionState: findTransactionSlice.reducer,
  findTransactionSubmissionChangePaymentGatewayState: findTransactionSubmissionChangePaymentGatewaySlice.reducer,
}

const rootReducer = combineReducers({
  persisted: persistReducer(persistConfig, persistedReducers), 
  ...nonPersistedReducers,
})

export const tenant = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(tenant)

export default tenant