import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { categoriesReducer } from "../reducers/categoriasReducer";
import { getProductsReducer } from "../reducers/getProductsReducer";
import { postProductReducer } from "../reducers/postProductReducer";
import { putProductReducer } from "../reducers/putProductReducer";
import { deleteProductReducer } from "../reducers/deleteProductReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    getCategories: categoriesReducer,
    getProducts: getProductsReducer,
    postProduct: postProductReducer,
    putProduct: putProductReducer,
    deleteProduct: deleteProductReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    ));