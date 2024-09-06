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
    departmentAddRequest(state, action) {
      return {
        loading: true,
      };
    },
    departmentAddSuccess(state, action) {
      return {
        loading: false,
        // data: action.payload.data,
        message: action.payload.message,
      };
    },
    departmentAddFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },clearDepartmentError(state,action){
      return{
        ...state,
        error:undefined,
        message:undefined
      }
    }
  },
});

export const {
  departmentListRequest,
  departmentListSuccess,
  departmentListFail,
  departmentAddRequest,
  departmentAddSuccess,
  departmentAddFail,
  clearDepartmentError
} = departmentSlice.actions;

export default departmentSlice.reducer;
