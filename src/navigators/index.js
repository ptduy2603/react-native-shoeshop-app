import { NavigationContainer } from "@react-navigation/native"

import AuthStack from "./AuthStack"

function Navigators() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default Navigators