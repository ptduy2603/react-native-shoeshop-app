import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
import ConfirmOTP from '../screens/ConfirmOTP'
import ResetPassword from '../screens/ResetPassword'

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
                options={{
                    headerShown : false,
                }}
            />
            <Stack.Screen 
                name='SignUp'
                component={SignUp}
            />
            <Stack.Screen 
                name='ForgotPassword'
                component={ForgotPassword}
            />
            <Stack.Screen 
                name='ConfirmOTP'
                component={ConfirmOTP}
            />
            <Stack.Screen 
                name='ResetPassword'
                component={ResetPassword}
            />
        </Stack.Navigator>
    )
}

export default AuthStack