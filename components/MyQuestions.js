import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Card, Pressable,Text, TouchableHighlight} from 'react-native';
import {Badge} from 'react-native-elements'
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
    return color.backgroundColor
}

const MyQuestions = () => {
  
  const dispatch = useDispatch()
  const [toggleAnswered, setToggleAnswered] = useState(false)
  const [togglePending, setTogglePending] = useState(false)

  const user = useSelector(state => state.activeUser)
  const id = user._id
  const myAnsweredPosts = useSelector(state => state.forum.answered.filter(p => p.user === id))
  const myPendingPosts = useSelector(state => state.forum.pending.filter(p => p.user.id === id))

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [])

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [])

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
      <View>
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
      </View>
    )
  }
  return (
    <View>
      <View>
        <Text>ยินดีต้อนรับคุณ {user.email}</Text>
        <View>
          <TouchableHighlight onPress={() => toggle('answered')}>
            <Text>
            ตอบแล้ว {`(${myAnsweredPosts.length})`}
            </Text>
            </TouchableHighlight>
          <TouchableHighlight onPress={() => toggle('pending')}>
            <Text>
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
                    {f.answer}
                  </Text>
                  <View>
                    {f.tags.map(t => <Badge key={t} style={{backgroundColor: chooseTagColor(t)}} >{t}</Badge>)}
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
                {f.tags.map(t => <Badge key={t} style={{backgroundColor: chooseTagColor(t)}} >{t}</Badge>)}
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
    </View >
  )
}
export default MyQuestions