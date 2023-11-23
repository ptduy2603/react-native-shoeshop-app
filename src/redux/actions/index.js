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

// products actions
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProductsAction = (products) => {
   return {
        type : FETCH_PRODUCTS,
        payload : products
   }
}

//cart actions
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_CART_DATA = 'SET_CART_DATA'
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY'
export const DESCREASE_PRODUCT_QUANTITY = 'DESCREASE_PRODUCT_QUANTITY'
export const addProductAction = (product) => {
    return {
        type : ADD_PRODUCT_TO_CART,
        payload : product
    }
}
export const setCartAction = (products) => {
    return {
        type : SET_CART_DATA,
        payload : products
    }
}
export const increaseProductQuantityAction = (productId) => {
    return {
        type : INCREASE_PRODUCT_QUANTITY,
        payload : productId
    }
}
export const decreaseProductQuantityAction = (productId) => {
    return {
        type : DECREASE_PRODUCT_QUANTITY,
        payload : productId
    }
}
export const removeProductFromCartAction = (productId) => {
    return {
        type : REMOVE_FROM_CART,
        payload : productId
    }
}

