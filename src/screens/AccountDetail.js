'use strict'
import { View, Text, Pressable, SafeAreaView, ScrollView, StyleSheet, Image} from "react-native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import GlobalStyles from "../untils/GlobalStyles";

import OptionTag from "../components/OptionTag";

function AccountDetial({ route }) {
    const { user } = route.params

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
                       />
                       <OptionTag 
                            title="Yêu cầu xóa tài khoản"
                            isShowMore
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