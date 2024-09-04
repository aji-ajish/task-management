import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
        message: action.payload.message,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload.message,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    singleUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    singleUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        singleUserDetail: action.payload.data,
      };
    },
    singleUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    profileUpdateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    profileUpdateSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.data,
        message: action.payload.message,
      };
    },
    profileUpdateFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    changePasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    changePasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    changePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getAllUsersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getAllUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userList: action.payload,
      };
    },
    getAllUsersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateSingleUsersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateSingleUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
      };
    },
    updateSingleUsersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUsersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
      };
    },
    deleteUsersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    addUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        // isAuthenticated: true,
        // user: action.payload.data,
        message: action.payload.message,
      };
    },
    addUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    forgotPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    forgotPasswordSuccess(state, action) {
      return {
        loading: false,
        message: action.payload.message,
        activationToken: action.payload.activationToken,
      };
    },
    forgotPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    otpVerifyRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    otpVerifySuccess(state, action) {
      return {
        loading: false,
        message: action.payload.message,
        userId: action.payload.userId,
      };
    },
    otpVerifyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        loading: false,
        message: action.payload.message,
      };
    },
    resetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearError(state, action) {
      return {
        ...state,
        error: undefined,
        message: undefined,
      };
    },
    clearAuthToken(state, action) {
      return {
        ...state,
        error: undefined,
        message: undefined,
        activationToken: undefined,
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearError,
  singleUserRequest,
  singleUserSuccess,
  singleUserFail,
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateFail,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  updateSingleUsersRequest,
  updateSingleUsersSuccess,
  updateSingleUsersFail,
  deleteUsersRequest,
  deleteUsersSuccess,
  deleteUsersFail,
  addUserRequest,
  addUserSuccess,
  addUserFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFail,
  clearAuthToken,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;
export default authSlice.reducer;
