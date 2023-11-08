import { createStackNavigator } from '@react-navigation/stack';

import ProductDetail from '../screens/ProductDetail';
import BottomTabs from './BottomTabs';
import AccountDetial from '../screens/AccountDetail';

const Stack = createStackNavigator();

function Main() {
    return (
        <Stack.Navigator 
            initialRouteName="BottomTabs"
        >
            <Stack.Screen
                name="BottomTabs"
                component={BottomTabs}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="productDetail"
                options={{
                    headerTitle: 'Product Detail',
                }}
                component={ProductDetail}
            />
            <Stack.Screen
                name="AccountDetail"
                options={{
                    headerTitle: 'Chi tiết tài khoản',
                }}
                component={AccountDetial}
            />
        </Stack.Navigator>
    );
}

export default Main