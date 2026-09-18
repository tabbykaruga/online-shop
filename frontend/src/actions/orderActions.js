import axios from "../api/axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  ORDER_LISTS_REQUEST,
  ORDER_LISTS_SUCCESS,
  ORDER_LISTS_FAILURE,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAILURE,
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

export const payForOrder =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token} `,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${id}/pay/`,
        paymentResult,
        config,
      );

      dispatch({
        type: ORDER_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_FAILURE,
        payload: error.response?.data?.error
          ? error.response.data.error
          : error.message,
      });
    }
  };

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/delivered/`,
      {},
      config,
    );

    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const getUserOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders/`, config);

    dispatch({
      type: USER_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_LIST_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const getOrderLists = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LISTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);

    dispatch({
      type: ORDER_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LISTS_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};
