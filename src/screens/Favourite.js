import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { addToFavoritesAction } from '../redux/actions';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import AppLoading from '../components/AppLoading';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserFavourites } from '../services'
import ProductCard from '../components/ProductCard';
import GlobalStyles from '../untils/GlobalStyles';


function Favourite({ navigation }) {
    const favourites = useSelector((state) => state.favorReducer.favorites);
    const token = useSelector(state => state.authReducer.userToken)
    const sectionProducts = useSelector(state => state.productReducer.products)
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState(favourites)
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        fetchUserFavourites(token)
            .then(res => {
                setProducts(res.data.products)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [sectionProducts, favourites])

    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>
            {
                isLoading ? <AppLoading backgroundColor='transparent' /> :
                (
                    <FlatList
                        data={products}
                        style={styles.favorSectionWrapper}
                        keyExtractor={(item, index) => item + index}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => {
                            return (
                                <ProductCard
                                    product={item}
                                    extraStyles={{ 
                                        minWidth: '49%',
                                        marginTop: 10,
                                        marginLeft : index%2 === 0 ? 0 : 4,
                                        marginRight : index%2 === 0 ? 4 : 0,
                                    }}
                                    handleOnPress={() =>
                                        navigation.navigate('productDetail', { product: item })
                                    }
                                />
                            );
                        }}
                    />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop : 0,
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
    },
    favorSectionWrapper: {
        width: '100%',
        gap: 10,
        rowGap: 10,
    },
});

export default Favourite;
