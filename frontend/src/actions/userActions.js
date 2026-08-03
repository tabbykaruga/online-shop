import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILURE,
    USER_UPDATE_PROFILE_RESET,
} from '../constants/userConst'

export const login = (email, password) => async (dispacth) => {
    try {
        //call the state for loading
        dispacth({ type: USER_LOGIN_REQUEST })

        //headers
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        //hit endpoint
        const { data } = await axios.post(
            '/api/users/login/',
            {
                'username': email,
                'password': password
            },
            config
        )

        //map the data
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //save in localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        //dispatch error state with message
        dispacth({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const register = (name, email, password) => async (dispacth) => {
    try {
        dispacth({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            {
                'name': name,
                'email': email,
                'password': password
            },
            config
        )

        dispacth({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //login the user automatically
        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispacth({
            type: USER_REGISTER_FAILURE,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const logout = () => async (dispacth) => {
    localStorage.removeItem('userInfo')

    dispacth({
        type: USER_LOGOUT
    })
    //clear the user in state
    dispacth({
        type: USER_DETAILS_RESET
    })
}

export const getUserDeatils = (id) => async (dispacth, getState) => {
    try {
        dispacth({ type: USER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token} `
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispacth({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispacth({
            type: USER_DETAILS_FAILURE,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispacth, getState) => {
    try {
        dispacth({ type: USER_UPDATE_PROFILE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token} `
            }
        }

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )

        dispacth({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispacth({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispacth({
            type: USER_UPDATE_PROFILE_FAILURE,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}