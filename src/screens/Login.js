import { View,Text, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons'

import GlobalStyles from '../untils/GlobalStyles'
import FormHeader from '../components/FormHeader'
import FormInputFeild from '../components/FormInputFeild'
import CustomButton from '../components/CustomButton'
import NavigateQuestion from '../components/NavigateQuestion';

function Login({ navigation }) {
    // states
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    // handler functions
    const handleEmailChange = (value) => setEmailInput(value);
    const handlePasswordChange = (value) => setPasswordInput(value);
    const handleLogin = () => {
        console.log('Login')
    }

    // return JSX
    return (
        <SafeAreaView style={GlobalStyles.container}>
            <FormHeader
                image={require('../../assets/images/logo.png')}
                title="Login Your Account"
            />
            <KeyboardAvoidingView>
                <View style={styles.form}>
                    <View style={styles.fromGroup}>
                        <FormInputFeild
                            value={emailInput}
                            autoFocus
                            placeholder="Enter your email"
                            type="email"
                            icon={<Fontisto name="email" size={26} color="black" />}
                            handleTextChange={handleEmailChange}
                        />
                    </View>
                    <View style={styles.fromGroup}>
                        <FormInputFeild
                            value={passwordInput}
                            placeholder="Enter your password"
                            isSecure
                            icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                            handleTextChange={handlePasswordChange}
                        />
                    </View>
                </View>

                <View 
                    style={{
                        marginTop : 14,
                    }}
                >
                    <Text style={styles.forgotPassword}>Forgot Password</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <CustomButton 
                        title="LOGIN"
                        handleOnPress={handleLogin}
                    />
                </View>
                
                <View style={{marginTop: 30}}>
                   <NavigateQuestion 
                        question="Don't have an account?"
                        command="Sign Up"
                        handleNavigate={() => navigation.navigate('SignUp')}
                   />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        marginTop: 26,
    },
    fromGroup: {
        marginTop: 26,
        width: '100%',
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: '500',
        color : GlobalStyles.primaryColor
    }
});

export default Login;
