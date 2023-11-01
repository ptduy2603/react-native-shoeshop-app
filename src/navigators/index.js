import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

import AuthStack from "./AuthStack"
import BottomTabs from "./BottomTabs"

function Navigators() {
    // check if have user token then render MainBottom , else render AuthStack
    const userToken = useSelector(state =>  state.authReducer.userToken)
    
    return (
        <NavigationContainer>
            {Boolean(userToken) ? <BottomTabs /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Navigators