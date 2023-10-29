import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Fontisto, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

import FormContainer from '../components/FormContainer';
import FormHeader from '../components/FormHeader';
import FormInputFeild from '../components/FormInputFeild';
import CustomButton from '../components/CustomButton';
import NavigateQuestion from '../components/NavigateQuestion';
import GlobalStyles from '../untils/GlobalStyles';

function SignUp({ navigation }) {
    const [username, setUsername] = useState('')
    const [email, setEmail]  = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setComfirmationPassword] = useState('')

    const handleCreateNewAccount = () => {
        console.log('Create new account')
    }

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
                            value={username}
                            autoFocus
                            placeholder="User name"
                            icon={<FontAwesome name="user-o" size={26} color="black" />}
                            handleTextChange={(value) => setUsername(value)}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={email}
                            placeholder="Your email"
                            type="email"
                            icon={<Fontisto name="email" size={26} color="black" />}
                            handleTextChange={(value) => setEmail(value) }
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={password}
                            placeholder="Your password"
                            isSecure
                            icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                            handleTextChange={(value) => setPassword(value) }
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <FormInputFeild
                            value={confirmationPassword}
                            placeholder="Confirm your password"
                            isSecure
                            icon={<SimpleLineIcons name="lock" size={26} color="black" />}
                            handleTextChange={(value) => setComfirmationPassword(value)}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <CustomButton
                        title="CREATE"
                        handleOnPress={handleCreateNewAccount}
                    />
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
});

export default SignUp;
