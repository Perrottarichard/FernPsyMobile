import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, TouchableHighlight, ScrollView, RefreshControl, StyleSheet,
} from 'react-native';
import { initializeForumPending, initializeForumAnswered } from '../reducers/forumReducer';
import Logout from './Logout'

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const MyQuestions = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector((state) => state.activeUser);
  const id = user._id;
  const answered = useSelector((state) => state.forum.answered);
  const pending = useSelector((state) => state.forum.pending);
  const myAnsweredPosts = answered.filter((p) => p.user === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const myPendingPosts = pending.filter((p) => p.user.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    dispatch(initializeForumAnswered());
  }, []);

  useEffect(() => {
    dispatch(initializeForumPending());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(initializeForumAnswered());
    dispatch(initializeForumPending());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (myAnsweredPosts.length === 0 && myPendingPosts.length === 0) {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text>
          ยินดีต้อนรับกลับสู่
          {user.email}
        </Text>
        <Text>...คุณยังไม่ได้ถามคำถามใด ๆ</Text>
        <View>
          <Text>
            ตั้งกระทู้ถาม
          </Text>
          <TouchableHighlight>
            <Text>
              ส่งคำถาม
            </Text>
          </TouchableHighlight>
        </View>
        <Logout/>
      </ScrollView>
    );
  }
  return(
  <View style={styles.but}>
    <TouchableHighlight style={styles.showAnsweredButton} onPress={() => navigation.navigate("MyAnswered", {myAnsweredPosts: myAnsweredPosts})}>
      <Text style={styles.showAnsweredText}>
        Answered
      </Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.showPendingButton} onPress={() => navigation.navigate("MyPending", {myPendingPosts: myPendingPosts})}>
      <Text style={styles.showPendingText}>
        Pending
      </Text>
    </TouchableHighlight>
    <Logout/>
  </View>
)
};

  const styles = StyleSheet.create({
    showAnsweredButton: {
      alignSelf: 'center',
      backgroundColor: 'pink',
      borderRadius: 20,
      padding: 5,
      width: 200,
    },
    showPendingButton: {
      alignSelf: 'center',
      backgroundColor: 'purple',
      borderRadius: 20,
      padding: 5,
      width: 200,
    },
    showAnsweredText: {
      color: 'white',
    },
    showPendingText: {
      color: 'white',
    },
  });

export default MyQuestions;
