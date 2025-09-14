import axiosInstance from "./axiosInstance.js";
import {
    signupVerificationSlice
} from '../reducers/patch.js'

const {setSuccessSignupVerification, setErrorSignupVerification, setLoadingSignupVerification} = signupVerificationSlice.actions
export const signupVerification = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "API_KEY_INTERNAL_NUSAS": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
        },
        withCredentials: true,
    }
    dispatch(setLoadingSignupVerification(true))
    try {
        const response = await axiosInstance.patch(`${process.env.REACT_APP_SIGNUP_VERIFICATION}`, data, config)
        dispatch(setSuccessSignupVerification(response?.data?.success))
     } catch (error) {
        dispatch(setErrorSignupVerification({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
        }))
    } finally {
        dispatch(setLoadingSignupVerification(false))
    }
}