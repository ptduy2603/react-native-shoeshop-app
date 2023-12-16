import { SET_USER_TOKEN } from '../actions'

const initState = {
    userToken : ''
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case SET_USER_TOKEN : {
            return {
                ...state,
                userToken : action.payload,
            }
        }           
        default: 
            return state
    }
}

export default authReducer