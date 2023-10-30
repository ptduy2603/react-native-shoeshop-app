'use strict';
import { useReducer, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Keyboard, Alert } from 'react-native';
import { Fontisto, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import useValidate from '../hooks/useValidate';
import FormContainer from '../components/FormContainer';
import FormHeader from '../components/FormHeader';
import FormInputFeild from '../components/FormInputFeild';
import CustomButton from '../components/CustomButton';
import NavigateQuestion from '../components/NavigateQuestion';
import GlobalStyles from '../untils/GlobalStyles';
import { validEmailRegex } from '../constants';

const initState = {
    username: '',
    email: '',
    password: '',
    confirmationPassword: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE': {
            return {
                ...state,
                [action.payload.input]: action.payload.data,
            };
        }
        case 'RESET_VALUE_ALL': {
            return initState;
        }
        default:
            return state;
    }
};

function SignUp({ navigation }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const { invalidFeilds, handleSetInvalidFeilds, handleResetInvalidFeilds, handleCheckInvalid } =
        useValidate();

    const handleInputChange = (input, value) => {
        dispatch({
            type: 'SET_VALUE',
            payload: {
                input,
                data: value,
            },
        });
    };

    const validateFormInput = useCallback(() => {
        let check = true;
        Keyboard.dismiss();
        if (!state.username.trim()) {
            handleSetInvalidFeilds('username', 'Please enter your username');
            check = false;
        }
        if (state.confirmationPassword.trim() !== state.password.trim()) {
            handleSetInvalidFeilds('confirmationPassword', 'Your confirmation is incorrect');
            check = false;
        }
        if (!state.email.trim()) {
            handleSetInvalidFeilds('email', 'Please enter your email');
            check = false;
        }
        if (!state.password.trim()) {
            handleSetInvalidFeilds('password', 'Please enter your password');
            check = false;
        }
        if (!state.confirmationPassword.trim()) {
            handleSetInvalidFeilds('confirmationPassword', 'Please confirm your password');
            check = false;
        }
        // check valid email's format
        if (!state.email.trim().match(validEmailRegex)) {
            handleSetInvalidFeilds('email', 'Your email is invalid');
            check = false;
        }

        return check;
    }, [state, handleSetInvalidFeilds]);

    const handleCreateNewAccount = useCallback(() => {
        if (validateFormInput()) {
            const user = {
                username: state.username,
                email: state.email,
                password: state.password,
            };
            // send request to server to create new user
            axios
                .post('http://10.0.2.2:8000/users/register', user)
                .then((response) => {
                    console.log(response);
                    Alert.alert("Sign up successfully!", "Message")
                    dispatch({ type : 'RESET_VALUE_ALL' })

                    // Loading effect and navigate to SignIn screen
                    
                })
                .catch((error) => {
                    Alert.alert('Error message', 'Registration failed, your mail is existent')
                    console.log('Registration error: ', error);
                });
        }
    }, [validateFormInput]);

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <FormContainer>
                <FormHeader
                    image={require('../../assets/images/logo.png')}
                    title="Create New Account"
                />
                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={state.username}
                            isInvalid={handleCheckInvalid('username')}
                            placeholder="User name"
                            icon={<FontAwesome name="user-o" size={26} color="black" />}
                            handleTextChange={(value) => handleInputChange('username', value)}
                            handleOnFocus={() => handleResetInvalidFeilds('username')}
                        />
                        {handleCheckInvalid('username') && (
                            <Text style={styles.invalidMessage}>{invalidFeilds['username']}</Text>
                        )}
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={state.email}
                            placeholder="Your email"
                            isInvalid={handleCheckInvalid('email')}
                            type="email"
                            icon={<Fontisto name="email" size={26} color="black" />}
                            handleTextChange={(value) => handleInputChange('email', value)}
                            handleOnFocus={() => handleResetInvalidFeilds('email')}
                        />
                        {handleCheckInvalid('email') && (
                            <Text style={styles.invalidMessage}>{invalidFeilds['email']}</Text>
                        )}
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={state.password}
                            placeholder="Your password"
                            isInvalid={handleCheckInvalid('password')}
                            isSecure
                            icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                            handleTextChange={(value) => handleInputChange('password', value)}
                            handleOnFocus={() => handleResetInvalidFeilds('password')}
                        />
                        {handleCheckInvalid('password') && (
                            <Text style={styles.invalidMessage}>{invalidFeilds['password']}</Text>
                        )}
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={state.confirmationPassword}
                            placeholder="Confirm your password"
                            isInvalid={handleCheckInvalid('confirmationPassword')}
                            isSecure
                            icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                            handleTextChange={(value) =>
                                handleInputChange('confirmationPassword', value)
                            }
                            handleOnFocus={() => handleResetInvalidFeilds('confirmationPassword')}
                        />
                        {handleCheckInvalid('confirmationPassword') && (
                            <Text style={styles.invalidMessage}>
                                {invalidFeilds['confirmationPassword']}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomButton title="CREATE" handleOnPress={handleCreateNewAccount} />
                </View>

                <View style={{ marginTop: 30 }}>
                    <NavigateQuestion
                        question="Already have an account?"
                        command="Sign In"
                        handleNavigate={() => navigation.navigate('Login')}
                    />
                </View>
            </FormContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        marginTop: 26,
    },
    formGroup: {
        marginTop: 26,
        width: '100%',
    },
    invalidMessage: {
        fontSize: 13,
        color: 'red',
        marginTop: 2,
    },
});

export default SignUp;
