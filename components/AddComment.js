import React, { useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, Text, TextInput, StyleSheet, Keyboard, ScrollView, ToastAndroid, ActivityIndicator} from 'react-native'
import {Button, Surface} from 'react-native-paper'
import { addComment} from '../reducers/forumReducer';
import {BigHead} from 'react-native-bigheads'
import Ficon from 'react-native-vector-icons/FontAwesome5'

const countAt = (passed) => {
  let count = 0
  for(let i = 0; i < passed.length; i++){
    if(passed[i] === '@'){
      count++
    }
  }
  return count;
}


const AddComment = ({navigation, route}) => {
  const { postId} = route.params;
  const post = useSelector(state => state.forum.answered.find(p => p._id === postId))
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.forum.loading)
  const [comment, setComment] = useState('')

  const submitComment = async () => {
    const postToModifyId = post;
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else if (comment === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น', ToastAndroid.SHORT);
    } else if (countAt(reply) >= 2) {
      ToastAndroid.show('you can only have one @mention', ToastAndroid.SHORT)
    }else {
      try {
        dispatch(addComment(comment, postToModifyId));
        setTimeout(() => {
          navigation.navigate('SinglePostDisplay', {
            postId: postId,
            });
      }, 2000);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  return(
    <ScrollView style={styles.container}>
      <View style={styles.graphicView}>
      <BigHead {...activeUser.avatarProps} size={180}/>
      </View>
      <View>
        <Text style={styles.leadIn}>
          {`${activeUser.avatarName} says...`}
        </Text>
      </View>

      <Surface style={styles.surface}>
        <Ficon name='quote-left' size={25} color='gray'/>
      <TextInput
          style={styles.textAreaComment}
          multiline
          autoFocus={true}
          textAlignVertical="center"
          textAlign='center'
          numberOfLines={2}
          onChangeText={(c) => setComment(c)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          blurOnSubmit
          value={comment}
        />
        <Ficon name='quote-right' size={25} style={styles.rightQuote} color='gray'/>
        </Surface>
        {!loading ?
        <Button style={styles.commentButton} icon='comment-plus' mode='contained' onPress={submitComment}>
          <Text style={styles.commentButtonText}>
            Submit
          </Text>
        </Button>
: <ActivityIndicator style={styles.spinner} color='pink'/>}
    </ScrollView>
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
  leadIn: {
    alignSelf: 'center',
    margin: 10,
  },
  textAreaComment: {
    color: 'gray',
  },
  commentButton: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 300,
      backgroundColor: 'lightgray',
      marginBottom: 40,
      marginTop: 20
  },
  commentButtonText: {
    color: 'black'
  },
  rightQuote: {
    alignSelf: 'flex-end'
  },
  spinner: {
    marginTop: 25,
  }
})
export default AddComment