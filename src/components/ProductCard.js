import React from 'react';
import {
    Image,
    Text,
    StyleSheet,
    Pressable,
    View,
} from 'react-native';

import formatCurrency from '../untils/formatCurrency'

function ProductCard({ product, handleOnPress }) {    
    const { specials : { colors }, name, price } = product

    return (
        <Pressable 
            style={styles.cardWrapper}
            onPress={handleOnPress}
        >
            <Image 
                style={styles.imageProduct} 
                source={{ uri: colors[0].image }} 
            />
            <View style={styles.cardInfo}>
                <Text
                    style={styles.name}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {name}
                </Text>
                <Text style={[styles.priceProduct]}>Giá: {formatCurrency(price)} VNĐ</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardWrapper : {
        width: 180,   
        margin: 4,  
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'space-between',
        overflow: 'hidden',
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width : 0,
            height: 0,
        }
    },
    imageProduct: {
        width: '100%',
        height: 160,
    },
    cardInfo: {
        width: '100%',
        padding: 4,
    },
    name: {
        fontWeight: '400',
        fontSize: 16,
    },
    priceProduct: {
        color: 'black',
        fontWeight: '800',
        marginTop: 10,
        fontSize: 16,
    },
});

export default ProductCard;
