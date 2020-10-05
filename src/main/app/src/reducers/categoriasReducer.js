import {
  GET_CATEGORIES_FINISH,
  GET_CATEGORIES_INIT,
  GET_CATEGORIES_CLEAR,
} from "../data/types";

const initState = {
  categories: null,
  error: null,
  loading: false,
};

export const categoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_INIT:
      return {
        categories: {},
        error: null,
        loading: true,
      };

    case GET_CATEGORIES_FINISH:
      return {
        categories: action.payload.categories,
        error: action.payload.error,
        loading: false,
      };

    case GET_CATEGORIES_CLEAR:
      return initState;
    default:
      return state;
  }
};
