import { View, Text, StyleSheet, Image } from "react-native"
import PropTypes from 'prop-types';
import GlobalStyles from "../untils/GlobalStyles";

function FormHeader({ title, image }) {
    return ( 
        <View style={styles.header}>
            <Image 
                style={styles.headerImage}
                source={image}
            />
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        width: 180,
        height: 140,
        objectFit:'contain',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 30,
        color: GlobalStyles.primaryColor,
    }
})

FormHeader.proptypes = {
    title : PropTypes.string,
    image : PropTypes.node.isRequired,
}

export default FormHeader