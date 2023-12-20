import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Modal, Image} from 'react-native'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import GlobalStyles from '../untils/GlobalStyles';
import CartItem from '../components/CartItem';
import { setCartAction } from '../redux/actions'
import CustomButton from '../components/CustomButton'
import { fetchProductsFromServer, updateUserCart } from '../services'
import AppLoading from '../components/AppLoading'
import formatCurrency from '../untils/formatCurrency';

function Cart({ navigation }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState({})
    
    const cart = useSelector(state => state.cartReducer.cart)
    const token = useSelector(state => state.authReducer.userToken)
    const dispatch = useDispatch()
    
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
                setProducts(products)
                setCartProducts(userCart)
                handleCalculateTotalPrice(userCart)
                setIsLoading(false)
            })
            .catch(error => console.error(error))
        console.log('Fetch products')
    }, [])
    
    useEffect(() => {          
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
        handleCalculateTotalPrice(userCart)
        console.log("Fetch user's cart")
    }, [cart])

    
    //handler functions 
    const handleCalculateTotalPrice = (newCart) => {
        if(!newCart.length){
            setTotalPrice(0)
            return
        }
        
        let userCart = []
        if(newCart?.[0].price) {
            userCart = [...newCart]
        }
        else {
            newCart.forEach(cartProduct => {
                const product = products.find(product => product._id.toString() === cartProduct.productId.toString())
                userCart.push({
                    ...cartProduct,
                    name : product?.name,
                    price : product?.price,
                    code : product?.code,
                })
            })
        }

        let total = userCart.reduce((sum, currItem) => {
            return sum + Number(currItem.price)*Number(currItem.quantity)
        }, 0)
        console.log('Update total price')
        setTotalPrice(total)
    }

    const handleDeleteProductCart = () => {
        setIsLoading(true)
        const newCart = cart.filter(item => item.productId.toString() !== selectedProduct.productId.toString() || item.size !== selectedProduct.size || item.color.name !== selectedProduct.color.name)
        handleCalculateTotalPrice(newCart)
        updateUserCart(token, newCart)
            .then((res) => {
                setSelectedProduct({})
                dispatch(setCartAction(res.data.cart))
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }

    return ( 
        <SafeAreaView style={styles.container}>
           {
                isLoading ? (
                    <AppLoading backgroundColor={Boolean(!cartProducts.length)? '#fff' : 'transparent'} />
                ) : (
                    !Boolean(cart.length) ? (
                        <View style={styles.noProductContainer}>
                            <Image source={require('../../assets/images/empty_cart.png')} style={styles.emptyCartImage} />
                            <Text style={styles.noProductText}>Bạn chưa có sản phẩm trong giỏ hàng!</Text>
                            <CustomButton 
                                title={"Thêm sản phẩm mới"}
                                extraStyles={styles.noProductButton}
                                handleOnPress={() => navigation.navigate('home')}
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
                                            setSelectedProduct={setSelectedProduct}
                                            handleCalculateTotalPrice={handleCalculateTotalPrice}
                                            setIsLoading={setIsLoading}
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
                                    onPress={() => navigation.navigate('Payment', { totalPrice, products : cartProducts })}
                                >
                                    <Text style={{ fontSize : 18, fontWeight : '800', color : '#fff' }}>Check out</Text>
                                </Pressable>
                            </View>

                            <Modal
                                visible={Boolean(Object.keys(selectedProduct).length)}
                                animationType='fade'
                                transparent
                            >
                                <View style={styles.modal}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.modalText}>Bạn có chắc muốn xóa sản phẩm không?</Text>
                                        <View style={styles.modalControls}>
                                            <Pressable
                                                style={[styles.modalButton, { backgroundColor : 'red' }]}
                                                onPress={handleDeleteProductCart}
                                            >
                                                <Text style={[styles.modalText, { color : '#fff' }]}>Xóa</Text>
                                            </Pressable>
                                            <Pressable
                                                style={[styles.modalButton, { backgroundColor : GlobalStyles.primaryColor }]}
                                                onPress={() => setSelectedProduct({})}
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
        backgroundColor : '#fff',
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
    noProductContainer : {
        width : '100%',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    noProductText : {
        fontSize : 20,
        fontWeight : '600',
        marginBottom : 20,
        color : '#333'
    },
    noProductButton : {
        width : '60%',
        borderRadius : 4,
    },
    emptyCartImage : {
        width : 200,
        height : 200,
        marginVertical : 10
    }
})

export default Cart;