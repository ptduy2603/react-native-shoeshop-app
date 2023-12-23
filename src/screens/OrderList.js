import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image} from 'react-native'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { fetchUserOrders } from '../services'
import { orderTypes } from '../data'
import formatCurrency from '../untils/formatCurrency';
import AppLoading from '../components/AppLoading';
import GlobalStyles from '../untils/GlobalStyles';

function OrderBox({ order }) {
    return (
        <Pressable
            style={styles.orderWrapper}
        >
            <View style={{ width : '100%', flexDirection : 'row', alignItems : 'center', 'justifyContent' : 'space-between' }}>
                <Text style={styles.text}>Đặt hàng lúc : {moment(order.createdAt).format('d/MM/yyyy')}</Text>
                <Text style={styles.text}>Trạng thái : {order.status}</Text>
            </View>
            <Text style={styles.text}>Tổng tiền : {formatCurrency(order.totalPrice)} VNĐ</Text>
            <Text style={styles.text}>Thanh toán : {order.paymentMethod}</Text>
            <View style={{ marginTop : 10, flexDirection : 'row', justifyContent : 'space-between' , alignItems : 'center' }}>
                <Text style={[styles.text, { color : 'grey' }]}>{order.products.length} sản phẩm</Text>
                <View style={{ alignItems : 'center', flexDirection : 'row', gap : 10 }}>
                    <Pressable>
                        <MaterialCommunityIcons name='delete-outline' size={30} />
                    </Pressable>
                    <Pressable>
                        <MaterialCommunityIcons name='note-edit-outline' size={30} />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

function OrderList() {
    const [orders, setOrders] = useState([])
    const [currentList, setCurrentList] = useState(orderTypes[0])
    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector(state => state.authReducer.userToken)

    useEffect(() => {
        fetchUserOrders(token)
            .then(response => {
                setOrders(response.data.orders)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
        console.log("Fetch user's orders")
    }, [])

    return ( 
        <SafeAreaView style={styles.container}>
           {
                isLoading ? <AppLoading backgroundColor='transparent' /> : 
                (
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width : '100%', height : '100%' }}>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            style={styles.orderListHeader}
                            contentContainerStyle={{ justifyContent : 'center' }}
                        >
                            {
                                orderTypes.map(item => {
                                    return (
                                        <Pressable 
                                            key={item.id} 
                                            style={[styles.orderTypeContainer, item.id === currentList.id && styles.active]}
                                            onPress={() => setCurrentList(item)}
                                        >
                                            <Text style={[styles.orderTypeText, item.id === currentList.id && { color : GlobalStyles.primaryColor }]}>{item.title}</Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollView>
                       <View style={{ marginTop : 16, width : '100%', flex : 1 }}>
                            {
                                orders.filter(order => order?.status === currentList.type ).length ? (
                                    orders.filter(order => order?.status === currentList.type ).map(order => {
                                        return (
                                            <OrderBox 
                                                key={order._id}
                                                order={order}
                                            />
                                        )
                                    })
                                ) : (
                                    <View style={{ justifyContent : 'center', alignItems : 'center', flex : 1}}>
                                        <Image 
                                            source={require('../../assets/images/no_order.png')}
                                            style={{width : 100, height : 100 , objectFit : 'cover' }}
                                        />
                                        <Text style={{ fontSize : 16, fontWeight : '500', marginTop : 16 }}>Chưa có đơn hàng</Text>
                                    </View>
                                )
                            }
                       </View>
                    </ScrollView>
                )
           }
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
        paddingHorizontal : 10,
    },
    orderListHeader : {
        width : '100%',
    },
    orderTypeContainer : {
        padding : 8,
        height : 50,
        minWidth : 110,
    },
    active : {
        borderBottomColor: GlobalStyles.primaryColor,
        borderBottomWidth : 3,
        borderBottomRightRadius : 2,
        borderBottomLeftRadius : 2,
    },
    orderTypeText : {
        fontSize : 18,
        fontWeight : '600',
        textAlign : 'center',
    },
    orderWrapper : {
        width : '100%',
        marginTop : 16,
        padding : 10,
        borderRadius : 4,
        borderWidth : 1,
        borderColor : 'rgba(0,0,0,0.2)'
    },
    text : {
        fontSize : 16,
        fontWeight : '500',
    }
})

export default OrderList;