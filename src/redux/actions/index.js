import { fetchProductsFromServer } from "../../services"

// auth actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUserAction = (user, isAuthentication) => {
    return {
        type : 'SET_CURRENT_USER',
        payload : {
            user,
            isAuthentication
        }
    }
}

// products action
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProductsAction = (products) => {
   return {
        type : FETCH_PRODUCTS,
        payload : products
   }
}

//cart actions
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const FETCH_DATA_TO_CART = 'FETCH_DATA_TO_CART'
export const addProductAction = (product) => {
    return {
        type : ADD_PRODUCT_TO_CART,
        payload : product
    }
}

