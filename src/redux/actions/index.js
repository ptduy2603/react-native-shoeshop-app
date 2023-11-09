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
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const addProductAction = (product) => {
    return {
        type : ADD_PRODUCT,
        payload : product
    }
}

