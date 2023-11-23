'use strict';
import { ScrollView, Image, View, Text, SafeAreaView, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';
import ProductCard from '../components/ProductCard';
import CategoryButton from '../components/CategoryButton';

import { categories } from '../data';
import { useState } from 'react';

function Home({ navigation }) {
    const [currentCategory, setCurrentCategory] = useState('')
    // get current user
    const currentUser = useSelector((state) => state.authReducer.currentUser);
    // get all products from redux store
    const products = useSelector(state => state.productReducer.products)

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
                            source={currentUser.avatar ? { uri : currentUser.avatar } : require('../../assets/images/default_avatar.png')}
                        />
    
                   </Pressable>
                    <View style={styles.greetingUser}>
                        <Text style={styles.hiMember}>Hi, {currentUser.username}!</Text>
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
                    {categories.map((category) => {
                        return (
                            <CategoryButton
                                category={category}
                                key={category.id}
                                isActive={category.type === currentCategory}
                                handleOnPress={() => {
                                    if(category.type !== currentCategory)
                                        setCurrentCategory(category.type)
                                    else setCurrentCategory('')
                                }}
                            />
                        );
                    })}
                </ScrollView>
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
                                marginLeft : index%2 === 0 ? 0 : 6,
                                marginRight : index%2 === 0 ? 6 : 0,
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
            {/* use nested FlatList to render products */}
            <FlatList
                data={products}
                style={styles.productsContainer}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={handleRenderHeader}
                ListFooterComponent={handleRenderFooter}
                renderItem={({ item, index }) => {
                    return (
                        item.data[0].genre === currentCategory || currentCategory === '' ?
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
        width: '100%',
    },
    productSectionWrapper: {
        width: '100%',
        rowGap: 12,
        justifyContent : 'space-between',
    },
    productSectionTitle: {
        width: '100%',
        fontWeight: '600',
        marginTop: 26,
        fontSize: 20,
        paddingBottom: 4,
        marginBottom: 10,
    },
});

export default Home;
