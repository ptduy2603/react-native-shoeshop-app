'use strict'
import { View, Text, Pressable, SafeAreaView, ScrollView, StyleSheet, Image, Alert, Modal, Button, Platform} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "../untils/GlobalStyles";
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'

import OptionTag from "../components/OptionTag";
import { deleteAccount } from '../services'
import { setCurrentUserAction } from '../redux/actions'
import { useState } from "react";

function AccountDetial({ navigation , route }) {
    const { user, setUser } = route.params
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(user?.avatar)
    const [isShowModal, setIsShowModal] = useState(false)

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

    const handlePickImage = async (option) => {
        if(Platform.OS !== 'web') {
            if(option === 'library') {
                const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

                if(permission.status === 'granted') {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes : ImagePicker.MediaTypeOptions.Images,
                        allowsEditing : true,
                        aspect: [4,3],
                        quality : 1,
                    })

                    if(!result.canceled){
                        const newAvatar = result.assets[0].uri
                        setAvatar(newAvatar)
                        setUser({...user, avatar : newAvatar})
                        Alert.alert('Message', 'Cập nhật thông tin thành công!')
                    }
                        
                }
            }
            else if (option === 'camera') {
                const permission = await ImagePicker.requestCameraPermissionsAsync()

                if(permission.status === 'granted') {
                    const result = await ImagePicker.launchCameraAsync({
                        quality : 1,
                        allowsEditing : true,
                        aspect : [4,3],
                    })

                    if(!result.canceled) {
                        const newAvatar = result.assets[0].uri
                        setAvatar(newAvatar)
                        setUser({...user, avatar : newAvatar})
                        Alert.alert('Message', 'Cập nhật thông tin thành công!')
                    }
                }
            }
        }
        setIsShowModal(false)
    }

    return ( 
        <SafeAreaView style={{ backgroundColor : '#c3c3c3' }}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable
                        style={[styles.avatarChangeBtn, styles.avatarChangeBtn && { backgroundColor : '#c3c3c3', justifyContent : 'center' , alignItems : 'center' }]}
                        onPress={() => {
                            setIsShowModal(true)
                        }}
                    >
                        { 
                            avatar ? <Image source={{ uri : avatar }} style={styles.userImage} /> : <FontAwesome name="user" size={30} color={GlobalStyles.primaryColor} />
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
            <Modal
                style={styles.modal}
                visible={isShowModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsShowModal(!isShowModal)}
            >
                <View style={styles.modalWrapper}>
                   <View style={styles.modalContent}>
                        <View style={{ minWidth : 100 }}>
                            <Button 
                                title="Chụp ảnh"
                                onPress={() => handlePickImage('camera')}
                            />
                        </View>
                        <View>
                            <Button 
                                title="Chọn từ thư viện"
                                onPress={() => handlePickImage('library')}
                            />
                        </View>
                   </View>
                </View>
            </Modal>
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
        width: 100,
        height : 100,
        borderRadius : 50,
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
    modalWrapper : {
        flex : 1,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',   
        backgroundColor : 'rgba(0,0,0,0.1)'    
    },
    modalContent : {
        flexDirection : 'row',
        gap : 10,
        backgroundColor : '#fff',
        height : 100,
        padding : 20,
        borderRadius : 4,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default AccountDetial