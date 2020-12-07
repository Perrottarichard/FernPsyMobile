import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Pressable,Text, TouchableHighlight, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {Badge, Card} from 'react-native-elements'
import { initializeForumPending, initializeForumAnswered } from '../reducers/forumReducer'



const tagColorOptions = [

  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d' },
  { tag: 'การออกเดท', backgroundColor: '#288046' },
  { tag: 'relationships', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8' },
  { tag: 'bullying', backgroundColor: '#5e320f' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d' },
  { tag: 'อื่นๆ', backgroundColor: '#707571' },
  { tag: 'การเสพติด', backgroundColor: '#40073d' },

]
const chooseTagColor = (passed) => {
  let color = tagColorOptions.find(t => t.tag === passed)
  if (color) {
    return color.backgroundColor
  } else {
    return 'magenta'
    }
}
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const MyQuestions = () => {
  
  const dispatch = useDispatch()
  const [toggleAnswered, setToggleAnswered] = useState(false)
  const [togglePending, setTogglePending] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const user = useSelector(state => state.activeUser)
  const id = user._id
  const answered = useSelector(state => state.forum.answered)
  const pending = useSelector(state => state.forum.pending)
  const myAnsweredPosts = answered.filter(p => p.user === id)
  const myPendingPosts = pending.filter(p => p.user.id === id)

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [])

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(initializeForumAnswered())
    dispatch(initializeForumPending())
    wait(2000).then(() => setRefreshing(false));
  }, []);



  const toggle = (type) => {
    switch (type) {
      case 'pending':
        return setTogglePending(!togglePending)
      case 'answered':
        return setToggleAnswered(!toggleAnswered)
      default: return null
    }
  }
  if (myAnsweredPosts.length === 0 && myPendingPosts.length === 0) {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <Text>ยินดีต้อนรับกลับสู่ {user.email}</Text>
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
      </ScrollView>
    )
  }
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <View >
        <Text>ยินดีต้อนรับคุณ {user.email}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => toggle('answered')} style={styles.showAnsweredButton}>
            <Text style={styles.showAnsweredText}>
            ตอบแล้ว {`(${myAnsweredPosts.length})`}
            </Text>
            </TouchableHighlight>
          <TouchableHighlight onPress={() => toggle('pending')} style={styles.showPendingButton}>
            <Text style={styles.showPendingText}>
            รอคำตอบ {`(${myPendingPosts.length})`}
            </Text>
            </TouchableHighlight>
        </View>
        {myAnsweredPosts && toggleAnswered ?
          myAnsweredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
            <View key={f._id}>
              <Pressable onPress={() => {
            navigation.navigate('SinglePostDisplay', {
              postId: f._id,
              postTitle: f.title
            })
          }}>
                <Card >
                  <Card.Title>{f.title}
                    <Text>{f.likes}</Text>
                    <Text>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
                  </Card.Title>

                  <Text>
                    {f.question}
                  </Text>
                  <Text>
                    {f.answer.answer}
                  </Text>
                  <View>
                    {f.tags.map(t => <Badge key={t} badgeStyle={{backgroundColor: chooseTagColor(t)}} value={t}></Badge>)}
                  </View>
                </Card>
              </Pressable>
            </View>)
          : null
        }
      </View>
      <View>
        {myPendingPosts && togglePending ? myPendingPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
          <View key={f._id}>
            <Card >
              <Card.Title>{f.title}
                <Text>{f.likes}</Text>
                <Text>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
              </Card.Title>

              <Text>
                {f.question}
              </Text>

              <Text>
                คำถามของคุณอยู่ระหว่างดำเนินการ
              </Text>
              <View>
                {f.tags.map(t => <Badge key={t} badgeStyle={{backgroundColor: chooseTagColor(t)}} value={t}></Badge>)}
              </View>
            </Card>
          </View>) : null}
        <View>
          <Text>
          ต้องการถาม คลิก
          </Text>
          <TouchableHighlight>
            <Text>
            ส่งคำถาม
            </Text>
            </TouchableHighlight>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  showAnsweredButton: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    borderRadius: 20,
    padding: 5,
    width: 200
  },
  showPendingButton: {
    alignSelf: 'center',
    backgroundColor: 'purple',
    borderRadius: 20,
    padding: 5,
    width: 200
  },
  showAnsweredText: {
    color: 'white'
  },
  showPendingText: {
    color: 'white'
  }
})
export default MyQuestions