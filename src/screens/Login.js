'use strict'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';

import { validEmailRegex } from '../constants'
import useValidate from '../hooks/useValidate';
import GlobalStyles from '../untils/GlobalStyles';
import FormContainer from '../components/FormContainer';
import FormHeader from '../components/FormHeader';
import FormInputFeild from '../components/FormInputFeild';
import CustomButton from '../components/CustomButton';
import NavigateQuestion from '../components/NavigateQuestion';

function Login({ navigation }) {
    // states
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { invalidFeilds, handleSetInvalidFeilds, handleResetInvalidFeilds, handleCheckInvalid } = useValidate()

    // handler functions
    const handleEmailChange = (value) => setEmailInput(value);
    const handlePasswordChange = (value) => setPasswordInput(value);

    const validateFormInput = useCallback(() => {
        let check = true
        if(!emailInput.trim()) {
            handleSetInvalidFeilds('email', 'Please enter your email')
            check = false
        }
        if(!passwordInput.trim()) {
            handleSetInvalidFeilds('password', 'Please enter your password')
            check = false
        }
        if(!emailInput.trim().match(validEmailRegex)) {
            handleSetInvalidFeilds('email', 'Your email is invalid')
            check = false
        }
        return check
    }, [emailInput,passwordInput, handleSetInvalidFeilds])

    const handleLogin = useCallback(() => {
        if(validateFormInput()) {
            console.log('Login successfully')
        }
    }, [validateFormInput])

    // return JSX
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <FormContainer>
                <FormHeader
                    image={require('../../assets/images/logo.png')}
                    title="Login Your Account"
                />

                <View style={styles.formGroup}>
                    <FormInputFeild
                        value={emailInput}
                        autoFocus
                        placeholder="Enter your email"
                        type="email"
                        isInvalid={handleCheckInvalid('email')}
                        icon={<Fontisto name="email" size={26} color="black" />}
                        handleTextChange={handleEmailChange}
                        handleOnFocus={() => handleResetInvalidFeilds('email')}
                    />
                    {handleCheckInvalid('email') && <Text style={styles.invalidMessage}>{invalidFeilds['email']}</Text>}
                </View>
                <View style={styles.formGroup}>
                    <FormInputFeild
                        value={passwordInput}
                        placeholder="Enter your password"
                        isSecure
                        isInvalid={handleCheckInvalid('password')}
                        icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                        handleTextChange={handlePasswordChange}
                        handleOnFocus={() => handleResetInvalidFeilds('password')}
                    />
                    {handleCheckInvalid('password') && <Text style={styles.invalidMessage}>{invalidFeilds['password']}</Text>}
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
