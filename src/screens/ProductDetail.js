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
    Share,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCartAction, addToFavoritesAction } from '../redux/actions';
import { addProductToCart } from '../services';
import GlobalStyles from '../untils/GlobalStyles';
import formatCurrency from '../untils/formatCurrency';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

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
            color: { name : selectedColor.color, image : selectedColor.image },
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

    const ShareProduct = async () => {
        const ShareOptions = {
            message: 'Hãy mua sản phẩm nha mọi người',
            url: product.image,
        };

        try {
            const ShareResponse = await Share.share(ShareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error =>', error);
        }
    };

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
                                        ? GlobalStyles.primaryColor
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
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 30, paddingHorizontal: 10, }}>
                <Image
                    source={{ uri: selectedColor?.image }}
                    style={{ width: '100%', height: 350, borderBottomWidth: 1, borderRadius: 10 }}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.showPrice}>
                    <Text style={styles.productPrice}>Giá: {formatCurrency(product.price)}VNĐ</Text>

                    <View style={styles.option}>
                        <TouchableOpacity
                            style={styles.button_option}
                            onPress={handleAddToFavorites}
                        >
                            <FontAwesome name="heart" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button_option} onPress={ShareProduct}>
                            <Ionicons name="share-social-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {renderColorOptions()}
                {renderSizeOptions()}
                <Text style={styles.product_title}>Mô tả sản phẩm: </Text>
                <Text style={styles.product_desc}>{product.desc}</Text>
            </ScrollView>

            <View style={styles.showCart}>
                <TouchableOpacity
                    style={styles.button_cart}
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 18,
        textAlign: 'justify',
        paddingHorizontal: 10,
        marginBottom: 40,
    },
    colorThumbnail: {
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        width: 80,
        height: 80,
        margin: 5,
        padding: 5,
        marginVertical: 16,
    },
    colorImage: {
        width: '100%',
        height: '100%',
    },
    sizeButton: {
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    sizeButtonText: {
        fontSize: 16,
    },
    showPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
    },
    showCart: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'space-between',
    },
    button_option: {
        marginLeft: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_cart: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalStyles.primaryColor,
        borderRadius: 5,
        padding: 10,
    },
});

export default ProductDetail;
