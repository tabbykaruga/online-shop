import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from '../constants/orderConst'
import { CART_CLEAR_ITEMS } from '../constants/cartConst'

export const createOrder = (order) => async (dispacth, getState) => {
    try {
        dispacth({ type: CREATE_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token} `
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispacth({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

        dispacth({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')
        
    } catch (error) {
        dispacth({
            type: CREATE_ORDER_FAILURE,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        })
    }
}