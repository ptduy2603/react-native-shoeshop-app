import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoritesAction } from '../redux/actions'
import GlobalStyles from '../untils/GlobalStyles';

function Favourite() {
    const favourites = useSelector(state => state.favorReducer.favorites)
    const dispatch = useDispatch()

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