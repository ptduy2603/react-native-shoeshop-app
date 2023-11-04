import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

function SocialsLogin() {
    const handleLoginWithFacebook = () => {
        console.log('Facebook')
    }

    return ( 
        <>
            <View style={styles.horizotalLineContainer}>
                <View style={styles.horizotalLine}></View>
                <Text style={styles.horizotalLineText}>or</Text>
            </View>
            <View style={styles.socialsContainer}>
                <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => {}}
                        activeOpacity={0.6}
                    >
                        <Image  
                            style={styles.socialImage}
                            source={require('../../assets/images/google_logo.png')}
                        />
                        <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                        style={styles.socialButton}
                        onPress={handleLoginWithFacebook}
                    >
                        <Image 
                            style={styles.socialImage}
                            source={require('../../assets/images/facebook_logo.png')}
                        />
                        <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
            </View>
        </>
     )
}

const styles = StyleSheet.create({
    horizotalLineContainer: {
        marginTop: 40,
        width: '100%',
        position: 'relative',
    },
    horizotalLine : {
        width: '100%',
        height: 1,
        backgroundColor: '#c3c3c3',
        zIndex: -1,
        position: 'absolute',
        top: 14,
    },
    horizotalLineText: {
        fontWeight: '600',
        fontSize: 18,
        paddingHorizontal: 4,
        backgroundColor: '#fafafc',
        width: 40,
        left: '50%',
        transform: [{ translateX : -20 }],
        textAlign: 'center',
    },
    socialsContainer : {
        flexDirection: 'row',
        width: '100%',
        flex: 2,
        marginTop: 20,
        gap: 20,
    },
    socialButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#c3c3c3',
        paddingVertical: 8,
        flex: 1,
    },
    socialImage: {
        width: 30,
        height: 30,
    },
    socialText: {
        marginLeft:10,
        fontSize: 18,
        fontWeight: '500'
    }
})

export default SocialsLogin;