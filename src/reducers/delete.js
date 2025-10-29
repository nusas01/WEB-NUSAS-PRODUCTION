import { createSlice } from "@reduxjs/toolkit";

const initialDeleteEmployeeTestingStoreState = {
    deleteEmployeeTestingStoreId: null,
    deleteEmployeeTestingStoreError: null,
    loadingDeleteEmployeeTestingStore: false
}
export const deleteEmployeeTestingStoreSlice = createSlice({
    name: "deleteEmployeeTestingStore",
    initialState: initialDeleteEmployeeTestingStoreState,
    reducers: {
        setLoadingDeleteEmployeeTestingStore: (state, action) => {
            state.loadingDeleteEmployeeTestingStore = action.payload
        },
        setDeleteEmployeeTestingStoreData: (state, action) => {
            state.deleteEmployeeTestingStoreId = action.payload || null
        },
        setDeleteEmployeeTestingStoreError: (state, action) => {
            state.deleteEmployeeTestingStoreError = action.payload || null
        },
        resetdeleteEmployeeTestingStore: (state) => {
            state.deleteEmployeeTestingStoreId = null
            state.deleteEmployeeTestingStoreError = null
        },
    }
})