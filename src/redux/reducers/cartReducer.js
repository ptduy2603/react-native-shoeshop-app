import { ADD_PRODUCT_TO_CART, REMOVE_FROM_CART, INCREASE_PRODUCT_QUANTITY, DESCREASE_PRODUCT_QUANTITY, SET_CART_DATA } from "../actions"

const initState = {
    cart : [] 
}

const cartReducer = (state=initState, action) => {
    switch(action.type)
    {
        case SET_CART_DATA : 
            return {
                ...state,
                cart : action.payload
            }
        case ADD_PRODUCT_TO_CART :
            return {
                ...state,
                cart : [...state.cart, action.payload]
            }
        case REMOVE_FROM_CART : 
            return {
                ...state,
                cart : state.cart.map(product => product._id !== action.payload)
            }
        case INCREASE_PRODUCT_QUANTITY :
            return {
                ...state,
                cart : state.cart.map(product => {
                    if(product._id === action.payload)
                        product.quantity += 1
                    return product
                })
            }
        case DESCREASE_PRODUCT_QUANTITY : 
            return {
                ...state,
                cart : state.cart.map(product => {
                    if(product._id === action.payload) {
                       if(product.quantity > 1) 
                            product.quantity -= 1
                    }
                    return product
                })
            }
        default :
            return state
    }
}

export default cartReducer