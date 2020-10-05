import {
    GET_PRODUCTS_FINISH,
    GET_PRODUCTS_INIT,
    GET_PRODUCTS_CLEAR,
  } from "../data/types";
  
  const initState = {
    products: null,
    error: null,
    loading: false,
  };
  
  export const getProductsReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_PRODUCTS_INIT:
        return {
          products: {},
          error: null,
          loading: true,
        };
  
      case GET_PRODUCTS_FINISH:
        return {
          products: action.payload.products,
          error: action.payload.error,
          loading: false,
        };
  
      case GET_PRODUCTS_CLEAR:
        return initState;
      default:
        return state;
    }
  };
  