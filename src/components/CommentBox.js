import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import GlobalStyles from '../untils/GlobalStyles'

function CommentBox({ comment }) {
    const [isLiked, setIsLiked] = useState(false)

    const date = new Date()
    return ( 
        <View style={styles.commentWrapper}>
            <View style={styles.userSection}>
                <Image 
                    style={styles.userAvatar} 
                    source={require('../../assets/images/default_avatar.png')}
                />
                <View>
                    <Text style={styles.username}>{comment?.name}</Text>
                    <Text style={{ fontSize : 13, color : '#333' }}>{comment?.posted || new Date().toJSON().slice(0,10) }</Text>
                </View>
            </View>
            <View style={styles.commentContainer}>
                <Text style={styles.text}>{comment?.text}</Text>
            </View>
            <View style={styles.commentControls}>
                <Pressable
                    onPress={() => setIsLiked(!isLiked)}
                >
                    { isLiked ? <AntDesign name='like1' color={GlobalStyles.primaryColor} size={18} /> : <AntDesign name='like2' size={18} /> }
                </Pressable>
                <Pressable>
                    <Text style={{ marginLeft : 10, fontWeight : '500' }}>Reply</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentWrapper : {
        width : '100%',
        borderTopWidth : 1,
        borderTopColor : 'rgba(0,0,0,0.1)',
        paddingVertical : 8,
        marginTop : 10,
    },
    userSection : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
    },
    userAvatar : {
        width : 40,
        height : 40,
        borderRadius : 15,
        marginRight : 10,
    },
    username : {
        fontSize : 16,
        fontWeight : '500',
    },
    text : {
        fontSize : 16,
        marginTop : 2,
        textAlign : 'justify',
    },
    commentControls : {
        marginTop : 10,
        flexDirection : 'row',
        alignItems : 'center',
    }
})

export default CommentBox;