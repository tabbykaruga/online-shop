import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  ORDER_PAYMENT_RESET,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  USER_ORDER_LIST_RESET,
} from "../constants/orderConst";

export const createOderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

const intialGetOrderState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
};

export const getOrderDetailsReducer = (state = intialGetOrderState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAYMENT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

const intialOrderListState = {
  orders: [],
};

export const getUserOrderListReducer = (state = intialOrderListState, action) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };

    case USER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case USER_ORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_ORDER_LIST_RESET:
      return {};

    default:
      return state;
  }
};
