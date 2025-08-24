import { createSlice } from "@reduxjs/toolkit";

const initialStatusUserExpiredTokenState = {
    statusExpiredUserToken: false,
}
export const statusExpiredUserTokenSlice = createSlice({
    name: "statusExpiredUserToken",
    initialState: initialStatusUserExpiredTokenState,
    reducers: {
        setStatusExpiredUserToken: (state, action) => {
            state.statusExpiredUserToken = action.payload
        },
        clearStatusExpiredUserToken: (state) => {
            state.statusExpiredUserToken = false
        }
    }
})