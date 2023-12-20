import React, { useState, useLayoutEffect } from 'react';
import { Text, Button, SafeAreaView, Alert, View, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setCartAction, addToFavoritesAction } from '../redux/actions';
import { addProductToCart } from '../services';
import GlobalStyles from '../untils/GlobalStyles';
import formatCurrency from '../untils/formatCurrency';

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
            <View>
                {/* Color Picker */}
               <View >
                    <Text style={{ fontSize: 18, marginTop: 10 }}>Choose Color:</Text>
                    <Picker
                        selectedValue={selectedColor}
                        onValueChange={(itemValue) => setSelectedColor(itemValue)}
                    >
                        {product.colors.map((colorOption, index) => (
                            <Picker.Item key={index} label={colorOption.color} value={colorOption} />
                        ))}
                    </Picker>
               </View>
    
                {/* Size Picker */}
               <View>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>Choose Size:</Text>
                    <Picker
                        selectedValue={size}
                        onValueChange={(itemValue) => setSize(itemValue)}
                    >
                        {product.sizes.map((sizeOption, index) => (
                            <Picker.Item key={index} label={sizeOption.toString()} value={sizeOption} />
                        ))}
                    </Picker>
               </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginBottom: 30, }}>
                <Image
                    source={{ uri: selectedColor?.image }}
                    style={{ width: '100%', height: 350, borderBottomWidth: 1, borderRadius: 10 }}
                />
                <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center' }}>
                    {product.name}
                </Text>
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: 10 }}>
                        Giá: {formatCurrency(product.price)}VNĐ
                    </Text>
                    <Button title="Add to Favorites" onPress={handleAddToFavorites} />
                </View>
                {renderColorOptions()}

                <Text style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 10 }}>
                    Mô tả sản phẩm:{' '}
                </Text>
                <Text
                    style={{
                        fontSize: 24,
                        marginVertical: 10,
                        borderTopWidth: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    {product.desc}
                </Text>

                {/* Render color options */}
                
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderColor: '#ccc',
                }}
            >
                <Button
                    title={loading ? '️🛒 Adding to Cart...' : '️🛒 Add to Cart'}
                    onPress={handleAddProductToCart}
                    disabled={loading}

                />
            </View>
        </SafeAreaView>
    );
}

export default ProductDetail;
