import axios from 'axios'
import { clearError, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess } from '../slices/authSlice'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        const { data } = await axios.post(`/api/user/login`, { email, password })
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get(`/api/user/profile`)
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}