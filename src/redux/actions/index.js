// auth actions
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const setCurrentUserAction = (token) => {
    return {
        type: SET_USER_TOKEN,
        payload: token,
    };
};

// Products actions
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const setProductsAction = (products) => {
    return {
        type : SET_PRODUCTS,
        payload : products
    }
}

//cart actions
export const SET_CART_DATA = 'SET_CART_DATA';
export const setCartAction = (products) => {
    return {
        type: SET_CART_DATA,
        payload: products,
    };
};

// favourites actions
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const addToFavoritesAction = (products) => ({
    type: ADD_TO_FAVORITES,
    payload: products,
});
