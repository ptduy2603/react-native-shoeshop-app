'use strict'
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';

import { validEmailRegex } from '../constants'
import { loginApp } from '../services';
import useValidate from '../hooks/useValidate';
import GlobalStyles from '../untils/GlobalStyles';
import FormContainer from '../components/FormContainer';
import FormHeader from '../components/FormHeader';
import FormInputField from '../components/FormInputField';
import CustomButton from '../components/CustomButton';
import NavigateQuestion from '../components/NavigateQuestion';
import Apploading from '../components/AppLoading'

function Login({ navigation }) {
    // states
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showLoading, setShowLoading] = useState(false)
    const { invalidFields, handleSetInvalidFields, handleResetInvalidFields, handleCheckInvalid } = useValidate()

    // handler functions
    const handleEmailChange = (value) => setEmailInput(value);
    const handlePasswordChange = (value) => setPasswordInput(value);

    const validateFormInput = useCallback(() => {
        let check = true
        if(!emailInput.trim()) {
            handleSetInvalidFields('email', 'Please enter your email')
            check = false
        }
        if(!passwordInput.trim()) {
            handleSetInvalidFields('password', 'Please enter your password')
            check = false
        }
        if(!emailInput.trim().match(validEmailRegex)) {
            handleSetInvalidFields('email', 'Your email is invalid')
            check = false
        }
        return check
    }, [emailInput,passwordInput, handleSetInvalidFields])

    const handleLogin = useCallback(() => {
        if(validateFormInput()) {
            setShowLoading(true)
            const user = {
                email : emailInput,
                password : passwordInput,
            }
            setTimeout(() => {
                setShowLoading(false)

                loginApp(user)
                    .then(response => {
                        // get token from server and store in localStorage
                        const token = response.data.token
                        console.log(token)
                        // navigate to MainBottom tabs
                    })
                    .catch(error => {        
                        console.log(error)                
                        Alert.alert('Error message', error.response.status === 400 ? 'Your password is incorrect' : 'Your email is not exist')
                    })
            }, 1500)
        }
    }, [validateFormInput, emailInput, passwordInput, setShowLoading])

    // return JSX
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <FormContainer>
                <FormHeader
                    image={require('../../assets/images/logo.png')}
                    title="Login Your Account"
                />

                <View style={styles.formGroup}>
                    <FormInputField
                        value={emailInput}
                        autoFocus
                        placeholder="Enter your email"
                        type="email"
                        isInvalid={handleCheckInvalid('email')}
                        icon={<Fontisto name="email" size={26} color="black" />}
                        handleTextChange={handleEmailChange}
                        handleOnFocus={() => handleResetInvalidFields('email')}
                    />
                    {handleCheckInvalid('email') && <Text style={styles.invalidMessage}>{invalidFields['email']}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <FormInputField
                        value={passwordInput}
                        placeholder="Enter your password"
                        isSecure
                        isInvalid={handleCheckInvalid('password')}
                        icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                        handleTextChange={handlePasswordChange}
                        handleOnFocus={() => handleResetInvalidFields('password')}
                    />
                    {handleCheckInvalid('password') && <Text style={styles.invalidMessage}>{invalidFields['password']}</Text>}
                </View>

                <View
                    style={{
                        marginTop: 14,
                        width: '100%',
                    }}
                >
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 20, width: '100%' }}>
                    <CustomButton title="LOGIN" handleOnPress={handleLogin} />
                </View>

                <View style={{ marginTop: 30, width: '100%' }}>
                    <NavigateQuestion
                        question="Don't have an account?"
                        command="Sign Up"
                        handleNavigate={() => navigation.navigate('SignUp')}
                    />
                </View>
            </FormContainer>
            { showLoading && <Apploading /> }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        marginTop: 26,
        width: '100%',
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: '500',
        color: GlobalStyles.primaryColor,
    },
    invalidMessage: {
        fontSize: 13,
        color : 'red',
        marginTop: 2,
    },
});

export default Login;
