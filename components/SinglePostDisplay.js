import React, { useState, useEffect } from 'react'
import { Button, Text, ToastAndroid, View } from 'react-native'
import { Badge } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
// import { faQuestionCircle, faHeart, faFlag, faCheckCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { addComment, heart } from '../reducers/forumReducer'
import { initializeForumAnswered, setFlaggedComment } from '../reducers/forumReducer'

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
const commentViewStyle = {
  display: 'block'
}
const cardHeaderStyle = {
  fontFamily: 'Kanit',
  fontSize: '16px',
  backgroundColor: '#343a40',
  color: 'white',
  marginTop: '10px',
  paddingTop: '6px',
  paddingBottom: '6px',
  textAlign: 'center'
}
const TextStyleQ = {
  fontSize: '16px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white'
}
const TextStyleA = {
  fontSize: '16px',
  fontFamily: 'Kanit',
  padding: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white' //super light pink
}
const TextStyleC = {
  fontSize: '12px',
  fontFamily: 'Kanit',
  padding: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white' //super light blue
}
const smallStyle = {
  fontSize: '10px',
  float: 'left',
  color: 'white',
  marginLeft: '0'
}

const commentButtonStyle = {
  fontFamily: 'Kanit',
  marginTop: '5px',
  marginBottom: '5px'
}
const SinglePostDisplay = (props) => {
  const { activeUser, navigation } = props
  let { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const post = useSelector(state => state.forum.answered.find(p => p._id === id))
  const [sentHeart, setSentHeart] = useState(null)
  const [pulseHeart, setPulseHeart] = useState('')


  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const submitComment = async (event) => {
    event.preventDefault()
    let postToModifyId = post
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น')
      navigation.navigate('Login')
    } else if (comment === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น')
    } else {
      try {
        setIsLoading(true)
        dispatch(addComment(comment, postToModifyId))
        setComment('')
      } catch (error) {
        console.log('thisistheerrror', error)
        ToastAndroid.show('กรุณาลองใหม่')
      }
    }
  }
  const submitHeart = async () => {
    let postToModify = post
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ')
      navigation.navigate('Login')
    } else if (sentHeart !== null) {
      ToastAndroid.show('คุณได้ส่งหัวใจสำหรับโพสต์นี้แล้ว')
    } else {
      try {
        setPulseHeart('heart-icon')
        setTimeout(() => {
          setSentHeart(post._id)
          dispatch(heart(postToModify))
          setPulseHeart('')
        }, 2000);
      } catch (error) {
        console.log(error)
        ToastAndroid.show('กรุณาลองใหม่')
      }
    }
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  const flag = (comment) => {
    if (comment.isFlagged) {
      return ToastAndroid.show('ความคิดเห็นนี้มีผู้รายงานให้แอดมินทราบปัญหาเรียบร้อยแล้ว')
    }
    // if (window.confirm('คุณแน่ใจหรือไม่ว่าคุณต้องการรายงานความคิดเห็นนี้ให้แอดมินทราบ'))
    else{
      dispatch(setFlaggedComment(comment))
    }
  }

  return (
    <View>
      <View style={{ display: 'block', textAlign: 'center', fontFamily: 'Kanit' }}>
        <Card>
          <Text key={Math.random()}>
            <FontAwesomeIcon className={pulseHeart} icon={faHeart} style={{ fontSize: '50px', color: 'pink' }} />
          </Text>
          <Button style={{ color: '#343a40', backgroundColor: 'white', borderStyle: 'none', borderColor: 'none' }} onClick={() => submitHeart()}>ส่งหัวใจเพื่อให้กำลังใจเจ้าของกระทู้ คลิก</Button>
        </Card>
      </View>
      <View key={post._id} style={commentViewStyle}>
        <Card >
          <Card.Title style={cardHeaderStyle}>{post.title}
            <Text style={{ float: 'right' }}><FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: 'pink', marginLeft: '30px', marginRight: '5px' }} />{post.likes}</Text>
            <Text className="text-muted" style={smallStyle}>{post.date.slice(0, 10)}</Text>
          </Card.Title>
          <Text style={TextStyleQ}>
            {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#e8ba4f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
            {post.question}
          </Text>
          <Text style={TextStyleA}>
            {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#55d13f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
            {post.answer.answer}
          </Text>
          {(post.comments.length > 0) ? post.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(c =>
            <Text key={(c._id) ? c._id : Math.random()} style={TextStyleC}>
              <Text style={{ fontWeight: '200' }}>
                {c.user ? <em>{c.user.username}{' '}</em> : 'You'}: {" "}
                {/* <FontAwesomeIcon icon={faCommentDots} style={{ color: '#b9babd', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                {c.content}
              </Text>
              <Text className='text-muted' style={{ float: 'right' }}>{(c.date) ? c.date.slice(0, 10) : 'just now'} <FontAwesomeIcon icon={faFlag} onClick={() => flag(c)} /></Text>

            </Text>) : null}
          <View style={{ display: 'block' }}>
            {post.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
          </View>
        </Card>
      </View>
      <View style={{ display: 'block', textAlign: 'center' }}>
        <TextInput>
          <Input type='textarea' onChange={handleCommentChange} value={comment} placeholder='แสดงความคิดเห็น'/>
          <Button isLoading={isLoading} onPress={submitComment} color='primary' style={commentButtonStyle} >ส่งความคิดเห็น</Button>
        </TextInput>
      </View>
    </View>
  )
}
export default SinglePostDisplay