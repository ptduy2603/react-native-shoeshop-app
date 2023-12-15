import { Text, StyleSheet, Image, Pressable } from 'react-native';
import GlobalStyles from '../untils/GlobalStyles';

function CategoryButton({ category, handleOnPress, isActive=false }) {
    let image = null
    switch(category.type) {
        case 'hunter' : image = require('../../assets/images/hunter.png');break;
        case 'sport' : image = require('../../assets/images/sport.png');break;
        case 'highHeels' : image = require('../../assets/images/high_heels.png');break;
        case 'western' : image = require('../../assets/images/western.png');break;
        default: image = require('../../assets/images/all.png');break;
    }

    return (
        <Pressable 
            style={[styles.categoryContainer, isActive && { backgroundColor: GlobalStyles.primaryColor }]}
            onPress={handleOnPress}
        >
            <Image 
                source={image} 
                style={styles.categorieImage} 
            />
            <Text style={[styles.categoryName, isActive && { color : '#fff' }]}>{category?.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        minWidth: 90,
        resizeMode: 'contain',
        marginHorizontal: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#c3c3c3c3',
        borderRadius: 10,
    },
    categorieImage : {
        width: '100%',
        height: 20,
        objectFit: 'contain',
        resizeMode: 'contain',
    },
    categoryName : {
        textAlign: 'center',
        fontSize : 12,
        fontWeight: '500',
        marginTop: 4,
    },
})

export default CategoryButton;
