import React, { useEffect, useState } from 'react'
import { Button, Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { Badge, Card } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
// import { faQuestionCircle, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { initializeForumAnswered } from '../reducers/forumReducer'

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

const ForumDisplayAll = (props) => {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const forumAnswered = useSelector(state => state.forum.answered)
  const activeUser = useSelector(state => state.activeUser)

  useEffect(() => {
    dispatch(initializeForumAnswered())
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [dispatch])

  if(!forumAnswered){
    setIsLoading(true)
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
      <ActivityIndicator size='large' color='blue'/>
      </View>
    )
  }
  return (
    <ScrollView>
      {forumAnswered && forumAnswered.map(f =>
        <View key={f._id}>
            <Card style={styles.cardStyle} >
              <Card.Title>{f.title}
                {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} /> */}
                {"\n"}
                <Text >ถามเมื่อ {f.date.slice(0, 10)}</Text>
                {"\n"}
              </Card.Title>
              <Text>
                {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#e8ba4f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                {f.question}
              </Text>
              <Text>
                {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#55d13f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                {f.answer.answer}
              </Text>
              <View style={styles.bottomTags}>
                {f.tags.map(t => <Badge key={t} badgeStyle={{backgroundColor: chooseTagColor(t)}} value={t}/>)}
                <Badge value={`${f.likes} likes`} badgeStyle={{backgroundColor: 'deeppink'}}/>
              </View>
            </Card>
        </View>)}
      <View>
        <Text>ตั้งกระทู้ถาม</Text>
        {/* <Link to={activeUser === null ? '/login' : '/addpost'} onClick={() => activeUser === null ? toast.warn('คุณต้องเข้าสู่ระบบเพื่อโพสต์คำถาม') : null}> */}
          <Button title='ส่งคำถาม'></Button>
      </View>
    </ScrollView>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomTags: {
    flexDirection: 'row'
  }
  })
export default ForumDisplayAll