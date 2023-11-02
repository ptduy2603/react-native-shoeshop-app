import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

function Profile() {
    const currentUsername = useSelector(state => state.authReducer.username)

    return ( 
        <View>
            <Text>Welcome {currentUsername} to my app</Text>
        </View>
     )
}

const styles = StyleSheet.create({

})

export default Profile;