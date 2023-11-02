import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCallback, useState } from 'react';
import { resetPassword } from '../services';
import { setCurrentUserAction } from '../redux/actions'
import FormHeader from '../components/FormHeader';
import AppLoading from '../components/AppLoading';
import FormInputField from '../components/FormInputField';
import CustomButton from '../components/CustomButton';
import GlobalStyles from '../untils/GlobalStyles';
import useValidate from '../hooks/useValidate';

function ResetPassword({ route }) {
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const { invalidFields, handleCheckInvalid, handleResetInvalidFields, handleSetInvalidFields } =  useValidate();
    const dispatch = useDispatch()
    
    const { userId, token } = route.params;
    const validateInput = useCallback(() => {
        let check = true
        if(!password.trim()) {
            handleSetInvalidFields('password', 'Please enter your new password')
            check = false
        }
        if(confirmationPassword.trim() !== password.trim()) {
            handleSetInvalidFields('confirmationPassword', 'Your comfirmation is incorrect')
            check = false
        }
        if(!confirmationPassword.trim()) {
            handleSetInvalidFields('confirmationPassword', 'Please confirm your new password')
            check = false
        }
        return check

    }, [handleSetInvalidFields])

    // Continue.....
    const handleResetPassword = () => {
        if(validateInput()) {
            setShowLoading(true)
            setTimeout(() => {
                setShowLoading(false)
                resetPassword(userId,token, password)
                    .then(response => {
                        AsyncStorage.setItem('userToken', response.data.token)
                        AsyncStorage.setItem('currentUsername', response.data.username)
                        AsyncStorage.setItem('currentUserEmail', response.data.email)
                        Alert.alert('Message', 'Reset your password successfully!', [{ text: 'OK', onPress: () => {
                            dispatch(setCurrentUserAction(response.data.email, response.data.username, true))
                        } }])
                    })
                    .catch(error => {
                        Alert.alert('Error message', 'Reset password error')
                        console.log(error)
                    })
            }, 1400)
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center' }]}>
            <FormHeader
                image={require('../../assets/images/forgotpassword.jpg')}
                title="Enter your new password"
            />
            <View style={{ marginTop: 40 }}>
                <View style={{ width: '100%', marginTop:20 }}>
                    <FormInputField
                        value={password}
                        placeholder="Your new password"
                        isInvalid={handleCheckInvalid('password')}
                        isSecure
                        icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                        handleTextChange={(value) => setPassword(value)}
                        handleOnFocus={() => handleResetInvalidFields('password')}
                    />
                    {handleCheckInvalid('password') && (
                        <Text style={styles.invalidMessage}>
                            {invalidFields['password']}
                        </Text>
                    )}
                </View>
                <View style={{ width: '100%', marginTop:20 }}>
                    <FormInputField
                        value={confirmationPassword}
                        placeholder="Confirm your password"
                        isInvalid={handleCheckInvalid('confirmationPassword')}
                        isSecure
                        icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                        handleTextChange={(value) => setConfirmationPassword(value)}
                        handleOnFocus={() => handleResetInvalidFields('confirmationPassword')}
                    />
                    {handleCheckInvalid('confirmationPassword') && (
                        <Text style={styles.invalidMessage}>
                            {invalidFields['confirmationPassword']}
                        </Text>
                    )}
                </View>

                <View style={{ marginTop: 40 }}>
                    <CustomButton 
                        title="Reset Password"
                        handleOnPress={handleResetPassword}
                    />
                </View>
            </View>
            { showLoading && <AppLoading /> }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    invalidMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 2,
    },
})

export default ResetPassword;
