import React, { useState, useLayoutEffect } from 'react';
import {
    Text,
    Button,
    SafeAreaView,
    Alert,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCartAction, addToFavoritesAction } from '../redux/actions';
import { addProductToCart } from '../services';
import GlobalStyles from '../untils/GlobalStyles';
import formatCurrency from '../untils/formatCurrency';
import { FontAwesome } from '@expo/vector-icons';

function ProductDetail({ navigation, route }) {
    const { product } = route.params;
    const token = useSelector((state) => state.authReducer.userToken);
    const cart = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();

    const [size, setSize] = useState(
        product.sizes && product.sizes.length > 0 ? product.sizes[0].toString() : null
    );

    const [selectedColor, setSelectedColor] = useState(
        product.colors && product.colors.length > 0 ? product.colors[0] : null
    );

    const [loading, setLoading] = useState(false);

    const handleAddProductToCart = () => {
        const existsProduct = cart.find(
            (cartProduct) =>
                cartProduct.productId.toString() === product._id.toString() &&
                cartProduct.size === size &&
                cartProduct.color.name === selectedColor.color
        );

        if (existsProduct) {
            Alert.alert('Thông báo', 'Sản phẩm đã tồn tại trong giỏ hàng');
            return;
        }

        const selectedProduct = {
            productId: product._id,
            quantity: 1,
            size,
            color: selectedColor,
        };

        const newCart = [...cart, selectedProduct];
        dispatch(setCartAction(newCart));

        setLoading(true);

        addProductToCart(token, selectedProduct)
            .then(() => {
                Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng');
            })
            .catch((err) => {
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddToFavorites = () => {
        dispatch(addToFavoritesAction(product));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: product.name,
        });
    }, [navigation, product]);

    const renderColorOptions = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.colors.map((colorOption, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedColor(colorOption)}
                        style={[
                            styles.colorThumbnail,
                            {
                                borderColor:
                                    selectedColor && selectedColor.color === colorOption.color
                                        ? 'blue'
                                        : 'transparent',
                            },
                        ]}
                    >
                        <Image source={{ uri: colorOption.image }} style={styles.colorImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const renderSizeOptions = () => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.sizes.map((sizeOption, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSize(sizeOption.toString())}
                        style={[
                            styles.sizeButton,
                            {
                                backgroundColor:
                                    size && size === sizeOption.toString()
                                        ? '#00bcd4'
                                        : 'transparent',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sizeButtonText,
                                {
                                    color:
                                        size && size === sizeOption.toString()
                                            ? 'white'
                                            : '#00bcd4',
                                    fontWeight:
                                        size && size === sizeOption.toString() ? 'bold' : 'normal',
                                },
                            ]}
                        >
                            {sizeOption}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, marginBottom: 30 }}>
                <Image
                    source={{ uri: selectedColor?.image }}
                    style={{ width: '100%', height: 350, borderBottomWidth: 1, borderRadius: 10 }}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                    }}
                >
                    <Text style={styles.productPrice}>Giá: {formatCurrency(product.price)}VNĐ</Text>
                    <Button title="Add to Favorites" onPress={handleAddToFavorites} />
                </View>
                {renderColorOptions()}
                {renderSizeOptions()}
                <Text style={styles.product_title}>Mô tả sản phẩm: </Text>
                <Text style={styles.product_desc}>{product.desc}</Text>
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#4CAF50',
                        borderRadius: 5,
                        padding: 10,
                    }}
                    onPress={handleAddProductToCart}
                >
                    <FontAwesome
                        name="cart-plus"
                        size={24}
                        color="white"
                        style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        {loading ? '️Adding to Cart...' : 'Add to Cart'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#2196F3',
                        borderRadius: 5,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={handleAddToFavorites}
                >
                    <FontAwesome name="heart" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    productName: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    product_title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    product_desc: {
        fontSize: 16,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    colorThumbnail: {
        borderWidth: 2,
        borderRadius: 20,
        margin: 5,
        padding: 5,
    },
    colorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    sizeButton: {
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    sizeButtonText: {
        fontSize: 16,
    },
});

export default ProductDetail;
