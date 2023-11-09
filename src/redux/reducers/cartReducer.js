import { ADD_PRODUCT_TO_CART } from "../actions"

const initState = {
    cart : [] 
}

const cartReducer = (state=initState, action) => {
    switch(action.type)
    {
        case ADD_PRODUCT_TO_CART :
            return {
                ...state,
                cart : [...state.cart, action.payload]
            }
        default :
            return state
    }
}

export default cartReducer