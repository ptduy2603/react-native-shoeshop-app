import { SET_CART_DATA } from "../actions"

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
        default :
            return state
    }
}

export default cartReducer