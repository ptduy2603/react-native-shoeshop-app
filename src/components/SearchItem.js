import React, { useState } from 'react';
import { Pressable, TextInput, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function SearchItem() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        navigation.navigate('RelatedProducts', { searchText });
    };

    return (
        <View style={styles.searchContainer}>
            <Pressable onPress={handleSearch}>
                <Entypo name="magnifying-glass" size={30} color="black" />
            </Pressable>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                spellCheck={false}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={handleSearch}
            />
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
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
});

export default SearchItem;
