import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { faQuestionCircle, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NoPostsYet from './NoPostsYet';
import { initializeForumAnswered } from '../reducers/forumReducer'
import { Button, Text, View } from 'react-native';
import { Badge, Card } from 'react-native-elements';

const tagColorOptions = [
  { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d' },
  { tag: 'การออกเดท', backgroundColor: '#288046' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8' },
  { tag: 'การรังแก', backgroundColor: '#5e320f' },
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
const cardBodyStyleQ = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  textAlign: 'left',
  paddingLeft: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white' //super light green
}
const cardBodyStyleA = {
  fontSize: '14px',
  fontFamily: 'Kanit',
  padding: '10px',
  borderBottom: '1px solid gray',
  backgroundColor: 'white' //super light pink
}

const TextStyle = {
  float: 'right',
  color: 'white'
}
const postButtonViewStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '30px'
}
const postButtonStyle = {
  width: '150px',
  fontFamily: 'Kanit',
}


const SingleTagDisplay = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  let tagged = useSelector(state => state.forum.answered.map(post => post.tags.includes(state.forum.tagFilter) ? post : null)).filter(t => t !== null)
  const activeUser = useSelector(state => state.activeUser)


  useEffect(() => {
    dispatch(initializeForumAnswered())
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [dispatch])

  if (isLoading) {
    return (
      <Text>Loading</Text>
    )
  }
  else if (tagged.length === 0) {
    return (
      <NoPostsYet />
    )
  } else
    return (
      <View>
        {tagged.sort((a, b) => new Date(b.date) - new Date(a.date)).map(f =>
          <View key={f._id}>
            <Button href={`/post/${f._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card >
                <Card.Title style={cardHeaderStyle} tag="h5">{f.title}
                  {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} /> */}
                  <Text>{f.likes}</Text>
                  <Text className="text-muted" style={TextStyle}>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
                </Card.Title>
                <Text style={cardBodyStyleQ}>

                  {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#e8ba4f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                  {f.question}
                </Text>
                <Text style={cardBodyStyleA}>
                  {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#55d13f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                  {f.answer.answer}

                </Text>

                <View style={{ display: 'block' }}>
                  {f.tags.map(t => <Badge key={t} style={chooseTagColor(t)} >{t}</Badge>)}
                </View>
              </Card>
            </Button>
          </View>)}
        <View style={postButtonViewStyle}>
          ตั้งกระทู้ถาม<br />
          <Button color='primary' style={postButtonStyle}>ส่งคำถาม</Button>
        </View>
      </View>
    )
}
export default SingleTagDisplay