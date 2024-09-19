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
    },
    singleDepartmentRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    singleDepartmentSuccess(state, action) {
      return {
        ...state,
        loading: false,
        singleDepartmentDetail: action.payload.data,
      };
    },
    singleDepartmentFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    departmentDeleteRequest(state, action) {
      return {
        loading: true,
      };
    },
    departmentDeleteSuccess(state, action) {
      return {
        loading: false,
        message: action.payload.message,
      };
    },
    departmentDeleteFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    departmentUpdateRequest(state, action) {
      return {
        loading: true,
      };
    },
    departmentUpdateSuccess(state, action) {
      return {
        loading: false,
        // departmentName: action.payload.data,
        message: action.payload.message,
      };
    },
    departmentUpdateFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearDepartmentError(state, action) {
      return {
        ...state,
        error: undefined,
        message: undefined,
      };
    },
  },
});

export const {
  departmentListRequest,
  departmentListSuccess,
  departmentListFail,
  departmentAddRequest,
  departmentAddSuccess,
  departmentAddFail,
  clearDepartmentError,
  departmentDeleteRequest,
  departmentDeleteSuccess,
  departmentDeleteFail,
  singleDepartmentRequest,
  singleDepartmentSuccess,
  singleDepartmentFail,
  departmentUpdateRequest,
  departmentUpdateSuccess,
  departmentUpdateFail,
} = departmentSlice.actions;

export default departmentSlice.reducer;
