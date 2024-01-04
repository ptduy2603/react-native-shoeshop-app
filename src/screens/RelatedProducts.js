import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Dimensions } from 'react-native';
import ProductCard from '../components/ProductCard';
import GlobalStyles from '../untils/GlobalStyles';
import { fetchProductsFromServer } from '../services';
import AppLoading from '../components/AppLoading';

const RelatedProducts = ({ route, navigation }) => {
    const { searchText } = route?.params || '';
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [allProductsList, setAllProductsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProductsFromServer();
                const allProductsData = response.data.products;
                const productsList = allProductsData.map(section => section.data).flat(Number.POSITIVE_INFINITY)
                setAllProductsList(productsList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter products when searchText changes
        const filterProducts = () => {
            const filteredProducts = allProductsList
                ?.flat()
                .filter((product) =>
                    product.name?.toLowerCase().includes(searchText?.toLowerCase() || '')
                );

            setRelatedProducts(filteredProducts || []);
            setIsLoading(false);
        };

        filterProducts();
    }, [searchText, allProductsList]);

    const handleProductPress = (product) => {
        console.log([product])
        navigation.navigate('productDetail', { product });
    };

    return (
        isLoading ? (
            <AppLoading />
        ) :
        (
                <View style={[GlobalStyles.container, styles.container]}>
                {relatedProducts.length > 0 ? (
                <View  style={styles.productsContainer}>
                    
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={styles.productSectionWrapper}
                            data={relatedProducts}
                            keyExtractor={(item, index) => (item + index ? item._id.toString() : '')}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({ item, index }) => (
                                <ProductCard
                                    product={item}
                                    extraStyles={{
                                        marginLeft: index % 2 === 0 ? 0 : 4,
                                        marginRight: index % 2 === 0 ? 4 : 0,
                                        marginBottom: 8,
                                        alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                    }}
                                    handleOnPress={() => handleProductPress(item)}
                                />
                            )}
                            numColumns={2}
                        />
                </View>
                ) : (
                    <View style={styles.noProductsContainer}>
                        <Text>No related products found.</Text>
                    </View>
                )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 10,
        alignItems: 'center',
    },
    flatListContainer: {
        paddingHorizontal: 4,
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productsContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 6,
    },
    productSectionWrapper: {
        width: '100%',
        gap: 10,
        rowGap: 10,
    },
});

export default RelatedProducts;
