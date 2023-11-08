import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

import AuthStack from "./AuthStack"
import Main from "./Main"

function Navigators() {
    // check if isAuthentication then render MainBottom , else render AuthStack
    const isAuthentication = useSelector(state =>  state.authReducer.isAuthentication)
    
    return (
        <NavigationContainer>
            {isAuthentication ? <Main /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigators