import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { addProductAction } from "../redux/actions";

function ProductDetail({ navigation , route }) {
    // get product that user choose from Home screen
    const { product } = route.params
    const dispatch = useDispatch()

    return ( 
        <View>
            {/* Just for testing */}
            <Text>This is product detail screen</Text>
            <Text>Product name : {product.name}</Text>
            <Text>Product ID : {product._id}</Text>
            <Button 
                title="Add to cart"
                onPress={() => {
                    dispatch(addProductAction(product))
                    navigation.goBack()
                }}
            />
        </View>
     )
}

export default ProductDetail;