import axios from 'axios'
import {
    clearError,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    logoutFail,
    logoutSuccess,
    singleUserFail,
    singleUserRequest,
    singleUserSuccess
} from '../slices/authSlice'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        const { data } = await axios.post(`/api/v1/user/login`, { email, password })
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const logout = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/user/logout');
        dispatch(logoutSuccess(data));
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
}



export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get(`/api/v1/user/profile`)
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}


export const singleUser = (id) => async (dispatch) => {
    try {
        dispatch(singleUserRequest())

        const { data } = await axios.get(`/api/v1/user/${id}`)
        dispatch(singleUserSuccess(data))
    } catch (error) {
        dispatch(singleUserFail(error.response.data.message))
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}
