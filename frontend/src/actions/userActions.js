import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
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
}