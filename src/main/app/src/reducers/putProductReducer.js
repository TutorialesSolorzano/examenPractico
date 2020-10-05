import {
    PUT_PRODUCT_FINISH, PUT_PRODUCT_INIT, PUT_PRODUCT_CLEAR

  } from "../data/types";
  
  const initState = {
    productU: null,
    error: null,
    loading: false,
  };
  
  export const putProductReducer = (state = initState, action) => {
    switch (action.type) {
      case PUT_PRODUCT_INIT:
        return {
          productU: {},
          error: null,
          loadingU: true,
        };
  
      case PUT_PRODUCT_FINISH:
        return {
          productU: action.payload.product,
          error: action.payload.error,
          loadingU: false,
        };
  
      case PUT_PRODUCT_CLEAR:
        return initState;
      default:
        return state;
    }
  };