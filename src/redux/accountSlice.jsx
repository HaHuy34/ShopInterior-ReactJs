// file: src/redux/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    lastName: "",
    district: "",
    zipCode: "",
    cityProvince: "",
    phoneNumber: "",
    email: "",
  },
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = accountSlice.actions;
export const selectFormData = (state) => state.form;
export default accountSlice.reducer;
