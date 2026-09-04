import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConst";

const initialProductState = {
  products: [],
};

export const productListReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initialProductDetailState = {
  product: { reviews: [] },
};

export const productDetailsReducer = (
  state = initialProductDetailState,
  action,
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

const initialUpdateProductState = {
  product: {},
};

export const updateProductReducer = (
  state = initialUpdateProductState,
  action,
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return initialUpdateProductState;

    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};



export const createProductReviewReducer = (
  state = {},
  action,
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true, };

    case PRODUCT_CREATE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};