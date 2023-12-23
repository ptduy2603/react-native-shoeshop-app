import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

import AuthStack from "./AuthStack"
import Main from "./Main"

function Navigators() {
    // check if token is exists then render MainBottom , else render AuthStack
    const token = useSelector(state =>  state.authReducer.userToken)
    
    return (
        <NavigationContainer>
            {Boolean(token) ? <Main /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigators