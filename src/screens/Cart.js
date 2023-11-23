import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable} from 'react-native'
import { useEffect, useState } from 'react';
import GlobalStyles from '../untils/GlobalStyles';
import { useSelector } from 'react-redux'

import CartItem from '../components/CartItem';
import formatCurrency from '../untils/formatCurrency';

function Cart({ navigation }) {
    const [totalPrice, setTotalPrice] = useState()
    const cartProducts = useSelector(state => state.cartReducer.cart)

    console.log(cartProducts)
    
    const handleUpdateTotalPrice = (value) => {
        setTotalPrice(prevState => prevState + value)
    }

    useEffect(() => {
        const total = cartProducts.reduce((sum, currItem) => {
            return sum + Number(currItem.productId.price)*Number(currItem.quantity)
        }, 0)
        setTotalPrice(total)
    }, [cartProducts])

    return ( 
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.productList}
            >
               {
                    cartProducts.map((product, index) => {
                        return (
                            <CartItem 
                                key={product.toString()+index}
                                product={product}
                                // handleOnPress={() => navigation.navigate('productDetail', { product })}    
                                handleUpdateTotalPrice={handleUpdateTotalPrice}
                            />
                        )
                    })
               }
            </ScrollView>
            <View style={styles.controllSection}>
                <View>
                    <Text style={{ fontSize : 20, fontWeight : '800' }}>Totals</Text>
                    <Text style={{ fontSize : 16, fontWeight : '500' }}>{formatCurrency(totalPrice)} VNĐ</Text>
                </View>
                <Pressable 
                    style={styles.checkoutBtn}
                    onPress={() => navigation.navigate('Payment', { totalPrice })}
                >
                    <Text style={{ fontSize : 18, fontWeight : '800', color : '#fff' }}>Thanh toán</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgba(0,0,0,0.01)',
        flex : 1,
    },
    productList : {
        paddingHorizontal : 20,     
    },
    controllSection : {
        backgroundColor : '#fff',
        paddingHorizontal : 20,
        minHeight : 60,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    checkoutBtn : {
        minWidth : 200,
        height : 40,
        padding : '10 20',
        borderRadius: 8,
        backgroundColor : GlobalStyles.primaryColor,
        alignItems : 'center',
        justifyContent : 'center',
    }
})

export default Cart;