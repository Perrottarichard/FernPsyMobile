import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Card, Button, Badge, Text } from 'react-native';
// import { faQuestionCircle, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
    return {
      backgroundColor: color.backgroundColor,
      width: '90px',
      verticalAlign: 'middle',
      postition: 'relative'
    }
  } else {
    return {
      backgroundColor: 'magenta',
      width: '80px'
    }
  }
}
const cardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '14px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px'
}
const pendingCardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '14px',
  backgroundColor: 'gray',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px'
}
const TextStyleQ = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  backgroundColor: 'white' //super light green
}
const pendingTextStyleQ = {
  fontSize: '14px',
  color: 'gray',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  backgroundColor: 'white' //super light green
}
const TextStyleA = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
}

const smallStyle = {
  float: 'right',
  color: 'white'
}
const postButtonViewStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '20px'
}
const postButtonStyle = {
  width: '150px',
  fontFamily: 'Kanit',
}
const togglerButtonStyle = {
  fontFamily: 'Kanit',
  width: '100px',
  marginTop: '20px',
  float: 'center',
  marginRight: '10px',
  marginLeft: '10px',
  borderColor: 'gray',
  borderStyle: 'solid',
  color: 'gray',
  backgroundColor: 'white'
}
const answeredTogglerButtonStyle = {
  fontFamily: 'Kanit',
  width: '100px',
  marginTop: '20px',
  float: 'center',
  marginRight: '10px',
  marginLeft: '10px',
  backgroundColor: 'white',
  borderColor: '#1d8a17',
  borderStyle: 'solid',
  color: '#1d8a17'
}


const MyQuestions = () => {

  let { id } = useParams()
  const dispatch = useDispatch()
  const [toggleAnswered, setToggleAnswered] = useState(false)
  const [togglePending, setTogglePending] = useState(false)

  const user = useSelector(state => state.activeUser)
  const myAnsweredPosts = useSelector(state => state.forum.answered.filter(p => p.user === id))
  const myPendingPosts = useSelector(state => state.forum.pending.filter(p => p.user.id === id))

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

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
      <View style={{ display: 'block', textAlign: 'center' }}>
        <Text style={{ fontFamily: 'Kanit', marginTop: '80px' }}>ยินดีต้อนรับกลับสู่ {user.username}</Text>
        <Text style={{ fontFamily: 'Kanit', marginTop: '100px' }}>...คุณยังไม่ได้ถามคำถามใด ๆ</Text>
        <View style={postButtonViewStyle}>
          ตั้งกระทู้ถาม
          <Button color='primary' style={postButtonStyle} >ส่งคำถาม</Button>
        </View>
      </View>
    )
  }
  return (
    <View>
      <View style={{ display: 'block', textAlign: 'center' }}>
        <Text style={{ fontFamily: 'Kanit', marginTop: '80px' }}>ยินดีต้อนรับคุณ {user.username}</Text>
        <View style={{ display: 'block', textAlign: 'center' }}>
          <Button onPress={() => toggle('answered')} style={answeredTogglerButtonStyle}>ตอบแล้ว {`(${myAnsweredPosts.length})`}</Button>
          <Button onPress={() => toggle('pending')} style={togglerButtonStyle}>รอคำตอบ {`(${myPendingPosts.length})`}</Button>
        </View>
        {myAnsweredPosts && toggleAnswered ?
          myAnsweredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
            <View key={f._id}>
              <Button href={`/post/${f._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card >
                  <Card.Title style={cardHeaderStyle} tag="h5">{f.title}
                    {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} /> */}
                    <Text>{f.likes}</Text>
                    <Text className="text-muted" style={smallStyle}>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
                  </Card.Title>

                  <Text style={TextStyleQ}>
                    {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#e8ba4f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                    {f.question}

                  </Text>
                  <Text style={TextStyleA}>
                    {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#55d13f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                    {f.answer}

                  </Text>
                  <View style={{ display: 'block', textAlign: 'left' }}>
                    {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
                  </View>
                </Card>
              </Button>
            </View>)
          : null
        }
      </View>
      <View>
        {myPendingPosts && togglePending ? myPendingPosts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
          <View key={f._id}>
            <Card >
              <Card.Title style={pendingCardHeaderStyle} tag="h5">{f.title}
                {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: 'gray', marginLeft: '30px', marginRight: '10px' }} /> */}
                <Text>{f.likes}</Text>
                <Text className="text-muted" style={smallStyle}>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
              </Card.Title>

              <Text style={pendingTextStyleQ}>
                {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'gray', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                {f.question}
              </Text>

              <Text style={TextStyleA}>
                {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'gray', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                <Text className="text-muted">คำถามของคุณอยู่ระหว่างดำเนินการ</Text>

              </Text>
              <View style={{ display: 'block', textAlign: 'left' }}>
                {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
              </View>
            </Card>
          </View>) : null}
        <View style={postButtonViewStyle}>
          ต้องการถาม คลิก<br />
          <Button color='primary' style={postButtonStyle} >ส่งคำถาม</Button>
        </View>
      </View>
    </View >
  )
}
export default MyQuestions