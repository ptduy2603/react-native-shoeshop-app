import { SafeAreaView, ScrollView, Text, StyleSheet, View, Pressable, Image, Button} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import { paymentSteps, paymentMethods } from '../data'
import FormInputField from '../components/FormInputField'
import { fetchCountryApi } from '../services'
import GlobalStyles from '../untils/GlobalStyles'
import CustomButton from '../components/CustomButton'
import formatCurrency from '../untils/formatCurrency'
import FormContainer from '../components/FormContainer'
import AppLoading from "../components/AppLoading";
import { setCartAction } from '../redux/actions'

const OptionTag = ({ checked=false, content, handleOnPress }) => {
    return (
        <Pressable 
            style={styles.optionContainer}
            onPress={handleOnPress}
        >
            <View>
                {checked ? <FontAwesome5 name="dot-circle" size={26} color={GlobalStyles.primaryColor} /> : <Entypo name="circle" size={26} /> }
            </View>
            <View>
                <Text style={[styles.optionText, checked && { color : GlobalStyles.primaryColor }]}>{content}</Text>
            </View>
        </Pressable>
    )
}

function Payment({ route, navigation }) {
    const { products, totalPrice } = route.params
    const [currentStep, setCurrentStep] = useState(0)
    const [provinces, setProvinces] = useState([])
    const [currentProvince, setCurrentProvince] = useState({}) //code + name
    const [districts, setDistricts] = useState([])
    const [currentDistrict, setCurrentDistrict] = useState({}) // code + name
    const [wards, setWards] = useState('') 
    const [currentWard, setCurrentWard] = useState('') //name
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isIncorrectPhoneNumber, setIsIncorrectPhoneNumber] = useState(false)
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowCompleteMessage, setIsShowCompleteMessage] = useState(false)
    const dispatch = useDispatch()

    const handleFetchDistricts = useCallback(() => {
        fetchCountryApi(`province=${currentProvince.code || ''}`)
            .then(response => setDistricts(response.data.results))
            .catch(err => console.log('Fetch district error', err))
    }, [currentProvince, fetchCountryApi, setDistricts])

    const handleFetchWards = useCallback(() => {
        fetchCountryApi(`province=${currentProvince.code || ''}&district=${currentDistrict.code || ''}`)
            .then(res => setWards(res.data.results))
            .catch(err => console.log('Fetch wards error', err))
    }, [fetchCountryApi, setWards, currentDistrict, currentProvince])

    useEffect(() => {
         fetchCountryApi('')
            .then(response => {
                setProvinces(response.data.results)
            })
            .catch(err => console.log('Fetch provice error', err))
            console.log('Fetch provinces')
    }, [fetchCountryApi, setProvinces]) 

    useEffect(() => {
        setCurrentDistrict({})
        handleFetchDistricts()
        console.log('Fetch districts')
    }, [handleFetchDistricts])

    useEffect(() => {
        setCurrentWard('')
        handleFetchWards()
        console.log('Fetch wards')
    }, [handleFetchWards])

    useEffect(() => {
        setPaymentMethod(paymentMethods[0].id)
    }, [])

    useEffect(() => {
        if(currentProvince && currentDistrict && currentWard && phoneNumber)
            setShowSubmitButton(true)
        else 
            setShowSubmitButton(false)
    }, [currentProvince, currentDistrict, currentWard, phoneNumber])

    const handleChooseProvince = (province) => {
        setCurrentProvince({
            name: province.name,
            code: province.code
        })
    }

    const handleChooseDistrict = (district) => {
        setCurrentDistrict({
            name : district.name,
            code: district.code
        })
    }

    const handleMoveNextStep = () => {
        if(currentStep === 0 && phoneNumber.trim().length !== 10 || !Number(phoneNumber.trim())) {
            setIsIncorrectPhoneNumber(true)
            return
        }
        else {
            if(currentStep === paymentSteps.length - 1)
                return
            else {
                setCurrentStep(prevStep => prevStep + 1)
            }
        }
    }

    const handleUpdateStep = (index) => {
        if(index < currentStep) {
            setCurrentStep(index)
        }
    } 

    const handlePlaceOrder = () => {
        console.log(products)
    }

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { marginTop :0 , paddingTop : 20}]}>
            {
                isShowCompleteMessage ? (
                    <View style={{ width : '100%', flex : 1, justifyContent : 'center', alignItems : 'center' }}>
                        <Image source={require('../../assets/images/recieve_order.png')} style={{ width : 200, height : 200 }}/>
                        <Text style={styles.recieveOrderText}>Your order has been recieved!</Text>
                        <Button 
                            title="Buy new products"
                            onPress={() => navigation.navigate('home')}
                        />
                    </View>
                )
               : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex : 1, width: '100%' }}>                
                                    <View style={{ width: '100%', flexDirection : 'row', alignItems : 'center', marginBottom : 20, justifyContent : 'space-between' }}>
                                        {
                                            paymentSteps.map((step, index) => {
                                                return (
                                                    <Pressable 
                                                        style={styles.stepContainer} 
                                                        key={index}
                                                        onPress={() => handleUpdateStep(index)}
                                                    >
                                                        <View style={[styles.stepIndex, index <= currentStep && { backgroundColor : GlobalStyles.primaryColor }]}>
                                                            {
                                                                index < currentStep || currentStep === paymentSteps.length - 1 ? (
                                                                    <Text style={styles.text}>&#10003;</Text>
                                                                ) : (
                                                                    <Text style={styles.text}>{index+1}</Text>
                                                                )
                                                            }
                                                        </View>
                                                        { index !== 0 && ( <Text style={[styles.horizontalLine, index <= currentStep && { borderStyle : 'solid' }]} />) }
                                                        <Text style={[styles.stepTitle, index <= currentStep && { color : GlobalStyles.primaryColor }]}>{step.title}</Text>
                                                    </Pressable>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* Provide address step */}
                                    {currentStep === 0 && (
                                        <FormContainer>
                                            <Text style={styles.formTitle}>Select Delivery Address</Text>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.formLabel}>Province/city(*):</Text>
                                                <SelectDropdown 
                                                    buttonStyle={[styles.selectBox, currentProvince.name && { backgroundColor : GlobalStyles.primaryColor }]}
                                                    data={provinces}
                                                    defaultButtonText={currentProvince.name || 'Chọn tỉnh'}
                                                    rowTextForSelection={(item, index) => item.name}
                                                    buttonTextAfterSelection={() => currentProvince.name || 'Chọn tỉnh'}
                                                    buttonTextStyle={{ color : '#fff', fontWeight : '500' }}
                                                    dropdownStyle={styles.dropdownContainer}
                                                    showsVerticalScrollIndicator={false}
                                                    selectedRowStyle={{ backgroundColor : 'rgba(0,0,0,0.1)' }}
                                                    onSelect={(selectedItem, index) => handleChooseProvince(selectedItem)}
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.formLabel}>District(*):</Text>
                                                <SelectDropdown 
                                                    buttonStyle={[styles.selectBox, currentDistrict.name && { backgroundColor : GlobalStyles.primaryColor }]}
                                                    data={districts}
                                                    defaultButtonText={currentDistrict.name || 'Chọn huyện'}
                                                    rowTextForSelection={(item, index) => item.name}
                                                    buttonTextAfterSelection={() => currentDistrict?.name || 'Chọn huyện'}
                                                    buttonTextStyle={{ color : '#fff', fontWeight : '500' }}
                                                    dropdownStyle={styles.dropdownContainer}
                                                    showsVerticalScrollIndicator={false}
                                                    selectedRowStyle={{ backgroundColor : 'rgba(0,0,0,0.1)' }}
                                                    onSelect={(selectedItem) => handleChooseDistrict(selectedItem)}
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.formLabel}>Ward(*):</Text>
                                                <SelectDropdown 
                                                    buttonStyle={[styles.selectBox, currentWard && { backgroundColor : GlobalStyles.primaryColor }]}
                                                    data={wards}
                                                    defaultButtonText={currentWard || 'Chọn xã'}
                                                    rowTextForSelection={(item, index) => item.name}
                                                    buttonTextAfterSelection={() => currentWard || 'Chọn xã'}
                                                    buttonTextStyle={{ color : '#fff', fontWeight : '500' }}
                                                    dropdownStyle={styles.dropdownContainer}
                                                    showsVerticalScrollIndicator={false}
                                                    selectedRowStyle={{ backgroundColor : 'rgba(0,0,0,0.1)' }}
                                                    onSelect={(selectedItem) => setCurrentWard(selectedItem.name)}
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.formLabel}>Phone number(*):</Text>
                                                <FormInputField 
                                                    type="numeric"
                                                    extraStyles={{marginTop : 20}}
                                                    value={phoneNumber}
                                                    handleTextChange={(value) => setPhoneNumber(value)}
                                                    isInvalid={isIncorrectPhoneNumber}
                                                    handleOnFocus={() => setIsIncorrectPhoneNumber(false)}
                                                />
                                                { isIncorrectPhoneNumber && <Text style={{ color: 'red', fontSize : 14, marginTop : 4 }}>Số điện thoại không hợp lệ !</Text> }
                                            </View>
                                            <View style={styles.formGroup}>
                                                <CustomButton 
                                                    title="Continue"
                                                    extraStyles={{ marginTop : 40 }}
                                                    disabled={!showSubmitButton}
                                                    handleOnPress={handleMoveNextStep}
                                                />
                                            </View>
                                        </FormContainer>
                                    )}

                                    {/* Delivery step*/}
                                    {currentStep === 1 ? (
                                        <FormContainer>
                                            <Text style={styles.formTitle}>Select your delivery options</Text>
                                            <View style={styles.formGroup}> 
                                                <OptionTag 
                                                    checked
                                                    content="Best express (Free of charge)"
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <CustomButton 
                                                    title="Continue"
                                                    extraStyles={{ marginTop : 40 }}
                                                    handleOnPress={handleMoveNextStep}
                                                />
                                            </View>
                                        </FormContainer>
                                    )
                                    : null
                                    }

                                    {/* Payment method */}
                                    {
                                        currentStep === 2 ? (
                                            <FormContainer>
                                                <Text style={styles.formTitle}>Select your payment method</Text>
                                                {
                                                    paymentMethods.map(method => {
                                                        return (
                                                            <View style={styles.formGroup} key={method.id}>
                                                                <OptionTag 
                                                                    checked={method.id === paymentMethod}  
                                                                    content={method.title}    
                                                                    handleOnPress={() => setPaymentMethod(method.id)}                                      
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <View style={styles.formGroup}>
                                                    <CustomButton 
                                                        title="Continue"
                                                        extraStyles={{ marginTop : 40 }}
                                                        handleOnPress={handleMoveNextStep}
                                                    />
                                                </View>
                                            </FormContainer>
                                        )
                                        : null
                                    }

                                    {/* Finish payment */}
                                    {
                                        currentStep === paymentSteps.length - 1 ? (
                                            <FormContainer>
                                                <View style={[styles.formGroup, { borderWidth : 1, borderColor : GlobalStyles.primaryColor, padding : 8, borderRadius : 2 }]}>
                                                    <Text style={{ fontSize : 20, fontWeight : '600', textAlign : 'center' }}>Thông tin đơn hàng</Text>
                                                    <Text style={styles.orderText}>Phone number: {phoneNumber}</Text>
                                                    <Text style={styles.orderText}>Shipping address: {`${currentWard}, ${currentDistrict.name}, ${currentProvince.name}`}</Text>
                                                    <Text style={styles.orderText}>Payment method: {paymentMethods.find(method => method.id === paymentMethod).title}</Text>
                                                    <Text style={styles.orderText}>Items price : {formatCurrency(totalPrice)} VNĐ</Text>
                                                    <Text style={styles.orderText}>Shipping fee: 0 VNĐ</Text>
                                                    <Text style={[styles.orderText, { fontSize : 20, fontWeight : '600' }]}>Order Total: {formatCurrency(totalPrice)} VNĐ</Text>
                                                </View>

                                                <View style={styles.formGroup}>
                                                    <CustomButton 
                                                        title="Order"
                                                        handleOnPress={handlePlaceOrder}
                                                    />
                                                </View>
                                            </FormContainer>
                                        )
                                        : null
                                    }  
                                                                         
                        </ScrollView>
                        {
                            isLoading && <AppLoading backgroundColor='rgba(0,0,0,0.2)' />
                        }  
                    </>
               )           
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    stepContainer : {
        position : 'relative',
        alignItems : 'center',
        zIndex : 2,
    },
    stepIndex : {
        width: 40,
        zIndex: 2,
        position: 'relative',
        height: 40,
        borderRadius : 20,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems : 'center',
    },
    text : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#fff',   
    },
    horizontalLine : {
        position : 'absolute',
        height : 1,
        width : '130%',
        top : '30%',
        transform : [{ translateY : -0.5 }],
        right : '40%',
        zIndex : -2,
        borderWidth : 1,
        borderStyle: 'dashed',
        borderColor : GlobalStyles.primaryColor,
    },
    stepTitle : {
        fontSize : 16,
        fontWeight :'500',
        color : '#ccc',
    },
    formTitle : {
        fontSize : 22,
        fontWeight : '800',
        width: '100%',
        textAlign: 'center',
    },
    formLabel: {
        fontSize : 16,
        fontWeight : '500',
    },
    formGroup : {
        marginTop : 20,
    },
    selectBox : {
        borderRadius : 4,
        minWidth : 260,
        height : 40,
        marginTop : 10,
        backgroundColor : 'rgba(0,0,0,0.3)'
    },
    dropdownContainer : {
        textAlign: 'center',
        alignSelf: 'center',
        width: 360,
        borderRadius : 4,
    },
    optionContainer : {
        width : '100%',
        flexDirection : 'row',
        gap : 20,
        alignItems : 'center',
        borderWidth : 1,
        borderRadius : 4,
        padding : 16,
        borderColor : 'rgba(0,0,0,0.3)',
        marginTop : 10,
    },
    optionText : {
        fontSize : 18,
        fontWeight : '800',
    },
    orderText : {
        fontSize : 16,
        fontWeight : '500',
        marginTop : 8,
        width : '100%',
    },
    recieveOrderText : {
        fontSize : 20,
        fontWeight : '800',
        marginVertical : 10,
    }
})

export default Payment;