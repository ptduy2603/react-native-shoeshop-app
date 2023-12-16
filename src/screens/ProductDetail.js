import { Text, Button, SafeAreaView, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { useState, useLayoutEffect } from "react";

import { setCartAction } from '../redux/actions'
import { addProductToCart } from '../services'
import GlobalStyles from "../untils/GlobalStyles";

function ProductDetail({ navigation , route }) {
    const { product } = route.params
    const token = useSelector(state => state.authReducer.userToken)
    const cart = useSelector(state => state.cartReducer.cart)
    const [size, setSize] = useState(40)
    const [color , setColor] = useState({ name : 'red', image : 'test' })    // cho user lựa chọn và set lại
    const dispatch = useDispatch()
    
    // product nhận từ home { _id , name, price, colors, sizes,  des, genre, ....} giống dưới database
    // công việc : 
    // render thông tin của sản phẩm colors, sizes ở dạng select
    // user phải lựa chọn đầy đủ thông tin mới dc thêm product vào giỏ hàng
    // ==> Đầu ra cần 1 object product { _id, size (Number), color (Object { type , image }) }
    // nhấn yêu thích để push thông tin product vào Favourites
    // t đã viết sẵn chức năng đẩy product vào giỏ và store redux
    const handleAddProductToCart = () => {
        // kiểm tra điều kiện các trường input và tổng hợp, t chỉ mới test if...else
        const existsProduct = cart.find(cartProduct => cartProduct.productId.toString() === product._id.toString() && cartProduct.size === size && cartProduct.color.name === color.name)
        if(existsProduct)
        {
            Alert.alert('Thông báo', 'Sản phẩm đã tồn tại trong giỏ hàng')
            return
        }

        const selectedProduct = {
            productId : product._id,
            quantity : 1,
            size,
            color
        }

        const newCart = [...cart, selectedProduct]
        dispatch(setCartAction(newCart))
        addProductToCart(token, selectedProduct)
            .then(res => Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng'))
            .catch(err => console.error(err))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle : product.name
        })
    }, [navigation, product])
    
    return ( 
        <SafeAreaView style={[GlobalStyles.container, { marginTop : 0 }]}>
            {/* Just for testing */}
            <Text>This is product detail screen</Text>
            <Text>Product name : {product.name}</Text>
            <Text>Product ID : {product._id}</Text>
            <Button 
                title="Add to cart"
                onPress={handleAddProductToCart}
            />
        </SafeAreaView>
     )
}

export default ProductDetail;

