// auth actions
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const setCurrentUserAction = (token) => {
    return {
        type: 'SET_USER_TOKEN',
        payload: token,
    };
};

//cart actions
export const SET_CART_DATA = 'SET_CART_DATA';

export const setCartAction = (products) => {
    return {
        type: SET_CART_DATA,
        payload: products,
    };
};

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const addToFavoritesAction = (product) => ({
    type: 'ADD_TO_FAVORITES',
    payload: product,
});
