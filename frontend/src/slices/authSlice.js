import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        isAuthenticated: false
    }, reducers: {

        loginRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        }, loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        }, loadUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail
    , clearError } = authSlice.actions
export default authSlice.reducer