var initState = {
    currentUser : {} , // current user includes (userToken, username, email, [avatar],...)
    isAuthentication : false
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER' : {
            return {
                ...state,
                currentUser : action.payload.user,
                isAuthentication : action.payload.isAuthentication
            }
        }           
        default: 
            return state
    }
}

export default authReducer