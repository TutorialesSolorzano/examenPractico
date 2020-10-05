import {
  POST_PRODUCT_FINISH,
  POST_PRODUCT_INIT,
  POST_PRODUCT_CLEAR,
} from "../data/types";

const initState = {
  product: null,
  error: null,
  loading: false,
};

export const postProductReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_PRODUCT_INIT:
      return {
        product: {},
        error: null,
        loading: true,
      };

    case POST_PRODUCT_FINISH:
      return {
        product: action.payload.product,
        error: action.payload.error,
        loading: false,
      };

    case POST_PRODUCT_CLEAR:
      return initState;
    default:
      return state;
  }
};
