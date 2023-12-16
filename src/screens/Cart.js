import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Modal} from 'react-native'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import GlobalStyles from '../untils/GlobalStyles';
import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton'
import { fetchProductsFromServer } from '../services'
import AppLoading from '../components/AppLoading'
import formatCurrency from '../untils/formatCurrency';

function Cart({ navigation }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentProductId, setCurrentProductId] = useState('')
    
    const cart = useSelector(state => state.cartReducer.cart)
    
    useEffect(() => {
        fetchProductsFromServer()
            .then(response => {
                const products = response.data.products.map(productSection => productSection.data).flat(1)
                let userCart = []
                cart.forEach(cartProduct => {
                    const product = products.find(product => product._id.toString() === cartProduct.productId.toString())
                    userCart.push({
                        ...cartProduct,
                        name : product?.name,
                        price : product?.price,
                        code : product?.code,
                    })
                })
                setCartProducts(userCart)
                setProducts(products)
                setIsLoading(false)
            })
            .catch(error => console.error(error))
        console.log("Fetch user's cart")
    }, [cart])
    
    useEffect(() => {
        handleCalculateTotalPrice()
    }, [cartProducts])

    //handler functions 
    const handleCalculateTotalPrice = useCallback(() => {
        let total = cartProducts.reduce((sum, currItem) => {
            return sum + Number(currItem.price)*Number(currItem.quantity)
        }, 0)
        console.log('Update total price')
        setTotalPrice(total)
    }, [cartProducts])

    return ( 
        <SafeAreaView style={styles.container}>
           {
                isLoading ? (
                    <AppLoading isWhiteBackground />
                ) : (
                    !Boolean(cart.length) ? (
                        <View style={styles.container}>
                            <Text>Bạn chưa có sản phẩm trong giỏ hàng</Text>
                            <CustomButton 
                                title={"Thêm sản phẩm mới"}
                                handleOnPress={() => navigation.navigate('Home')}
                            />
                        </View>
                    ) : (
                        <>
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
                                            handleOnPress={() => navigation.navigate('productDetail', { product: products.find(item => item._id.toString() === product.productId.toString()) })}  
                                            setCartProducts={setCartProducts}
                                            setCurrentProductId={setCurrentProductId}
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
                                    <Text style={{ fontSize : 18, fontWeight : '800', color : '#fff' }}>Check out</Text>
                                </Pressable>
                            </View>

                            <Modal
                                visible={Boolean(currentProductId)}
                                animationType='fade'
                                transparent
                            >
                                <View style={styles.modal}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.modalText}>Bạn có chắc muốn xóa sản phẩm không?</Text>
                                        <View style={styles.modalControls}>
                                            <Pressable
                                                style={[styles.modalButton, { backgroundColor : 'red' }]}
                                            >
                                                <Text style={[styles.modalText, { color : '#fff' }]}>Xóa</Text>
                                            </Pressable>
                                            <Pressable
                                                style={[styles.modalButton, { backgroundColor : GlobalStyles.primaryColor }]}
                                                onPress={() => setCurrentProductId('')}
                                            >
                                                <Text style={[styles.modalText, { color : '#fff' }]}>Hủy</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </>
                    )
                )
           }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'rgba(0,0,0,0.01)',
        flex : 1,
    },
    productList : {
        paddingHorizontal : 10,     
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
    },
    modal : {
        justifyContent : 'center',
        flex : 1,
        width : '100%',
        alignItems : 'center',
        backgroundColor : 'rgba(0,0,0,0.3)'
    },
    modalContainer : {
        width : '80%',
        padding : 10,
        backgroundColor : '#fff',
        borderRadius : 4,
    },
    modalText : {
        fontSize : 18,
        fontWeight : '600',        
    },
    modalControls : {
        width : '100%',
        flexDirection : 'row',
        gap : 10,
        marginTop : 40,
    },
    modalButton : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 10,
        borderRadius : 6
    },
})

export default Cart;