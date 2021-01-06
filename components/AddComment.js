import React, { useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, TextInput, StyleSheet, Keyboard, ScrollView, ToastAndroid, ActivityIndicator} from 'react-native'
import {Button, Surface, Text, useTheme} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import Ficon from 'react-native-vector-icons/FontAwesome5'
import { addComment} from '../reducers/forumReducer';
import {addPoints, levelUp} from '../reducers/activeUserReducer'
import {shouldLevelUp} from '../helperFunctions'

const AddComment = ({navigation}) => {
  const theme = useTheme()
  const post = useSelector(state => state.forum.activePost)
  const user = useSelector(state => state.activeUser.user)
  const userPoints = useSelector(state => state.activeUser.userPoints);
  const userLevel = useSelector(state => state.activeUser.userLevel);
  const dispatch = useDispatch()
  const loading = useSelector(state => state.forum.loading)
  const [comment, setComment] = useState('')

  const submitComment = async () => {
    const postToModify = post;
    if (user === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else if (comment === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น', ToastAndroid.SHORT);
    }else {
      try {
        dispatch(addComment(comment, postToModify));
        dispatch(addPoints(user._id, 1))
      if(shouldLevelUp(userPoints, userLevel, 1)){
        dispatch(levelUp(user._id))
      }
        setTimeout(() => {
          navigation.navigate('SinglePostDisplay');
        }, 2000);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };

  return(
    <ScrollView
      style={styles.container}
    >
      <View
        style={styles.graphicView}
      >
        <BigHead
          {...user.avatarProps} size={180}
        />
      </View>
      <View>
        <Text
          style={styles.leadIn}
        >
          {`${user.avatarName} says...`}
        </Text>
      </View>

      <Surface
        style={styles.surface}
      >
        <Ficon
          name='quote-left' size={25} color='gray'
        />
        <TextInput
          style={{...styles.textAreaComment, color: theme.colors.onSurface }}
          multiline
          autoFocus
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
        <Ficon
          name='quote-right' size={25} style={styles.rightQuote} color='gray'
        />
      </Surface>
      {!loading ? (
        <Button
          style={styles.commentButton} icon='comment-plus' mode='contained' onPress={submitComment}
        >
          <Text
            style={styles.commentButtonText}
          >
            Submit
          </Text>
        </Button>
      )
        : <ActivityIndicator
            style={styles.spinner} color='pink'
        />}
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