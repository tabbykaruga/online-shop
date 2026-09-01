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
  ORDER_LISTS_REQUEST,
  ORDER_LISTS_SUCCESS,
  ORDER_LISTS_FAILURE,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAILURE,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConst";

export const createOderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
        loading: true,
      };

    case ORDER_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVERED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_DELIVERED_RESET:
      return {};

    default:
      return state;
  }
};

const intialUserOrderListState = {
  orders: [],
};

export const getUserOrderListReducer = (
  state = intialUserOrderListState,
  action,
) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case USER_ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_ORDER_LIST_RESET:
      return {};

    default:
      return state;
  }
};

const intialOrdersListState = {
  orders: [],
};

export const getOrdersListReducer = (state = intialOrdersListState, action) => {
  switch (action.type) {
    case ORDER_LISTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_LISTS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
