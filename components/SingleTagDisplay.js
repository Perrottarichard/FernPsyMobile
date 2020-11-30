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
    return color.backgroundColor
}

const SingleTagDisplay = ({route, navigation}) => {
  const {tag} = route.params
  console.log(tag)
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
              <Card>
                <Card.Title>{f.title}
                  {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} /> */}
                  <Text>{f.likes}</Text>
                  <Text>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
                </Card.Title>
                <Text>

                  {/* <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#e8ba4f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                  {f.question}
                </Text>
                <Text>
                  {/* <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#55d13f', fontSize: '20px', float: 'left', position: 'relative', marginRight: '20px' }} /> */}
                  {f.answer.answer}

                </Text>

                <View>
                  {f.tags.map(t => <Badge key={t} style={{backgroundColor: chooseTagColor(t)}}>{t}</Badge>)}
                </View>
              </Card>
          </View>)}
        <View>
          <Text>ตั้งกระทู้ถาม</Text>
          <Button title='ส่งคำถาม'></Button>
        </View>
      </View>
    )
}
export default SingleTagDisplay