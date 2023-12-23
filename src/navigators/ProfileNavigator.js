import { createStackNavigator } from '@react-navigation/stack'

import Profile from "../screens/Profile";
import OrderList from "../screens/OrderList";

const Stack = createStackNavigator()

function ProfileNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='profileScreen'
        >
            <Stack.Screen 
                name='ProfileScreen'
                component={Profile}
                options={{
                    headerShown : false
                }}
            />
            <Stack.Screen 
                name='Order'
                component={OrderList}
                options={{
                    headerTitle : 'Thông tin đơn hàng'
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigator