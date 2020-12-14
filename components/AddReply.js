import React, { useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native'
import {Button, Surface} from 'react-native-paper'
import { addComment} from '../reducers/forumReducer';
import AddCommentGraphic from '../undraw_Add_content_re_vgqa.svg'


const AddReply = ({navigation, route}) => {
  const { postId} = route.params;
  const post = useSelector(state => state.forum.answered.find(p => p._id === postId))
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('')

  const submitComment = async () => {
    const postToModifyId = post;
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else if (comment === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น', ToastAndroid.SHORT);
    } else {
      try {
        setIsLoading(true);
        dispatch(addComment(comment, postToModifyId));
        setComment('');
        setIsLoading(false)
        navigation.navigate('SinglePostDisplay', {
        postId: postId,
        });
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.graphicView}>
      <AddCommentGraphic width={180} height={180}/>
      </View>
      <Surface style={styles.surface}>
      <TextInput
          style={styles.textAreaComment}
          multiline
          textAlignVertical="top"
          numberOfLines={6}
          placeholderTextColor='gray'
          placeholder="Add a comment..."
          onChangeText={(c) => setComment(c)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          blurOnSubmit
          value={comment}
        />
        </Surface>
        <Button style={styles.commentButton} icon='comment-plus' mode='contained' onPress={submitComment}>
          <Text style={styles.commentButtonText}>
            Submit
          </Text>
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  graphicView: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  surface: {
    borderRadius: 10,
    padding: 10
  },
  textAreaComment: {
    color: 'gray'
  },
  commentButton: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 300,
      backgroundColor: 'lightgray',
      marginBottom: 20,
      marginTop: 20
  },
  commentButtonText: {
    color: 'black'
  }
})
export default AddReply