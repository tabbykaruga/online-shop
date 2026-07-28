import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
} from '../constants/productConst'


export const listProducts = () => async (dispacth) => {
    try {
        //call the state for loading
        dispacth({ type: PRODUCT_LIST_REQUEST })

        //hit endpoint
        const { data } = await axios.get('/api/products/')

        //map the data
        dispacth({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        //dispatch error state with message
        dispacth({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispacth) => {
    try {
        dispacth({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispacth({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispacth({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}