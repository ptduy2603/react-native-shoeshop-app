import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

import AuthStack from "./AuthStack"
import BottomTabs from "./BottomTabs"

function Navigators() {
    // check if isAuthentication then render MainBottom , else render AuthStack
    const isAuthentication = useSelector(state =>  state.authReducer.isAuthentication)
    
    return (
        <NavigationContainer>
            {isAuthentication ? <BottomTabs /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigators