import axios from "axios";
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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAILURE,
} from "../constants/productConst";

export const listProducts = (keyword = '') => async (dispacth) => {
  try {
    //call the state for loading
    dispacth({ type: PRODUCT_LIST_REQUEST });

    //hit endpoint
    const { data } = await axios.get(`/api/products${keyword}`);

    //map the data
    dispacth({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //dispatch error state with message
    dispacth({
      type: PRODUCT_LIST_FAILURE,
      payload: error.response?.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const topRatedProducts = () => async (dispacth) => {
  try {
    dispacth({ type: TOP_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/products/top/`);

    dispacth({
      type: TOP_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: TOP_PRODUCTS_FAILURE,
      payload: error.response?.data.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispacth) => {
  try {
    dispacth({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispacth({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.post(
      `/api/products/create/`,
      formData,
      config,
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.put(
      `/api/products/update/${id}/`,
      formData,
      config,
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    //to load the new product
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token} `,
      },
    };

    const { data } = await axios.post(
      `/api/products/${productId}/reviews/`,
      review,
      config,
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });


  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.error
        ? error.response.data.error
        : error.message,
    });
  }
};