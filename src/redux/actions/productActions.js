import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products){
    return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
  }
  
  export function getProducts(category) {
    return function (dispatch) {
      let url = "https://fakestoreapi.com/products";
      if (category){
        url=url+"?category"+category
      }
      return fetch(url)
        .then((response) => response.json())
        .then((result) => dispatch(getProductsSuccess(result)));
    };
  }
  