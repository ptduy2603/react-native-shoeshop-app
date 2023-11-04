import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons, FontAwesome} from '@expo/vector-icons'

import Home from '../screens/Home'
import Cart from '../screens/Cart'
import Favourite from '../screens/Favourite'
import Profile from '../screens/Profile'
import Notification from '../screens/Notification'
import ProductDetail from '../screens/ProductDetail'
import GlobalStyles from '../untils/GlobalStyles'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown : false,
                tabBarActiveTintColor: GlobalStyles.primaryColor,
                tabBarInactiveTintColor : '#000',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '600',
                }
            }}
        >
            <Tab.Screen 
                name='home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? GlobalStyles.primaryColor : '#000'} />
                    }
                }}
            />
            <Tab.Screen 
                name='favourite'
                component={Favourite}
                options={{
                    tabBarLabel: 'Favourite',
                    tabBarIcon: ({ focused }) => {
                        return <FontAwesome name={focused ? 'heart' : 'heart-o'} size={22} color={focused ? GlobalStyles.primaryColor : '#000'} />
                    },
                    tabBarBadge: 3, // temporary hard code
                }}
            />
            <Tab.Screen 
                name='cart'
                component={Cart}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} size={28} color={focused ? GlobalStyles.primaryColor : '#000'} />
                    }
                }}
            />
            <Tab.Screen 
                name='notification'
                component={Notification}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={28} color={focused ? GlobalStyles.primaryColor : '#000'} />
                    },
                    tabBarBadge: 1 // temporary hard code
                }}
            />
            <Tab.Screen 
                name='profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => {
                        return <FontAwesome name={focused ? 'user' : 'user-o'} size={22} color={focused ? GlobalStyles.primaryColor : '#000'} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

function BottomTabs () {
    return (
        <Stack.Navigator
            initialRouteName='main'
        >
            <Stack.Screen  
                name='main'
                component={Main}
                options={{
                    headerShown : false,
                }}
            />
            <Stack.Screen  
                name='productDetail'
                options={{
                    headerTitle : 'Product Detail'
                }}
                component={ProductDetail}
            />
        </Stack.Navigator>
    )
}

export default BottomTabs

