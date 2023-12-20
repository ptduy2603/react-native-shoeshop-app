'use strict';
import { ScrollView, Image, View, Text, SafeAreaView, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';

import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';
import ProductCard from '../components/ProductCard';
import CategoryButton from '../components/CategoryButton';
import AppLoading from '../components/AppLoading'
import { fetchProductsFromServer, fetchCategories, fetchUser } from '../services'
import { sliderImages } from '../data'

function Home({ navigation }) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currentCategory, setCurrentCategory] = useState('all')
    const token = useSelector((state) => state.authReducer.userToken);

    useEffect(() => {
        fetchCategories()
            .then(response => {
                const categories = response.data.categories
                fetchProductsFromServer()
                    .then(response => {
                        let products = response.data.products
                        products.forEach(productSection => {
                            categories.forEach(category => {
                                if(category.type === productSection.title)
                                    productSection.title = category.title
                            })
                        })
                        setProducts(products)
                        setCategories(categories)
                        setIsLoading(false)
                    })
                    .catch(err => console.error(err))
                console.log('Fetch products and categories')
            })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        fetchUser(token)
            .then(response => {
                setUser(response.data.user)
            })
            .catch(error => console.error(error))
        console.log('Fetch user information')
    }, [])

    // handler functions
    const handleRenderHeader = () => {
        // components in this function will be render before FlatList data
        return (
            <>
                {/* greeting user */}
                <View style={styles.header}>
                   <Pressable
                        onPress={() => navigation.navigate('profile')}
                   >
                        <Image
                            style={styles.userImage}
                            source={user.avatar ? { uri : user.avatar } : require('../../assets/images/default_avatar.png')}
                        />
    
                   </Pressable>
                    <View style={styles.greetingUser}>
                        <Text style={styles.hiMember}>Hi, {user.username}!</Text>
                        <Text style={styles.subTitle}>Let choose your suitable shoes</Text>
                    </View>
                </View>

                {/* Search component */}
                <SearchItem />

                {/* Render categories */}
                <ScrollView
                    style={styles.categorieContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <CategoryButton 
                        category={{ title : 'All' }}
                        handleOnPress={() => setCurrentCategory('all')}
                        isActive={currentCategory === 'all'}
                    />
                    {categories.map((category) => {
                        return (
                            <CategoryButton
                                category={category}
                                key={category.id}
                                isActive={category.type === currentCategory}
                                handleOnPress={() => setCurrentCategory(category.type)}
                            />
                        );
                    })}
                </ScrollView>

                <Carousel 
                    data={sliderImages}
                    height={200}
                    loop
                    width={Dimensions.get('window').width}
                    autoPlay
                    scrollAnimationDuration={1200}
                    renderItem={({ item }) => (
                        <Image style={styles.sliderImage} source={item} />
                    )}
                />
            </>
        );
    };

    const handleRenderFooter = () => {
        // code in this function will be render after data in FlatList
        // use for paging 
    }

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
        <SafeAreaView style={[GlobalStyles.container, styles.homeContainer]}>
            {
                isLoading ? (
                    <AppLoading backgroundColor='#fff' />
                ) : 
                (
                    <>
                        {/* use nested FlatList to render products */}
                        <FlatList
                            data={products}
                            style={styles.productsContainer}
                            keyExtractor={(item, index) => item.toString() + index}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={handleRenderHeader}
                            ListFooterComponent={handleRenderFooter}
                            renderItem={({ item }) => {
                                return (
                                    item.data[0].genre === currentCategory || currentCategory === 'all' ?
                                    (
                                        <>
                                            <Text style={styles.productSectionTitle}>{item.title}</Text>
                                            {handleRenderProduct(item.data)}
                                        </>
                                    )
                                    : null
                                );
                            }}
                        />            
                    </>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        paddingHorizontal: 8,
        width : '100%',
        paddingTop: 0,
        paddingBottom: 10,
        alignItems : 'center',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    userImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        objectFit: 'contain',
    },
    greetingUser: {
        marginLeft: 10,
    },
    hiMember: {
        fontSize: 20,
        fontWeight: '600',
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.5,
    },
    categorieContainer: {
        marginBottom: 10,
    },
    productsContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal : 6,
    },
    productSectionWrapper: {
        width: '100%',
        gap : 10,
        rowGap: 10,
    },
    productSectionTitle: {
        width: '100%',
        fontWeight: '600',
        marginTop: 16,
        fontSize: 20,
        paddingBottom: 4,
        marginBottom: 10,
    },
    sliderImage : {
        width : '100%',
        height : '100%',
        objectFit : 'cover',
        borderRadius : 6,
    }
});

export default Home;
