import axios from "axios";
import {
  clearDepartmentError,
  departmentAddFail,
  departmentAddRequest,
  departmentAddSuccess,
  departmentDeleteFail,
  departmentDeleteRequest,
  departmentDeleteSuccess,
  departmentListFail,
  departmentListRequest,
  departmentListSuccess,
  departmentUpdateFail,
  departmentUpdateRequest,
  departmentUpdateSuccess,
  singleDepartmentFail,
  singleDepartmentRequest,
  singleDepartmentSuccess,
} from "../slices/departmentSlice";

export const getDepartmentList = (page, limit) => async (dispatch) => {
  try {
    dispatch(departmentListRequest());

    const { data } = await axios.get(
      `/api/v1/department/departments?page=${page}&limit=${limit}`
    );
    dispatch(departmentListSuccess(data));
  } catch (error) {
    dispatch(departmentListFail(error.response.data.message));
  }
};

export const addDepartment = (formData) => async (dispatch) => {
  try {
    dispatch(departmentAddRequest());

    const { data } = await axios.post(
      `/api/v1/department/createDepartment`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(departmentAddSuccess(data));
  } catch (error) {
    dispatch(departmentAddFail(error.response.data.message));
  }
};

export const singleDepartment = (id) => async (dispatch) => {
  try {
    console.log(id);

    dispatch(singleDepartmentRequest());

    const { data } = await axios.get(`/api/v1/department/${id}`);
    dispatch(singleDepartmentSuccess(data));
  } catch (error) {
    dispatch(singleDepartmentFail(error.response.data.message));
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    dispatch(departmentDeleteRequest());

    const { data } = await axios.delete(`/api/v1/department/${id}`);
    dispatch(departmentDeleteSuccess(data));
  } catch (error) {
    dispatch(departmentDeleteFail(error.response.data.message));
  }
};

export const updateDepartment = (id, departmentName) => async (dispatch) => {
  try {


    dispatch(departmentUpdateRequest());

    const { data } = await axios.put(`/api/v1/department/${id}`, departmentName, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(departmentUpdateSuccess(data));
  } catch (error) {
    dispatch(departmentUpdateFail(error.response.data.message));
  }
};

export const clearDeptError = (dispatch) => {
  dispatch(clearDepartmentError());
};
