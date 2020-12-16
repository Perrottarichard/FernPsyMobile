import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, ScrollView, RefreshControl, StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import { initializeForumPending, initializeForumAnswered } from '../reducers/forumReducer';
import Logout from './Logout'

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const MyQuestions = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector((state) => state.activeUser.user);
  const avatarProps = user.avatarProps
  const avatarName = user.avatarName
  const id = user._id;
  const answered = useSelector((state) => state.forum.answered);
  const pending = useSelector((state) => state.forum.pending);
  const myAnsweredPosts = answered.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const myPendingPosts = pending.filter((p) => p.user?.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    if(answered.length === 0){
      console.log('UF Answered MQ')
      dispatch(initializeForumAnswered());
    }
  }, []);

  useEffect(() => {
    if(pending.length === 0){
      console.log('UF Pending MQ')
      dispatch(initializeForumPending());
    }
  }, []);

  const onRefresh = useCallback(() => {
    console.log('callback MQ init')
    setRefreshing(true);
    dispatch(initializeForumAnswered());
    dispatch(initializeForumPending());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return(
  <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <View style={styles.editAvatarContainer}>
    <BigHead {...avatarProps} size={160}/>
    <View>
    <Text style={styles.avatarIntro}>
             สวัสดี, ฉันคือ {avatarName} เราเป็นเพื่อนกันแล้วนะ
          </Text>
        <Button mode='text' icon='square-edit-outline'style={styles.showEditAvatarButton} onPress={() => navigation.navigate("EditAvatar")}>
          <Text style={styles.showEditAvatarText}>
            แก้ไข
          </Text>
        </Button>
        </View>
    </View>
    <View style={styles.answerPendingContainer}>
    <Button icon='checkbox-marked-circle-outline' mode='contained'style={styles.showAnsweredButton} onPress={() => navigation.navigate("MyAnswered", {myAnsweredPosts: myAnsweredPosts})}>
      <Text style={styles.showAnsweredText}>
      มีการตอบแล้ว ({myAnsweredPosts.length})
      </Text>
    </Button>
    <Button icon='timer-sand' mode='contained' style={styles.showPendingButton} onPress={() => navigation.navigate("MyPending", {myPendingPosts: myPendingPosts})}>
      <Text style={styles.showPendingText}>
      กำลังรอคำตอบ ({myPendingPosts.length})
      </Text>
    </Button>
    </View>
    <Logout/>
    
  </ScrollView>
)
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    answerPendingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    showAnsweredButton: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 300,
      backgroundColor: 'lightpink',
      marginBottom: 20
    },
    showPendingButton: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 300,
      backgroundColor: 'lightgray'
    },
    avatarIntro: {
      color: 'black',
      alignSelf: 'center'
    },
    showEditAvatarButton: {
      alignSelf: 'center',
      borderRadius: 20,
      padding: 5,
      width: 300,
    },
    editAvatarContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    showEditAvatarText: {
      color: 'black'
    },
    showAnsweredText: {
      color: 'black',
    },
    showPendingText: {
      color: 'black',
    },
  });

export default MyQuestions;
