import {
  GET_CATEGORIES_FINISH,
  GET_CATEGORIES_INIT,
  GET_CATEGORIES_CLEAR,
  GET_PRODUCTS_CLEAR,
  GET_PRODUCTS_FINISH,
  GET_PRODUCTS_INIT,
  POST_PRODUCT_INIT,
  POST_PRODUCT_FINISH,
  POST_PRODUCT_CLEAR,
  PUT_PRODUCT_CLEAR,
  PUT_PRODUCT_FINISH,
  PUT_PRODUCT_INIT,
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_FINISH,
  DELETE_PRODUCT_CLEAR,
} from "../data/types";
import request from "../helpers/httpHelper";

export const startLoadCategories = () => {
  return async (dispatch) => {
    dispatch(initCategories());

    const data = await request
      .get("categorias", null)
      .then((resp) => resp.data)
      .catch((error) => console.log("error__", error));

    dispatch(setCategories(data, {}));
  };
};

const initCategories = () => ({
  type: GET_CATEGORIES_INIT,
});

const setCategories = (dataCategories, error) => {
  console.log(dataCategories);
  return {
    type: GET_CATEGORIES_FINISH,
    payload: {
      categories: dataCategories,
      error: error,
    },
  };
};

export const categoriesClear = () => ({
  type: GET_CATEGORIES_CLEAR,
});

export const startLoadProducts = () => {
  return async (dispatch) => {
    dispatch(initProducts());

    const data = await request
      .get("productos", null)
      .then((resp) => resp.data)
      .catch((error) => console.log("error__", error));

    dispatch(setProducts(data, {}));
  };
};

const initProducts = () => ({
  type: GET_PRODUCTS_INIT,
});

const setProducts = (dataProducts, error) => {
  console.log(dataProducts);
  return {
    type: GET_PRODUCTS_FINISH,
    payload: {
      products: dataProducts,
      error: error,
    },
  };
};

export const productsClear = () => ({
  type: GET_PRODUCTS_CLEAR,
});

export const startSaveProduct = (product) => {
  return async (dispatch) => {
    dispatch(initPostProduct());

    const data = await request
      .post("", product, null)
      .then((resp) => resp.data)
      .catch((error) => console.log("error__", error));
    dispatch(setPostProduct(data, {}));
  };
};

const initPostProduct = () => ({
  type: POST_PRODUCT_INIT,
});

const setPostProduct = (dataProduct, error) => {
  console.log(dataProduct);
  return {
    type: POST_PRODUCT_FINISH,
    payload: {
      products: dataProduct,
      error: error,
    },
  };
};

export const postProductClear = () => ({
  type: POST_PRODUCT_CLEAR,
});

export const startUpdateProduct = (product) => {
    return async (dispatch) => {
      dispatch(initPutProduct());
  
      const data = await request
        .put(`${product.idProduct}`, product, null)
        .then((resp) => resp.data)
        .catch((error) => console.log("error__", error));
      dispatch(setPutProduct(data, {}));
    };
  };
  
  const initPutProduct = () => ({
    type: PUT_PRODUCT_INIT,
  });
  
  const setPutProduct = (dataProduct, error) => {
    console.log(dataProduct);
    return {
      type: PUT_PRODUCT_FINISH,
      payload: {
        productU: dataProduct,
        error: error,
      },
    };
  };
  
  export const putProductClear = () => ({
    type: PUT_PRODUCT_CLEAR,
  });


  export const startDeleteProduct = (idProduct) => {
    return async (dispatch) => {
      dispatch(initDeleteProduct());
  
      const data = await request
        .delete(`${idProduct}`, null)
        .then((resp) => resp)
        .catch((error) => console.log("error__", error));
      dispatch(setDeleteProduct({}));
    };
  };
  
  const initDeleteProduct = () => ({
    type: DELETE_PRODUCT_INIT,
  });
  
  const setDeleteProduct = (error) => {
    return {
      type: DELETE_PRODUCT_FINISH,
      payload: {
        error: error,
      },
    };
  };
  
  export const deleteProductClear = () => ({
    type: DELETE_PRODUCT_CLEAR,
  });
