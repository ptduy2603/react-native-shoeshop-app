// import AsyncStorage from "@react-native-async-storage/async-storage"

// async function getUserToken () {
//     try {
//         const token = await AsyncStorage.getItem('userToken')
//         return token
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// }

const initState = {
    userToken : '',    
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case 'SET_USER_TOKEN' : {
            return {
                ...state,
                userToken: action.payload,
            }
        }           
        default: 
            return state
    }
}

export default authReducer