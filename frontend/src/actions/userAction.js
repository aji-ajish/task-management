import axios from "axios";
import {
  addUserFail,
  addUserRequest,
  addUserSuccess,
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
  clearError,
  deleteUsersFail,
  deleteUsersRequest,
  deleteUsersSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  profileUpdateFail,
  profileUpdateRequest,
  profileUpdateSuccess,
  singleUserFail,
  singleUserRequest,
  singleUserSuccess,
  updateSingleUsersFail,
  updateSingleUsersRequest,
  updateSingleUsersSuccess,
} from "../slices/authSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(`/api/v1/user/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/user/logout");
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`/api/v1/user/profile`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const singleUser = (id) => async (dispatch) => {
  try {
    dispatch(singleUserRequest());

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch(singleUserSuccess(data));
  } catch (error) {
    dispatch(singleUserFail(error.response.data.message));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(profileUpdateRequest());

    const { data } = await axios.put(`/api/v1/user/updateProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(profileUpdateSuccess(data));
  } catch (error) {
    dispatch(profileUpdateFail(error.response.data.message));
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(changePasswordRequest());

      const { data } = await axios.put(`/api/v1/user/changePassword`, {
        oldPassword,
        newPassword,
      });
      dispatch(changePasswordSuccess(data));
    } catch (error) {
      dispatch(changePasswordFail(error.response.data.message));
    }
  };

export const getAllUsers = (page, limit) => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await axios.get(
      `/api/v1/user/users?page=${page}&limit=${limit}`
    );
    dispatch(getAllUsersSuccess(data));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const updateSingleUser = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateSingleUsersRequest());

    const { data } = await axios.put(
      `/api/v1/user/updateUser/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(updateSingleUsersSuccess(data));
  } catch (error) {
    dispatch(updateSingleUsersFail(error.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUsersRequest());

    const { data } = await axios.delete(`/api/v1/user/${id}`);
    dispatch(deleteUsersSuccess(data));
  } catch (error) {
    dispatch(deleteUsersFail(error.response.data.message));
  }
};

export const addUser = (formData) => async (dispatch) => {
  try {
    dispatch(addUserRequest());
    const { data } = await axios.post(`/api/v1/user/createUser`, formData);

    dispatch(addUserSuccess(data));
  } catch (error) {
    dispatch(addUserFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};
