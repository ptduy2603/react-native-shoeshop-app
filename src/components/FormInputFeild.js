import { View, TextInput, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import { useState } from "react";

function FormInputFeild({ placeholder, icon , value, handleTextChange, isSecure=false, autoFocus=false, type='text' }) {
    const [hideData, setHideData] = useState(true)

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
                secureTextEntry={hideData}
            />
            {isSecure ? 
                (
                    <Pressable 
                        style={styles.eyeIcon}
                        onPress={() => setHideData(!hideData)}
                    >
                        {
                            hideData ?  <Ionicons name='eye-off-outline' size={20} /> : <Ionicons name='eye-outline' size={20} />
                        }
                    </Pressable>
                ) 
            : 
                null 
            }
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
    },
    eyeIcon: {

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