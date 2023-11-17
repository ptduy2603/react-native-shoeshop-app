'use strict';
import { Pressable, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'

import formatCurrency from '../untils/formatCurrency';
import { removeProductFromCartAction } from '../redux/actions'
import { useState } from 'react';
import GlobalStyles from '../untils/GlobalStyles';

// product { _id, name, image, price, quantity, size, color, code} from ProductDetail

function CartItem({ product, handleOnPress, handleUpdateTotalPrice }) {
    const [quantity, setQuantity] = useState(product.quantity);
    const dispatch = useDispatch()

    const handleChangeQuantity = (newQuantity) => {
        handleUpdateTotalPrice((newQuantity - quantity) * product.price);
        setQuantity(newQuantity);
    };

    return (
        <Pressable style={styles.cartItemContainer} onPress={handleOnPress}>
            <Image style={styles.productImage} source={{ uri: product.image }} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
                    {product.name}
                </Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Product code: {product.code}</Text>
                    <Text style={styles.text}>Color: {product.color}</Text>
                    <Text style={styles.text}>Size: {product.size}</Text>
                </View>
                <Text style={styles.productPrice}>{formatCurrency(product.price)} VNĐ</Text>
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <NumericInput
                        onChange={(value) => handleChangeQuantity(value)}
                        step={1}
                        minValue={1}
                        rounded
                        iconStyle={{ color: '#fff' }}
                        iconSize={20}
                        totalHeight={40}
                        editable={false}
                        totalWidth={120}
                        textColor={GlobalStyles.primaryColor}
                        rightButtonBackgroundColor={GlobalStyles.primaryColor}
                        leftButtonBackgroundColor={GlobalStyles.primaryColor}
                        value={quantity}
                    />
                    <TouchableOpacity 
                        style={styles.deleteBtn} 
                        activeOpacity={0.5}
                        onPress={() =>  dispatch(removeProductFromCartAction(product._id))}
                    >
                        <AntDesign name="delete" size={26} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 4,
        gap: 10,
        marginTop: 10,
    },
    productImage: {
        width: 120,
        height: '100%',
        objectFit: 'cover',
    },
    productInfo: {
        height: '100%',
        padding: 8,
        flex: 1,
    },
    productName: {
        width: '100%',
        fontWeight: '600',
        fontSize: 20,
    },
    productPrice: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: '800',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.5)',
    },
    deleteBtn: {},
});

CartItem.proptypes = {
    product: PropTypes.object.isRequired,
    handleOnPress: PropTypes.func,
};

export default CartItem;
