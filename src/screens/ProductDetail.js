import { Text, Button, SafeAreaView, Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";

import { setCartAction } from '../redux/actions'
import { addProductToCart, fetchCart } from '../services'
import GlobalStyles from "../untils/GlobalStyles";

function ProductDetail({ navigation , route }) {
    const { product } = route.params
    const token = useSelector(state => state.authReducer.currentUser.token)
    const [size, setSize] = useState(40)
    const [color , setColor] = useState({ name : 'red', image : 'test' })    // cho user lựa chọn và set lại
    
    // product nhận từ home { _id , name, price, colors, sizes,  des, genre, ....} giống dưới database
    // công việc : 
    // render thông tin của sản phẩm colors, sizes ở dạng select
    // user phải lựa chọn đầy đủ thông tin mới dc thêm product vào giỏ hàng
    // ==> Đầu ra cần 1 object product { _id, size (Number), color (Object { type , image }) }
    // nhấn yêu thích để push thông tin product vào Favourites
    // t đã viết sẵn chức năng đẩy product vào giỏ và store redux
    const dispatch = useDispatch()
    const handleAddProductToCart = () => {
        // kiểm tra điều kiện các trường input và tổng hợp, t chỉ mới test if...else
        const selectedProduct = {
            _id : product._id,
            size,
            color,
        }
        addProductToCart(token, selectedProduct)
            .then(response => {
                fetchCart(token)
                    .then(res => {
                        dispatch(setCartAction(res.data.products))
                        Alert.alert("Message", "Sản phẩm đã được thêm vào giỏ hàng")
                    })
                    .catch(err => {
                       console.log(err)
                    })
            })
            .catch(err => {
                if(err.response.status === 400)
                    Alert.alert("Message", "Sản phẩm đã tồn tại trong giỏ hàng !")
                console.log(err)
            })
    }

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