import axios from "axios";
import { statusExpiredUserTokenSlice } from '../reducers/expToken'
import { deleteEmployeeTestingStoreSlice } from '../reducers/delete' 

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const { setDeleteEmployeeTestingStoreData, setDeleteEmployeeTestingStoreError, setLoadingDeleteEmployeeTestingStore } = deleteEmployeeTestingStoreSlice.actions
export const deleteEmployeeTestingStore = (employeeId) => {
    return async (dispatch) => {
        dispatch(setLoadingDeleteEmployeeTestingStore(true))
        try {
            const response = await  axios.delete(`${process.env.REACT_APP_DELETE_EMPLOYEE_TESTING_STORE}`, {
                headers: {
                    "x-api-key-internal-nusas": process.env.REACT_APP_API_KEY_INTERNAL_NUSAS,
                },
                withCredentials: true, 
                params: {
                    employee_id: employeeId, 
                }
            })
            dispatch(setDeleteEmployeeTestingStoreData(response?.data?.success))
        } catch (error) {
            if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
                dispatch(setStatusExpiredUserToken(true));
            }
            dispatch(setDeleteEmployeeTestingStoreError(error.response?.data?.error))
        } finally {
            dispatch(setLoadingDeleteEmployeeTestingStore(false))
        }
    }
}