import React from 'react';
import { TouchableOpacity,Image, StatusBar, View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { Fontisto, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';

function Home() {
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
