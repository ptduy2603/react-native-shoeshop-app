'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Text,
    StyleSheet,
    Pressable,
    View,    
} from 'react-native';

import formatCurrency from '../untils/formatCurrency'

function ProductCard({ product, handleOnPress, extraStyles={} }) {    
    const { colors, name, price } = product

    return (
        <Pressable 
            style={[styles.cardWrapper, extraStyles]}
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
        width: '49%', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 4,         
        borderColor : 'rgba(0,0,0,0.4)',
        overflow: 'hidden',
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width : 0,
            height: 0,
        },
    },
    imageProduct: {
        width: '100%',
        height: 160,
        resizeMode: 'cover'
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

ProductCard.proptypes = {
    product : PropTypes.object.isRequired,
    handleOnPress : PropTypes.func,
}

export default ProductCard;
