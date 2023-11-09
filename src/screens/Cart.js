import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable} from 'react-native'
import { useState } from 'react';
import GlobalStyles from '../untils/GlobalStyles';

import CartItem from '../components/CartItem';
import formatCurrency from '../untils/formatCurrency';

// test with mock data temporaryly
const mockProduct = {
    name : 'Giày hoa hồng nam',
    code : 'PD123',
    image : 'https://centimet.vn/wp-content/uploads/Giay-Gucci-Ace-Embroidered-Sneaker09856.jpg',
    price : '1000000',
    quantity : 1,
    size : 44,
    color : 'red'
}

function Cart({ navigation }) {
    const [totalPrice, setTotalPrice] = useState(1000000)
    
    const handleUpdateTotalPrice = (value) => {
        setTotalPrice(prevState => prevState + value)
    }

    return ( 
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.productList}
            >
                <CartItem 
                    product={mockProduct}
                    handleOnPress={() => navigation.navigate('productDetail', { product : mockProduct })}
                    handleUpdateTotalPrice={handleUpdateTotalPrice}
                />
                <CartItem 
                    product={mockProduct}
                    handleOnPress={() => navigation.navigate('productDetail', { product : mockProduct })}
                    handleUpdateTotalPrice={handleUpdateTotalPrice}
                />
                <CartItem 
                    product={mockProduct}
                    handleOnPress={() => navigation.navigate('productDetail', { product : mockProduct })}
                    handleUpdateTotalPrice={handleUpdateTotalPrice}
                />
                <CartItem 
                    product={mockProduct}
                    handleOnPress={() => navigation.navigate('productDetail', { product : mockProduct })}
                    handleUpdateTotalPrice={handleUpdateTotalPrice}
                />
            </ScrollView>
            <View style={styles.controllSection}>
                <View>
                    <Text style={{ fontSize : 20, fontWeight : '800' }}>Totals</Text>
                    <Text style={{ fontSize : 16, fontWeight : '500' }}>{formatCurrency(totalPrice)} VNĐ</Text>
                </View>
                <Pressable 
                    style={styles.checkoutBtn}
                    onPress={() => console.log('Check out')}
                >
                    <Text style={{ fontSize : 18, fontWeight : '800', color : '#fff' }}>Checkout</Text>
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