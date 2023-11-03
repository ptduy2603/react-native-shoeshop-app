// auth actions
export const setCurrentUserAction = (user, isAuthentication) => {
    return {
        type : 'SET_CURRENT_USER',
        payload : {
            user,
            isAuthentication
        }
    }
}


