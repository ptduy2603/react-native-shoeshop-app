import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome} from '@expo/vector-icons'

import Home from '../screens/Home'
import Cart from '../screens/Cart'
import Favourite from '../screens/Favourite'
import Profile from '../screens/Profile'
import GlobalStyles from '../untils/GlobalStyles'

const Tab = createBottomTabNavigator()

function BottomTabs () {
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
                    tabBarBadge: 3,
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

export default BottomTabs