import { SafeAreaView, ScrollView, Text, StyleSheet, View, Pressable} from "react-native";
import { useDispatch } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
// import { CheckBox } from '@react-native-community/checkbox'

import { paymentSteps } from '../data'
import FormInputField from '../components/FormInputField'
import { fetchCountryApi } from '../services'
import GlobalStyles from '../untils/GlobalStyles'
import CustomButton from '../components/CustomButton'
import FormContainer from '../components/FormContainer'
import { useCallback, useEffect, useState } from "react";
// import {  } from '../redux/actions'

function Payment({ route }) {
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
        if(index !== paymentSteps.length - 1 && index < currentStep) {
            setCurrentStep(index)
        }
    } 

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { marginTop :0 , paddingTop : 20}]}>
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
                        <Text style={styles.formTitle}>Thông tin địa chỉ giao hàng</Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Chọn tỉnh/thành phố(*):</Text>
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
                            <Text style={styles.formLabel}>Chọn quận/huyện(*):</Text>
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
                            <Text style={styles.formLabel}>Chọn xã/phường(*):</Text>
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
                            <Text style={styles.formLabel}>Số điện thoại(*):</Text>
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
                                title="Tiếp tục"
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
                        <Text style={styles.formTitle}>Chọn phương thức giao hàng</Text>
                        <View style={styles.formGroup}> 
                            
                        </View>
                        <View style={styles.formGroup}>
                            <CustomButton 
                                title="Tiếp tục"
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
                            <Text style={styles.formTitle}>Chọn phương thức thanh toán</Text>
                            <View style={styles.formGroup}>

                            </View>
                            <View style={styles.formGroup}>

                            </View>
                            <View style={styles.formGroup}>
                                <CustomButton 
                                    title="Thanh toán"
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

                        </FormContainer>
                    )
                    : null
                }
            </ScrollView>
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
    }
})

export default Payment;