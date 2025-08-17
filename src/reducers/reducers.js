import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbarInternal",
  initialState: {
    isOpen: false,
    isMobileDeviceType: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsMobileDeviceType: (state, action) => {
       state.isMobileDeviceType = action.payload;
    }
  },
});
