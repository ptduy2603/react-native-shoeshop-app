var initState = {
    email: '',
    username: '',
    isAuthentication : false
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER' : {
            return {
                ...state,
                email: action.payload.email,
                username : action.payload.username,
                isAuthentication : action.payload.isAuthentication
            }
        }           
        default: 
            return state
    }
}

export default authReducer