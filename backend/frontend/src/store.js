import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  createProductReviewReducer,
  getTopRatedProductsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  createOderReducer,
  getOrderDetailsReducer,
  getOrdersListReducer,
  getUserOrderListReducer,
  orderDeliveredReducer,
  orderPaymentReducer,
} from "./reducers/orderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    topRatedProducts: getTopRatedProductsReducer,
    addProduct: createProductReducer,
    editProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    createProductReview: createProductReviewReducer,

    cart: cartReducer,
    userList: userListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderList: getOrdersListReducer,
    createOrder: createOderReducer,
    orderDetails: getOrderDetailsReducer,
    payOrder: orderPaymentReducer,
    deliverOrder: orderDeliveredReducer,
    userOrderList: getUserOrderListReducer,

    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
  },
  preloadedState: initialState,
});

export default store;
