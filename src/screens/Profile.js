import { View, Text, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../untils/GlobalStyles';
import { setCurrentUserAction } from '../redux/actions'

function Profile() {
    const currentUsername = useSelector(state => state.authReducer.username)
    const dispatch = useDispatch()

    return ( 
        <View style={GlobalStyles.container}>
            <Text>Welcome {currentUsername} to my app</Text>
            <View style={{ marginTop: 20 }}>
                <Button 
                    title='Log out'
                    onPress={() => {
                        AsyncStorage.clear()
                        dispatch(setCurrentUserAction('','', false))
                    }}
                />
            </View>
        </View>
     )
}

const styles = StyleSheet.create({
    
})

export default Profile;