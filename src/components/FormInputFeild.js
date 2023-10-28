import { View, TextInput, StyleSheet } from "react-native"
import PropTypes from 'prop-types';

function FormInputFeild({ placeholder, icon , value, handleTextChange, isSecure=false, autoFocus=false, type='text' }) {
    return ( 
        <View style={styles.inputContainer}>
            {icon}
            <TextInput 
                style={styles.inputText}
                placeholder={placeholder}
                autoFocus={autoFocus}
                value={value}
                onChangeText={handleTextChange}
                inputMode={type}
                secureTextEntry={isSecure}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:10,
        width:'100%',
        padding: 10,
        borderWidth: 1,
        borderRadius : 6,
        borderColor : '#000',
        backgroundColor : '#fff',
    },
    inputText: {
        flex: 1,
        fontSize: 16,
    }
})

FormInputFeild.proptypes = {
    placeholder : PropTypes.string,
    icon : PropTypes.node,
    value : PropTypes.string.isRequired,
    handleTextChange : PropTypes.func,
    isSecure : PropTypes.bool,
    autoFocus: PropTypes.bool,
    type : PropTypes.string,
}

export default FormInputFeild