import React from 'react';
import {
    Pressable,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

function SearchItem() {
    return (
        <View style={styles.searchContainer}>
            <Pressable>
                <Entypo
                    name="magnifying-glass"
                    size={30}
                    color="black"
                />
            </Pressable>
            <TextInput style={styles.searchInput} placeholder="Search..." spellCheck={false}/>
            <TouchableOpacity>
                <Ionicons style={styles.filterIcon} name="filter" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 20,
        padding: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,     
    },
    searchInput : {
        flex: 1,
        fontSize: 16,
        marginLeft : 10,
    },
});

export default SearchItem;
