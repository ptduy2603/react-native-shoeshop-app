import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import {
    Text,
    SafeAreaView,
    Alert,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Share,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import Toast from 'react-native-root-toast'

import { setCartAction, addToFavoritesAction, setProductsAction } from '../redux/actions';
import { addProductToCart, updateUserFavouriteProducts, createComment } from '../services';
import GlobalStyles from '../untils/GlobalStyles';
import formatCurrency from '../untils/formatCurrency';
import { fetchUser } from '../services'
import CommentBox from '../components/CommentBox';

function ProductDetail({ navigation, route }) {
    const { product } = route.params;
    const token = useSelector((state) => state.authReducer.userToken);
    const cart = useSelector((state) => state.cartReducer.cart);
    const favourites = useSelector((state) => state.favorReducer.favorites);
    const dispatch = useDispatch();

    const [isLiked, setIsLiked] = useState(false);

    const [size, setSize] = useState(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
        );
    const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
    );
    const [loading, setLoading] = useState(false);  
    const [user, setUser] = useState({})
    const [commentInput, setCommentInput] = useState('')
    const [comments, setComments] = useState([])
    
    const products = useSelector(state => state.productReducer.products)
            
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: product.name,
        });
    }, [navigation, product]);

    useEffect(() => {
        if(!favourites.length)
            setIsLiked(false)
        else {
            isLikedProduct = favourites.find(
                (favorProduct) => favorProduct._id.toString() === product._id.toString()
            )
    
            if(isLikedProduct) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }
        }
        console.log('Check liked product')
    }, [])
            
    useEffect(() => {
        if (!favourites.length) setIsLiked(false);
        else {
            isLikedProduct = favourites.find(
                (favorProduct) => favorProduct._id.toString() === product._id.toString()
            );

            if (isLikedProduct) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        }
        console.log('Check liked product');
    }, []);

    useEffect(() => {
        fetchUser(token)
            .then(response => setUser(response.data.user))
            .catch(error => console.error(error))
        console.log('Fetch user info')
    }, [])

    useEffect(() => {
        setComments(product.comments || [])
    }, [product])

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
            color: { name: selectedColor.color, image: selectedColor.image },
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

    const handleBuyNow = () => {
        navigation.navigate('Payment', { products :  [product], totalPrice : product.price })
    }

    const handleAddToFavorites = () => {
        let likedProducts = [];
        Toast.show(isLiked ? 'Xóa sản phẩm khỏi mục yêu thích' : 'Thêm sản phẩm vào mục yêu thích', {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            backgroundColor : 'rgba(0,0,0,0.9)'
        })
        if (isLiked) {
            likedProducts = favourites.filter(
                (favorProduct) => favorProduct._id.toString() !== product._id.toString()
            );
            likedProducts = likedProducts.map((favorProduct) => favorProduct._id);
        } else {
            likedProducts = favourites.map((favorProduct) => favorProduct._id);
            likedProducts.push(product._id);
        }
        setIsLiked(!isLiked);

        updateUserFavouriteProducts(token, likedProducts)
            .then((response) => {
                dispatch(addToFavoritesAction(response.data.products));
            })
            .catch((err) => console.error(err));

    };


    const handleShareProduct = async () => {
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

    const handleComment = useCallback(async () => {
        if(!commentInput.trim())
            return
        const comment = {
            name : user.username || 'Anonymous',
            text : commentInput,            
        }

        createComment(product._id, comment)
            .then(res => {
                setComments(res.data.comments)
                setCommentInput('')
                const newProducts = products
                products.forEach(section => {
                    section.data.forEach(item => {
                        if(item._id.toString() === product._id.toString())
                        {
                            if(item.comments)
                            {
                                item.comments.unshift(comment)
                            }
                            else
                                item.comments = [comment]
                        }
                    })
                })
                dispatch(setProductsAction(newProducts))
            })
            .catch(error => console.error(error))
    }, [commentInput, comments, product])

    const renderColorOptions = useCallback(() => {
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
                                        ? GlobalStyles.primaryColor
                                        : 'transparent',
                            },
                        ]}
                    >
                        <Image source={{ uri: colorOption.image }} style={styles.colorImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }, [product, selectedColor]);

    const renderSizeOptions = useCallback(() => {
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product.sizes.map((sizeOption, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSize(sizeOption)}
                        style={[
                            styles.sizeButton,
                            {
                                backgroundColor:
                                    size && size === sizeOption
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
                                        size && size === sizeOption
                                            ? 'white'
                                            : GlobalStyles.primaryColor,
                                    fontWeight:
                                        size && size === sizeOption ? 'bold' : 'normal',
                                },
                            ]}
                        >
                            {sizeOption}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }, [product, size]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginBottom: 30, paddingHorizontal: 10 }}
            >
                <Image
                    source={{ uri: selectedColor?.image }}
                    style={{ width: '100%', height: 350, borderBottomWidth: 1, borderRadius: 10 }}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.showPrice}>
                    <Text style={styles.productPrice}>Giá: {formatCurrency(product.price)}VNĐ</Text>

                    <View style={styles.options}>
                        <TouchableOpacity
                            onPress={handleAddToFavorites}
                        >
                            {
                                !isLiked ? <FontAwesome name='heart-o' size={30} color="black" /> : <FontAwesome name='heart' size={30} color='red' />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity  
                            onPress={handleShareProduct}
                        >
                            <Ionicons name="share-social-outline" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {renderColorOptions()}
                {renderSizeOptions()}
                <View>
                    <Text style={styles.product_title}>Mô tả sản phẩm: </Text>
                    <Text style={styles.product_desc}>{product.desc}</Text>
                </View>
                <View style={styles.commentContainer}>
                      <Text style={styles.product_title}>{`Đánh giá sản phẩm (${comments?.length || 0})`}</Text>  
                      <View style={styles.commentWrapper}>
                           <View style={styles.commentInputContainer}>
                                <TextInput 
                                    multiline
                                    spellCheck={false}
                                    value={commentInput}
                                    style={styles.commentInput}
                                    placeholder='Enter your comment...'
                                    onChangeText={(value) => setCommentInput(value)}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={handleComment}
                                >
                                    <Feather name='send' color='rgba(0,0,0,0.6)' size={30} />
                                </TouchableOpacity>
                           </View>
                           {
                                comments.map((comment, index) => (
                                    <CommentBox key={index} comment={comment} />
                                ))
                           }
                      </View>
                </View>
            </ScrollView>

            <View style={styles.showCart}>
                <TouchableOpacity style={styles.button_cart} onPress={handleAddProductToCart}>
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


                <TouchableOpacity style={styles.button_cart} onPress={handleBuyNow}>
                    <FontAwesome
                        name="credit-card"
                        size={24}
                        color="white"
                        style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Buy now
                    </Text>
                </TouchableOpacity> 
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productName: {
        marginVertical : 10,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
    },
    product_title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    product_desc: {
        fontSize: 18,
        textAlign: 'justify',
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
        borderColor : 'rgba(0,0,0,0.2)',
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
        flexDirection: 'row',
        position: 'absolute',
        gap : 10,
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        padding: 10,
    },
    options: {
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'space-between',
        gap : 10,
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
    commentContainer : {
        marginBottom : 40,
    },
    commentInputContainer : {
        marginVertical : 10,
        flexDirection : 'row',
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderRadius : 4,
        borderColor : 'rgba(0,0,0,0.3)',
        paddingHorizontal : 10,
    },
    commentInput : {
        flex : 1,
        height : '100%',
        fontSize : 16,      
        padding : 16,
    },
});

export default ProductDetail;
