import { configureStore } from '@reduxjs/toolkit'
import { productListReducers, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducerS'

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []


const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const store = configureStore({
    reducer: {
        productList: productListReducers,
        productDetails: productDetailsReducer,
        cart: cartReducer
    },
    preloadedState: initialState,
})

export default store