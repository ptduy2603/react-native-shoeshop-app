import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { useDispatch } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'

import { paymentSteps } from '../data'
import { fetchCountryApi } from '../services'
import GlobalStyles from '../untils/GlobalStyles'
import FormContaner from '../components/FormContainer'
import { useCallback, useEffect, useState } from "react";
// import {  } from '../redux/actions'

function Payment({ route }) {
    const { products, totalPrice } = route.params
    const [currentStep, setCurrentStep] = useState(0)
    const [provinces, setProvinces] = useState([])
    const [currentProvince, setCurrentProvince] = useState({}) //code + name
    const [districts, setDistricts] = useState([])
    const [currentDistrict, setCurrentDistrict] = useState({}) // code + name
    const [wards, setWards] = useState('') // name
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleFetchDistricts = useCallback((provinceCode) => {
        fetchCountryApi(`province=${currentProvince.code}`)
            .then(response => setDistricts(response.data.results))
            .catch(err => console.log('Fetch district error', err))
    }, [provinces, currentProvince])

    useEffect(() => {
         fetchCountryApi('')
            .then(response => {
                setProvinces(response.data.results)
                setCurrentProvince({ name: response.data.results[0].name, code: response.data.results[0].code })
            })
            .catch(err => console.log('Fetch provice error', err))
    }, []) 

    useEffect(() => {
        handleFetchDistricts(currentProvince.code)
        setCurrentDistrict('')
    }, [handleFetchDistricts])

    const handleChooseProvince = (province) => {
        setCurrentProvince({
            name: province.name,
            code: province.code
        })
    }

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { marginTop :0 , paddingTop : 20}]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex : 1, width: '100%' }}>
                <View style={{ width: '100%', flexDirection : 'row', alignItems : 'center', marginBottom : 20, justifyContent : 'space-between' }}>
                    {
                        paymentSteps.map((step, index) => {
                            return (
                                <View style={styles.stepContainer} key={index}>
                                    <View style={[styles.stepIndex, index <= currentStep && { backgroundColor : GlobalStyles.primaryColor }]}>
                                        {
                                            index < currentStep ? (
                                                <Text style={styles.text}>&#10003;</Text>
                                            ) : (
                                                <Text style={styles.text}>{index+1}</Text>
                                            )
                                        }
                                    </View>
                                    { index !== 0 && ( <Text style={[styles.horizontalLine, index <= currentStep && { borderStyle : 'solid' }]} />) }
                                    <Text style={[styles.stepTitle, index <= currentStep && { color : GlobalStyles.primaryColor }]}>{step.title}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                {/* Provide address step */}
                {currentStep === 0 && (
                    <FormContaner style={styles.form}>
                        <Text style={styles.formTitle}>Thông tin địa chỉ giao hàng</Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.fromLabel}>Chọn tỉnh thành:</Text>
                            <SelectDropdown 
                                buttonStyle={styles.selectBox}
                                data={provinces}
                                defaultButtonText={'Chọn tỉnh'}
                                rowTextForSelection={(item, index) => item.name}
                                buttonTextAfterSelection={currentProvince?.name || 'Chọn tỉnh'}
                                buttonTextStyle={{ color : '#fff', fontWeight : '500' }}
                                dropdownStyle={styles.dropdownContainer}
                                showsVerticalScrollIndicator={false}
                                selectedRowStyle={{ backgroundColor : 'rgba(0,0,0,0.1)' }}
                                onSelect={(selectedItem, index) => handleChooseProvince(selectedItem)}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.fromLabel}>Chọn huyện:</Text>
                            <SelectDropdown 
                                buttonStyle={styles.selectBox}
                                data={districts}
                                defaultButtonText={'Chọn huyện'}
                                rowTextForSelection={(item, index) => item.name}
                                buttonTextAfterSelection={() => currentDistrict?.name || 'Chọn huyện'}
                                buttonTextStyle={{ color : '#fff', fontWeight : '500' }}
                                dropdownStyle={styles.dropdownContainer}
                                showsVerticalScrollIndicator={false}
                                selectedRowStyle={{ backgroundColor : 'rgba(0,0,0,0.1)' }}
                            />
                        </View>
                    </FormContaner>
                )}
            </ScrollView>
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({
    stepContainer : {
        position : 'relative',
        alignItems : 'center',
    },
    stepIndex : {
        width: 40,
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
        width : '200%',
        top : '30%',
        transform : [{ translateY : -0.5 }],
        right : '40%',
        zIndex : -1,
        borderWidth : 1,
        borderStyle: 'dashed',
        borderColor : GlobalStyles.primaryColor,
    },
    stepTitle : {
        fontSize : 16,
        fontWeight :'500',
        color : '#ccc',
    },
    form : {

    },
    formTitle : {
        fontSize : 18,
        fontWeight : '600',
        width: '100%',
        textAlign: 'center',
    },
    fromLabel: {
        fontSize : 16,
        fontWeight : '500',
    },
    formGroup : {
        marginTop : 20,
    },
    selectBox : {
        borderRadius : 4,
        minWidth : 200,
        height : 40,
        marginTop : 10,
        backgroundColor : GlobalStyles.primaryColor
    },
    dropdownContainer : {
        width : 300,
        margin : '0 auto',
        borderRadius : 4,
    }
})

export default Payment;