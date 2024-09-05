import axios from "axios";
import {
  departmentListFail,
  departmentListRequest,
  departmentListSuccess,
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
