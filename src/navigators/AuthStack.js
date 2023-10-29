import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()

function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown : false,
            }}

        >
            <Stack.Screen 
                name='Login'
                component={Login}
            />
            <Stack.Screen 
                name='SignUp'
                component={SignUp}
            />
        </Stack.Navigator>
    )
}

export default AuthStack