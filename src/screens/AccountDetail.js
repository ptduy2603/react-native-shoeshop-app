import { View, Text, Pressable, SafeAreaView, ScrollView, StyleSheet, Image} from "react-native";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import GlobalStyles from "../untils/GlobalStyles";

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
                        <Pressable
                            style={styles.userInfo}
                        >
                            <Text style={styles.text}>Tên đăng nhập</Text>
                            <View style={{ flexDirection : 'row', justifyContent : 'center', alignItems : 'center' }}>
                                <Text style={styles.text}>{user.username}</Text>
                                <Fontisto name='angle-right' color='#c3c3c3' size={16} />
                            </View>
                        </Pressable>
                        <Pressable
                            style={styles.userInfo}
                        >
                            <Text style={styles.text}>Email</Text>
                            <View style={{ flexDirection : 'row', justifyContent : 'center', alignItems : 'center' }}>
                                <Text style={styles.text}>{user.email}</Text>
                                <Fontisto name='angle-right' color='#c3c3c3' size={16} />
                            </View>
                        </Pressable>
                        <Pressable
                            style={styles.userInfo}
                        >
                            <Text style={styles.text}>Số điện thoại</Text>
                            <View style={{ flexDirection : 'row', justifyContent : 'center', alignItems : 'center' }}>
                                <Text style={styles.text}>*******05</Text>
                                <Fontisto name='angle-right' color='#c3c3c3' size={16} />
                            </View>
                        </Pressable>

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
    userInfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        backgroundColor : '#fff',
        paddingVertical : 18,
        paddingHorizontal : 16,
        borderBottomWidth : 1,
        borderColor : 'rgba(0,0,0,0.2)'
    },
    text : {
        fontSize : 16,
        fontWeight : '500',
        marginRight : 10,
        color : '#333'
    }
})

export default AccountDetial;