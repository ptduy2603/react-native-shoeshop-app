'use strict'
import { View, Text, Pressable, SafeAreaView, ScrollView, StyleSheet, Image, Alert} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "../untils/GlobalStyles";
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import OptionTag from "../components/OptionTag";
import { deleteAccount } from '../services'
import { setCurrentUserAction } from '../redux/actions'

function AccountDetial({ navigation , route }) {
    const { user } = route.params
    const dispatch = useDispatch()

    const handleDeleteAccount = () => {
        Alert.alert('Thông báo', 
                    'ShoeShop rất tiếc khi bạn không muốn tiếp tục sử dụng dịch vụ của chúng tôi, bạn có chắc muốn xóa tài khoản không?', 
                    [   {text: 'Xóa', onPress: () => { 
                            deleteAccount(user.token)
                                .then(response => {
                                    AsyncStorage.clear()
                                    dispatch(setCurrentUserAction({}, false))
                                })
                                .catch((err) => {
                                    Alert.alert('Thông báo','Xóa tài khoản không thành công')
                                })
                        }}, 
                        { text: 'Hủy yêu cầu', style : 'cancel' }
                    ])
    }

    return ( 
        <SafeAreaView style={{ backgroundColor : '#c3c3c3' }}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable
                        style={[styles.avatarChangeBtn, styles.avatarChangeBtn && { backgroundColor : '#c3c3c3', justifyContent : 'center' , alignItems : 'center' }]}
                        onPress={() => console.log('Change avatar')}
                    >
                        { 
                            user.avatar ? <Image source={{ uri : user.avatar }} style={styles.userImage} /> : <FontAwesome name="user" size={30} color={GlobalStyles.primaryColor} />
                        }
                        <Text style={styles.changeText}>Sửa</Text>
                    </Pressable>
                </View>
                <View style={styles.userInfoContainer}>
                        <OptionTag 
                            title="Tên đăng nhập"
                            content={user.username}
                        />
                        <OptionTag 
                            title="Email"
                            content={user.email}
                            isShowMore
                        />
                        <OptionTag 
                            title="Số điện thoại"
                            content="********05"
                            isShowMore
                        />
                       <OptionTag 
                            title="Đổi mật khẩu"
                            isShowMore
                            handleOnPress={() => navigation.navigate('AdjustPassword')}
                       />
                       <OptionTag 
                            title="Yêu cầu xóa tài khoản"
                            isShowMore
                            handleOnPress={handleDeleteAccount}
                       />
                </View>
            </ScrollView>
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({
    header : {
        height : 160,
        width : '100%',
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor : GlobalStyles.primaryColor,
    },
    avatarChangeBtn : {
        width: 80,
        height : 80,
        borderRadius : 40,
        overflow : 'hidden',
    },
    userImage : {
        width : '100%',
        height : '100%',
        objectFit : 'cover',
        resizeMode : 'cover',
    },
    changeText : {
        position : 'absolute', 
        zIndex : 3, 
        bottom : 4,
        fontSize : 16,
        fontWeight : '600',
        color : '#fff',
    },
    userInfoContainer : {
        flex : 1,
    },
})

export default AccountDetial;