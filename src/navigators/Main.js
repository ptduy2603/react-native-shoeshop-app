import { createStackNavigator } from '@react-navigation/stack';

import ProductDetail from '../screens/ProductDetail';
import BottomTabs from './BottomTabs';
import AccountDetial from '../screens/AccountDetail';
import AdjustPassword from '../screens/AdjustPassword';
import Payment from '../screens/Payment';

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
            <Stack.Screen
                name="AdjustPassword"
                options={{
                    headerTitle: 'Thay đổi mật khẩu',
                }}
                component={AdjustPassword}
            />
            <Stack.Screen
                name="Payment"
                options={{
                    headerTitle: 'Thông tin thanh toán',
                }}
                component={Payment}
            />
        </Stack.Navigator>
    );
}

export default Main