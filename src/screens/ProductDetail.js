import { View, Text } from "react-native";

function ProductDetail({ route }) {
    // get product that user choose from Home screen
    const { product } = route.params

    return ( 
        <View>
            <Text>This is product detail screen</Text>
            <Text>Product name : {product.name}</Text>
        </View>
     )
}

export default ProductDetail;