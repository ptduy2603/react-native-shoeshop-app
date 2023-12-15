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

//cart actions
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_CART_DATA = 'SET_CART_DATA'
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY'
export const DESCREASE_PRODUCT_QUANTITY = 'DESCREASE_PRODUCT_QUANTITY'

export const setCartAction = (products) => {
    return {
        type : SET_CART_DATA,
        payload : products
    }
}


