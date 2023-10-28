import { View, Text, Pressable, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import GlobalStyles from '../untils/GlobalStyles'

function NavigateQuestion({ question, command , handleNavigate }) {
    return ( 
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <Pressable
                onPress={handleNavigate}
            >
                <Text style={styles.command}>{command}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent : 'center'
    },
    question: {
        fontSize: 14,
        fontWeight : '600'
    },
    command : {
        fontSize : 14,
        fontWeight: '500',
        color: GlobalStyles.primaryColor,
        marginLeft : 4,
    }
})

NavigateQuestion.proptypes = {
    question : PropTypes.string.isRequired,
    command : PropTypes.string.isRequired,
    handleNavigate : PropTypes.func.isRequired,
}

export default NavigateQuestion