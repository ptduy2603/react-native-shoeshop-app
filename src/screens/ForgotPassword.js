'use strict'
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useState } from 'react';

import { validEmailRegex } from '../constants';
import FormHeader from '../components/FormHeader';
import FormInputField from '../components/FormInputField';
import CustomButton from '../components/CustomButton';
import NavigateQuestion from '../components/NavigateQuestion';
import useValidate from '../hooks/useValidate';
import GlobalStyles from '../untils/GlobalStyles';
import { requestResetPassword } from '../services';

function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const { invalidFields, handleCheckInvalid, handleResetInvalidFields, handleSetInvalidFields } =
        useValidate();

    const handleEmailChange = (value) => setEmail(value);

    const validateInput = () => {
        let check = true;
        if (!email.trim().match(validEmailRegex)) {
            handleSetInvalidFields('email', 'Your email is invalid');
            check = false;
        }
        if (!email.trim()) {
            handleSetInvalidFields('email', 'Please enter your email to reset password');
            check = false;
        }
        return check;
    };

    const handleResetPassword = () => {
        if (validateInput()) {
            requestResetPassword(email)
                .then((response) => {
                    Alert.alert('Message', `We have send an OTP to ${email}. Check it out`, [
                        {
                            text: 'OK',
                            onPress: () => {
                                setEmail('');
                                navigation.navigate('ConfirmOTP', { verifyToken : response.data.token, userId : response.data.userId })
                            },
                        },
                    ]);
                })
                .catch((error) => {
                    Alert.alert('Error', 'Your email is not exist');
                });
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center' }]}>
            <FormHeader
                title="Forgot password?"
                image={require('../../assets/images/forgotpassword.jpg')}
            />
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    Don't worry, happens to the best of us. Please enter your email to reset your
                    password.
                </Text>
                <View>
                    <FormInputField
                        value={email}
                        placeholder="Enter your email"                        
                        type="email"
                        isInvalid={handleCheckInvalid('email')}
                        icon={<Fontisto name="email" size={26} color="black" />}
                        handleTextChange={handleEmailChange}
                        handleOnFocus={() => handleResetInvalidFields('email')}
                    />
                    {handleCheckInvalid('email') && (
                        <Text style={styles.invalidMessage}>{invalidFields['email']}</Text>
                    )}
                </View>
                <View style={styles.button}>
                    <CustomButton title="GET OTP" handleOnPress={handleResetPassword} />
                </View>
                <View style={styles.questionsContainer}>
                    <NavigateQuestion
                        question="Remember password?"
                        command="Login now!"
                        handleNavigate={() => navigation.goBack()}
                    />
                    <NavigateQuestion
                        question="Don't have an account?"
                        command="Sign up now!"
                        handleNavigate={() => navigation.navigate('SignUp')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    invalidMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 2,
    },
    subtitle: {
        paddingBottom: 40,
        paddingTop: 20,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '600',
        color: '#333',
    },
    button: {
        marginTop: 30,
    },
    questionsContainer: {
        marginTop: 40,
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ForgotPassword;
