import React from 'react';
import { TouchableOpacity,Image, StatusBar, View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { Fontisto, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';

function Home() {
    const listShoe = [
        {
            id: '0',
            title: 'Giày Thể Thao Cao Cấp Nam Bitis Hunter Street đế',
            price: '1275000',
            image: "https://product.hstatic.net/1000230642/product/z4703770946058_6a961cc309a854194a287ac00ff4a7cb__1__88e555b3752b4bda9b54bbd1fd85ecd9.jpg",
        },
        {
            id: '1',
            title: 'Giày Thể Thao Nam Bitis Hunter Core Z Collection DSMH06400',
            price: '736000',
            image: "https://product.hstatic.net/1000230642/product/dsc_0019_fb488f4fc9f348948f78f7c6dac6e08a_grande.jpg",
        },
    ]
    return (
        <SafeAreaView style={[GlobalStyles.container, styles.Home_container]}>
            <StatusBar style="auto" />

            <View style={styles.userInfo}>
                <View style={styles.hiUser}>
                    <Image
                        style={styles.userImage}
                        source={require('../../assets/images/avatar1.jpg')}
                    />

                    <View style={styles.greetingUser}>
                        <Text style={styles.hiMember}>Hi, Illya!</Text>
                        <Text style={styles.roleMember}>Gold Member</Text>
                    </View>
                </View>
                

                <TouchableOpacity style={styles.notificationIconButton}>
                    <View style={styles.notificationIcon}>
                        <Ionicons name="notifications-outline" size={40} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <SearchItem />

            <Text style={{marginTop:10, fontWeight: 'bold', fontSize: 30, borderBottomColor: 'black', borderBottomWidth: 1}}>Sản phẩm</Text>

            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                {listShoe.map((item, index) => (
                    <Pressable style={{width: 150,margin: 10 }} key={item.id}> 
                        <Image style={{width:150, height: 200, resizeMode:'contain'}} source={{uri:item?.image}} />
                        <Text>{item.title}</Text>
                        <Text>Giá: {item.price} VNĐ</Text>
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Home_container: {
       marginTop: 0,
    },
    userInfo: {
        flexDirection: 'row',
        margin: 20,
        width: '100%',
        justifyContent: 'space-between'
    },
    hiUser: {
        flexDirection: 'row',
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    greetingUser: {
        flexDirection: 'column',
        marginLeft: 10,
        
    },
    hiMember: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    roleMember: {
        fontSize: 16,
        opacity: 0.6,
    },
    notificationIconButton: {
       
    },
    notificationIcon: {
        
    },
});

export default Home;
