import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { addToFavoritesAction } from '../redux/actions'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import AppLoading from '../components/AppLoading'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/ProductCard';
import GlobalStyles from '../untils/GlobalStyles';

function Favourite({navigation}) {
    const favourites = useSelector(state => state.favorReducer.favorites)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    const handleRenderProduct = (data) => {
        return (
            <FlatList
                data={data}
                style={styles.productSectionWrapper}
                keyExtractor={(item, index) => item + index}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems : 'center', justifyContent : 'space-between' }}
                renderItem={({ item, index}) => {
                    return (
                        <ProductCard
                            product={item}
                            extraStyles={{ 
                                marginLeft : index%2 === 0 ? 0 : 4,
                                marginRight : index%2 === 0 ? 4 : 0,
                            }}
                            handleOnPress={() => navigation.navigate('productDetail', { product : item })}
                        />
                    );
                }}
            />
        );
    };
    return ( 
        <SafeAreaView style={[GlobalStyles.container]}>
            {
                favourites.map(product => {
                    return (
                        <Text key={product._id}>{product.name}</Text>
                    )
                })
            }
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({})

export default Favourite;