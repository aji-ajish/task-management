import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        isAuthenticated: false,
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
                user: action.payload.user,
                message: action.payload.message
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
                loading: false
            }
        },
        singleUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        singleUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            }
        },
        singleUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        profileUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        profileUpdateSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                message: action.payload.message,
            }
        },
        profileUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        changePasswordRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        changePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status
            }
        },
        changePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: undefined,
                message: undefined
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
} = authSlice.actions
export default authSlice.reducer