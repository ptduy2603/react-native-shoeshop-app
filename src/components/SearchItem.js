import React from 'react';
import {
    Pressable,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import GlobalStyles from '../untils/GlobalStyles';
import { Entypo, Ionicons } from '@expo/vector-icons';

function SearchItem() {
    return (
        <View style={Style.search}>
            <Pressable>
                <Entypo
                    style={{ paddingLeft: 10 }}
                    name="magnifying-glass"
                    size={40}
                    color="black"
                />
            </Pressable>
            <TextInput style={{flex: 1}} placeholder="Search..." />
            <TouchableOpacity>
                <Ionicons style={Style.filterIcon} name="filter" size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
}
const Style = StyleSheet.create({
    searchBox: {},
    search: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        gap: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 36,
        borderWidth: 1,
        width: '100%',
        height: 40,
        marginTop: 10,
    },
    filterIcon: {
        paddingRight: 10, 
    },
});

export default SearchItem;
