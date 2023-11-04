import { ScrollView,Image, View, Text, SafeAreaView, StyleSheet, Platform, SectionList, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';
import ProductCard from '../components/ProductCard';
import CategoryButton from '../components/CategoryButton';

import { categories, products } from '../data'

function Home() {
    // get current username and avatar
    const currentUser = useSelector(state => state.authReducer.currentUser)

    // handler fuction 
    handleRenderProduct = (data) => {
        return (
            <FlatList 
                style={styles.productSectionWrapper}
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                removeClippedSubviews
                keyExtractor={(item) => item.code}
                renderItem={({ item : shoe }) => {
                    return (
                        <ProductCard 
                            product={shoe}
                            handleOnPress={() => console.log('Show product detail')}
                        />
                    )
                }}
            />
        )
    }

    return (
        <SafeAreaView style={[GlobalStyles.container, styles.homeContainer]}>    
            {/* greeting user */}
            <View style={styles.header}>
                <Image
                    style={styles.userImage}
                    source={currentUser.avatar || require('../../assets/images/default_avatar.png')}
                />

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
                {
                    categories.map((category) => {
                        return (
                            <CategoryButton 
                                category={category}
                                key={category.id}  
                                handleOnPress={() => { console.log('Change category') }}
                            />
                        )
                    })
                }
            </ScrollView>       

            {/* User FlatList to render products */}
            <FlatList 
                data={products}
                style={styles.productsContainer}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <Text style={[styles.productTitle, index === 0 && { marginTop : 0 }]}>{item.title}</Text>
                            {handleRenderProduct(item.data, index)}    
                        </>
                    )
                }}
            
            />
                
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer : {
        paddingHorizontal: 8,
        paddingTop : Platform.OS === 'android' ? 20 : 0,
        paddingBottom: 0,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    userImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        objectFit : 'cover',
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
        marginTop: 20,
    },
    productSectionWrapper: {
        width: '100%',
        justifyContent: 'center',
        rowGap: 4,
    },
    productTitle : {
        width: '100%', 
        fontWeight: '600', 
        marginTop: 40,
        fontSize: 20, 
        paddingBottom: 4,
        borderBottomColor: '#c3c3c3', 
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});

export default Home;
