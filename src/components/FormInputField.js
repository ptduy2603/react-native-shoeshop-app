import { View, TextInput, StyleSheet, Pressable, Keyboard } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import { useState } from "react";

function FormInputField({ placeholder, icon , value, handleTextChange, isSecure=false, autoFocus=false, type='text', isInvalid=false, handleOnFocus }) {
    const [hideData, setHideData] = useState(false || isSecure)

    return ( 
        <View style={[styles.inputContainer, isInvalid && { borderColor: 'red' } ]}>
            {icon}
            <TextInput 
                style={styles.inputText}
                placeholder={placeholder}
                autoFocus={autoFocus}
                value={value}
                inputMode={type}
                secureTextEntry={hideData}
                onChangeText={handleTextChange}
                onFocus={handleOnFocus}
                spellCheck={false}
            />
            {isSecure ? 
                (
                    <Pressable 
                        style={styles.eyeIcon}
                        onPress={() => {
                            setHideData(!hideData)
                            Keyboard.dismiss()
                        }}
                    >
                        {
                            <Ionicons name={hideData ? 'eye-off-outline' : 'eye-outline'} size={20} color='black' />
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
})

FormInputField.proptypes = {
    placeholder : PropTypes.string,
    type : PropTypes.string,
    icon : PropTypes.node,
    value : PropTypes.string.isRequired,
    isSecure : PropTypes.bool,
    autoFocus: PropTypes.bool,
    handleTextChange : PropTypes.func,
    handleOnFocus: PropTypes.func,
}

export default FormInputField