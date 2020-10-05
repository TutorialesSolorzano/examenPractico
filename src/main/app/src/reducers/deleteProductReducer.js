import {
    DELETE_PRODUCT_FINISH, DELETE_PRODUCT_INIT, DELETE_PRODUCT_CLEAR

  } from "../data/types";
  
  const initState = {
    error: null,
    loading: false,
  };
  
  export const deleteProductReducer = (state = initState, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_INIT:
        return {
          error: null,
          loading: true,
        };
  
      case DELETE_PRODUCT_FINISH:
        return {
          error: action.payload.error,
          loading: false,
        };
  
      case DELETE_PRODUCT_CLEAR:
        return initState;
      default:
        return state;
    }
  };