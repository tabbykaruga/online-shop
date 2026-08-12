import { CART_CLEAR_ITEMS } from '../constants/cartConst'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_RESET
} from '../constants/orderConst'

export const createOderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case CREATE_ORDER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}