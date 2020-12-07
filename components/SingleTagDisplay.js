import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { faQuestionCircle, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NoPostsYet from './NoPostsYet';
import { initializeForumAnswered } from '../reducers/forumReducer'
import { Button, Text, View, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { Badge, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

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

const SingleTagDisplay = ({route, navigation}) => {
  const {tag} = route.params
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
      <View style={styles.container}>
      <ActivityIndicator size='large' color='blue'/>
      </View>
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
          <Pressable key={f._id} onPress={() => {
            navigation.navigate('SinglePostDisplay', {
              postId: f._id,
              postTitle: f.title
            })
          }}>
              <Card style={styles.cardStyle}>
                <Card.Title style={{textAlign: 'center'}}>{f.title}
                {"\n"}
                  {/* <FontAwesomeIcon icon={faHeart} style={{ fontSize: '10px', color: '#ff99ff', marginLeft: '30px', marginRight: '10px' }} /> */}
                  <Text>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
                  {"\n"}
                </Card.Title>
                <Icon
                name='ios-heart-sharp' 
                color='deeppink' 
                size={26} 
                style={{position: 'absolute', left: 0}}>
                </Icon>
                <Text style={{position: 'absolute', left: 10, fontSize: 10, paddingTop: 6, color: 'white', fontWeight: 'bold'}}>{f.likes}</Text>
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
                </View>
              </Card>
          </Pressable>)}
        <View>
          <Text>ตั้งกระทู้ถาม</Text>
          <Button title='ส่งคำถาม'></Button>
        </View>
      </View>
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
    flexDirection: 'row-reverse'
  }
})

export default SingleTagDisplay