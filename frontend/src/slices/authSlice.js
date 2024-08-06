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
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload.message
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        loadUserRequest(state,action) {
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
                loading: false
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
    logoutSuccess,
    logoutFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    clearError
} = authSlice.actions
export default authSlice.reducer