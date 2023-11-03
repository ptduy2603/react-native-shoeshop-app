import { ScrollView,Image, View, Text, SafeAreaView, StyleSheet, Pressable, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import GlobalStyles from '../untils/GlobalStyles';
import SearchItem from '../components/SearchItem';
import ProductCard from '../components/ProductCard';
import { categories } from '../data'

function Home() {
    // demo data 
    const listShoe = [
        {
            id: '0',
            title: 'Bitis Hunter Street đế cao để có thể cscscscscs',
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
    // get current username and avatar
    const currentUser = useSelector(state => state.authReducer.currentUser)

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
        
            {/* search component */}
            <SearchItem />

            {/* Render categories */}
            <ScrollView 
                style={styles.categorieContainer} 
                horizontal 
                showsHorizontalScrollIndicator={false}
            >
                {
                    categories.map((categorie, index) => {
                        return (
                            <View>
                                <Text>{categorie.name}</Text>
                                <Image source={categorie.image} style={styles.categorieImage} />
                            </View>
                        )
                    })
                }
            </ScrollView>

            <ScrollView 
                style={styles.wrapper}
                showsVerticalScrollIndicator={false}
            >
               <View style={{ paddingVertical: 20 }}>
                    <Text style={styles.productTitle}>Loại sản phẩm 1</Text>
                    {
                        listShoe.map((shoe, index) => {
                            return (
                                <ProductCard 
                                    key={shoe.toString()+index}
                                    product={shoe}
                                    handleOnPress={() => Alert.alert('Message', 'Navigate to ShoeDetail screen')}
                                />
                            )
                        })
                    }
               </View>
            </ScrollView>                          
                
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeContainer : {
        paddingVertical: 4,
        paddingHorizontal: 10,
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
    wrapper : {
        width: '100%',
        padding: 0,
        margin: 0,
    },
    productTitle : {
        marginTop:10, 
        width: '100%', 
        fontWeight: '600', 
        fontSize: 26, 
        borderBottomColor: '#333', 
        paddingBottom: 4,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    categorieContainer : {
        width: '100%',
    },
    categorieImage : {
        width: 24,
        height: 24,
        borderRadius: 12,
    }
});

export default Home;
