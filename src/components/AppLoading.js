import { View, StyleSheet } from 'react-native'

import LottieView from 'lottie-react-native'

// loading effect in this app
function AppLoading() {
    return ( 
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView 
                style={{width:100, height: 100}}
                source={require('../../assets/animations/loading.json')}
                autoPlay={true}
                loop
            />
        </View>
     )
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex : 10,
    }
})

export default AppLoading