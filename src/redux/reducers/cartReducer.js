import { ADD_PRODUCT } from "../actions"

const initState = {
    cart : [] 
}

const cartReducer = (state=initState, action) => {
    switch(action.type)
    {
        case ADD_PRODUCT :
            return {
                ...state,
                cart : [...state.cart, action.payload]
            }
        default :
            return state
    }
}

export default cartReducer