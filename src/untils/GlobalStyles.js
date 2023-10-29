import { StyleSheet, StatusBar} from "react-native"

const GlobalStyles = StyleSheet.create({
    primaryColor : '#0081ff',
    container : {
        flex: 1,
        backgroundColor : '#fafafc',
        alignItems: 'center',
        marginTop : StatusBar.currentHeight || 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})

export default GlobalStyles