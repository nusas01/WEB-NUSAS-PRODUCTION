import { createSlice } from "@reduxjs/toolkit";


const initialSignupVerification = {
    successSignupVerification: false,
    errorFieldsSignupVerification: null,
    errorSignupVerification: null,
    loadingSignupVerification: false,
    dataSignupVerification: null, 
}
export const signupVerificationSlice = createSlice({
    name: 'signupVerification',
    initialState: initialSignupVerification,
    reducers: {
        setSuccessSignupVerification: (state, action) => {
            state.successSignupVerification = action.payload || false
        },
        setErrorSignupVerification: (state, action) => {
            state.errorFieldsSignupVerification = action.payload.errorField
            state.errorSignupVerification = action.payload.error
        },
        setLoadingSignupVerification: (state, action) => {
            state.loadingSignupVerification = action.payload
        },
        setDataSignupVerification: (state, action) => {
            state.dataSignupVerification = action.payload
        },
        resetSignupVerification: (state) => {
            state.errorFieldsSignupVerification = null
            state.errorSignupVerification = null
            state.successSignupVerification = false
        }
    }
})