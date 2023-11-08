import { View, Text, StyleSheet, Button, SafeAreaView, Image, Pressable, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../untils/GlobalStyles';
import { setCurrentUserAction } from '../redux/actions'

function Profile({ navigation }) {
    const currentUser = useSelector(state => state.authReducer.currentUser)
    const dispatch = useDispatch()

    const handleLogout = () => {
        AsyncStorage.clear()
        dispatch(setCurrentUserAction({}, false))
    }

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { paddingVertical : 0, paddingHorizontal : 0, backgroundColor : 'ligthgrey'}]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width : '100%' }}>
                <View style={styles.header}>
                    <Image 
                        style={styles.userImage}
                        source={currentUser.avatar ? { uri : currentUser.avatar } : require('../../assets/images/default_avatar.png')}
                    />
                    <Text style={styles.username}>{currentUser.username}</Text>
                </View>
                <View style={styles.container}>
                    <Pressable
                        style={styles.optionContainer}
                        onPress={() => navigation.navigate('AccountDetail', { user : currentUser })}
                    >
                        <View style={{ flexDirection : 'row', alignItems : 'center' }}>
                            <FontAwesome name='user' color={GlobalStyles.primaryColor} size={24}/>
                            <Text style={styles.text}>My Account</Text>
                        </View>
                        <Fontisto name='angle-right' color={GlobalStyles.primaryColor} size={18} />
                    </Pressable>
    
                    <Pressable
                        style={styles.optionContainer}
                        onPress={handleLogout}
                    >
                        <View style={{ flexDirection : 'row', alignItems : 'center' }}>
                            <MaterialIcons name='logout' color={GlobalStyles.primaryColor} size={24}/>
                            <Text style={styles.text}>Log out</Text>
                        </View>
                        <Fontisto name='angle-right' color={GlobalStyles.primaryColor} size={20} />
                    </Pressable>
    
                </View>
            </ScrollView>
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
    optionContainer : {
       flexDirection : 'row', 
       paddingHorizontal : 20,
       paddingVertical : 16,
       justifyContent : 'space-between',
       alignItems : 'center',
       marginTop : 30,
       borderRadius : 8,
       backgroundColor : '#fff',
       shadowOffset : {width : -2 , height : 4},
       shadowColor : '#000',
       shadowOpacity : 0.6,
    },
    text : {
        fontSize : 18,
        marginLeft : 10,
        fontWeight : '600',
        color : GlobalStyles.primaryColor,
    }
})

export default Profile;