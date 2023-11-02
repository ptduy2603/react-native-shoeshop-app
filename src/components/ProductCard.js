import React from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
} from 'react-native';
import GlobalStyles from '../untils/GlobalStyles';
import ClampLines from 'react-clamp-lines'

const NUM_OF_LINES = 2;

function fix_LongText() {
    const [showMore, setShowMore] = useState(false);
}

function ProductCard() {
    const listShoe = [
        {
            id: '0',
            title: 'Bitis Hunter Street đế',
            price: '1275000',
            image: 'https://product.hstatic.net/1000230642/product/z4703770946058_6a961cc309a854194a287ac00ff4a7cb__1__88e555b3752b4bda9b54bbd1fd85ecd9.jpg',
        },
        {
            id: '1',
            title: 'Bitis Hunter Core Z Collection DSMH06400',
            price: '736000',
            image: 'https://product.hstatic.net/1000230642/product/dsc_0019_fb488f4fc9f348948f78f7c6dac6e08a_grande.jpg',
        },
        {
            id: '2',
            title: 'Bitis Hunter Core Z Collection DSMH06400',
            price: '736000',
            image: 'https://product.hstatic.net/1000230642/product/dsc_0019_fb488f4fc9f348948f78f7c6dac6e08a_grande.jpg',
        },
        {
            id: '3',
            title: 'Bitis Hunter Core Z Collection DSMH06400',
            price: '736000',
            image: 'https://product.hstatic.net/1000230642/product/dsc_0019_fb488f4fc9f348948f78f7c6dac6e08a_grande.jpg',
        },
        {
            id: '4',
            title: 'Bitis Hunter Core Z Collection DSMH06400',
            price: '736000',
            image: 'https://product.hstatic.net/1000230642/product/dsc_0019_fb488f4fc9f348948f78f7c6dac6e08a_grande.jpg',
        },
    ];
    return (
        <View style={styles.container}>
            {listShoe.map((item, index) => (
                <Pressable style={styles.cardWrapper} key={item.id}>
                    <Image style={[styles.imageProduct]} source={{ uri: item?.image }} />
                    <Text numberOfLines={2} style={styles.nameProduct}>{item.title}</Text>
                    <Text style={[styles.priceProduct]}>Giá: {item.price} VNĐ</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardWrapper : {
        width: 150,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    imageProduct: {
        width: 140,
        height: 140,
    },
    nameProduct: {
        fontWeight: '400',
        marginHorizontal: 6,
    },
    priceProduct: {
        color: 'black',
        fontWeight: '800',
        marginTop: 8,
        fontSize: 16,
    },
});

export default ProductCard;
