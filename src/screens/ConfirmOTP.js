import { Text, View, StyleSheet, SafeAreaView, Alert} from 'react-native'
import GlobalStyles from '../untils/GlobalStyles'

import FormHeader from '../components/FormHeader'
import FormInputField from '../components/FormInputField'
import AppLoading from '../components/AppLoading'
import CustomButton from '../components/CustomButton'
import { verifyResetPassword } from '../services'
import { useState } from 'react'

function ConfirmOTP({ navigation, route }) {
    const [otp, setOtp] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const { verifyToken, userId} = route.params;

    const handleVerifyOtp = () => {
        if(!otp.trim() || otp.length < 4)
            return
        setShowLoading(true)
        setTimeout(() => {
            verifyResetPassword(verifyToken, otp, userId)
                .then(response => {
                    navigation.navigate('ResetPassword', { userId : response.data.userId, token : response.data.token })
                })
                .catch(err => {
                    console.log('Verify error', err)
                    Alert.alert('Error', 'Your OTP is incorrect')
                    navigation.goBack()
                })
        }, 1200)
    }

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center' }]}>
            <FormHeader 
                title="Enter your OTP"
                image={require('../../assets/images/forgotpassword.jpg')}
            />
            <View style={styles.wrapper}>
                <FormInputField 
                    type='numeric'
                    maxLength={4}
                    value={otp}
                    handleTextChange={(value) => setOtp(value)}
                />              
            </View>
            <View style={{ width:'100%' }}>
                <CustomButton 
                    title="Verify"
                    extraStyles={{ marginTop: 40 }}
                    handleOnPress={handleVerifyOtp}
                />
            </View>
            { showLoading && <AppLoading /> }
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 40
    }
})

export default ConfirmOTP