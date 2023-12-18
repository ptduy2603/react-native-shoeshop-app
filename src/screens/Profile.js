import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../untils/GlobalStyles';
import AppLoading from '../components/AppLoading';
import OptionTag from '../components/OptionTag';
import { fetchUser } from '../services'
import { useEffect, useState } from 'react';

function Profile({ navigation }) {
    const token = useSelector(state => state.authReducer.userToken)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUser(token)
            .then(response => {
                setUser(response.data.user)
                setIsLoading(false)
            })
            .catch(error => console.error(error))
        console.log('Fetch user information')
    }, [])

    const handleLogout = () => {
        AsyncStorage.clear()
        dispatch(setCurrentUserAction(''))
    }

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { paddingVertical : 0, paddingHorizontal : 0, backgroundColor : 'ligthgrey'}]}>
            {
                isLoading ? (
                    <AppLoading backgroundColor='#fff' />
                ) : (
                    <>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ width : '100%' }}>
                                <View style={styles.header}>
                                    <Image 
                                        style={styles.userImage}
                                        source={user?.avatar ? { uri : user?.avatar } : require('../../assets/images/default_avatar.png')}
                                    />
                                    <Text style={styles.username}>{user?.username}</Text>
                                </View>
                                <View style={styles.container}>
                                    <OptionTag 
                                        title="My account"
                                        icon={<FontAwesome name='user' color={GlobalStyles.primaryColor} size={24}/>}
                                        isPrimaryTag
                                        handleOnPress={() => navigation.navigate('AccountDetail', { user })}
                                        isShowMore
                                    />
                    
                                    <OptionTag 
                                        title="Log out"
                                        icon={<MaterialIcons name='logout' color={GlobalStyles.primaryColor} size={24}/>}
                                        isPrimaryTag
                                        handleOnPress={handleLogout}
                                        isShowMore
                                    />
                    
                                </View>
                        </ScrollView>
                    </>
                )
            }
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : GlobalStyles.primaryColor,
        width: '100%',
        alignItems : 'center',
        paddingVertical : 10,
    },
    userImage : {
        width : 100,
        height : 100,
        borderRadius : 50,
        resizeMode : 'cover',
        objectFit : 'contain',
    },
    username : {
        fontSize : 26,
        fontWeight : '800',
        textTransform : 'capitalize',
        color : '#fff',
    },
    container : {
        width : '100%',   
        paddingHorizontal : 20,
        paddingVertical : 12,     
    },
})

export default Profile;