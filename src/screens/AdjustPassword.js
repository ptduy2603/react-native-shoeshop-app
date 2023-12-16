import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from 'react-redux'

import GlobalStyles from "../untils/GlobalStyles";
import FormInputField from '../components/FormInputField'
import FormContainer from '../components/FormContainer'
import { adjustPassword } from '../services'

function AdjustPassword() {
    const userToken = useSelector(state => state.authReducer.userToken)

    return ( 
        <SafeAreaView style={[GlobalStyles.container, { marginTop: 0 }]}>
            <Text>AdjustPassword with {userToken}</Text>
        </SafeAreaView>
     )
}

const styles = StyleSheet.create({

})

export default AdjustPassword;