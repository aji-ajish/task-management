import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    loading: false,
  },
  reducers: {
    departmentListRequest(state, action) {
      return {
        loading: true,
      };
    },
    departmentListSuccess(state, action) {
      return {
        loading: false,
        departmentList: action.payload,
      };
    },
    departmentListFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  departmentListRequest,
  departmentListSuccess,
  departmentListFail,
} = departmentSlice.actions;

export default departmentSlice.reducer;
