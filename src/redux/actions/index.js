// auth actions
export const setCurrentUserAction = (email, username, isAuthentication) => {
    return {
        type : 'SET_CURRENT_USER',
        payload : {
            email,
            username,
            isAuthentication
        }
    }
}


