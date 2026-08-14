import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
} from "../constants/orderConst";
import { CART_CLEAR_ITEMS } from "../constants/cartConst";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.post(`/api/orders/add/`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};
