'use strict'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';

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

    // handler functions
    const handleEmailChange = (value) => setEmailInput(value);
    const handlePasswordChange = (value) => setPasswordInput(value);
    const handleLogin = () => {
        console.log('Login');
    };

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
                        icon={<Fontisto name="email" size={26} color="black" />}
                        handleTextChange={handleEmailChange}
                    />
                </View>
                <View style={styles.formGroup}>
                    <FormInputFeild
                        value={passwordInput}
                        placeholder="Enter your password"
                        isSecure
                        icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                        handleTextChange={handlePasswordChange}
                    />
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
});

export default Login;
