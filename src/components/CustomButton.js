import { Pressable, Text, StyleSheet } from "react-native"
import GlobalStyles from "../untils/GlobalStyles"
import PropTypes from 'prop-types';

function CustomButton({ title, buttonColor , handleOnPress, disabled=false}) {
    return (
        <Pressable
            style={[styles.button, buttonColor ? {backgroundColor: buttonColor} : {}]}
            disabled={disabled}
            onPress={handleOnPress}
        >
            <Text style={styles.buttonTitle}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width : '100%',
        borderRadius: 4,
        backgroundColor : GlobalStyles.primaryColor,
        paddingVertical: 10,
    },
    buttonTitle : {
        color : '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
})

CustomButton.proptypes = {
    title : PropTypes.string.isRequired,
    buttonColor: PropTypes.string,
    disabled : PropTypes.bool,
    handleOnPress: PropTypes.func.isRequired,
}

export default CustomButton