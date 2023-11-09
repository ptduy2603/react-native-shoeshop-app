import { Pressable, View, Text, StyleSheet} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import GlobalStyles from "../untils/GlobalStyles";


function OptionTag({ isShowMore=false, isPrimaryTag=false, icon=null, title, content, handleOnPress=()=>{}, disabled=false }) {
    return ( 
        <Pressable
            style={[styles.optionContainer, isPrimaryTag && styles.primaryContainer]}
            disabled={disabled}
            onPress={handleOnPress}
        >
            <View style={{ flexDirection : 'row' , justifyContent: 'center', alignItems : 'center' }}>
                {icon}
                <Text style={[isPrimaryTag ? styles.primaryText : styles.text, icon && { marginLeft : 10 }]}>{title}</Text>
            </View>
            <View style={{ flexDirection : 'row' , justifyContent: 'center', alignItems : 'center' }}>
                <Text style={[isPrimaryTag ? styles.primaryText : styles.text, isShowMore && { marginRight : 4 }]}>{content}</Text>
                {
                    isShowMore && <Fontisto name='angle-right' color={isPrimaryTag ? GlobalStyles.primaryColor : '#c3c3c3'} size={isPrimaryTag ? 18 : 16} />
                }
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    optionContainer : {
        backgroundColor: '#fff',
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingVertical : 16,
        borderBottomWidth : 1,
        borderColor : 'rgba(0,0,0,0.2)'
    },
    primaryContainer: {
        borderRadius : 8,
        marginTop : 30,
        borderBottomWidth : 0,
    },
    text : {
        fontSize : 16,
        fontWeight : '500',
        color : '#333'
    },
    primaryText : {
        fontWeight : '600',
        color : GlobalStyles.primaryColor,
        fontSize : 18,
    }
})

OptionTag.proptypes = {
    isShowMore : PropTypes.bool,
    isPrimaryTag : PropTypes.bool,
    disabled : PropTypes.bool,
    icon : PropTypes.node,
    title : PropTypes.string.isRequired,
    content : PropTypes.string,
    handleOnPress : PropTypes.func,
}

export default OptionTag;