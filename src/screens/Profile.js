import { View, Text, StyleSheet, Button, SafeAreaView, Image, Pressable, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../untils/GlobalStyles';
import OptionTag from '../components/OptionTag';
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
                    <OptionTag 
                        title="My account"
                        icon={<FontAwesome name='user' color={GlobalStyles.primaryColor} size={24}/>}
                        isPrimaryTag
                        handleOnPress={() => navigation.navigate('AccountDetail', { user : currentUser })}
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