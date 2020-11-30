import React from 'react'
import { Button, View, Text} from 'react-native'
import {Card, ListItem} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch } from 'react-redux'
// import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faGlobe, faUsers, faCode, faHeart } from '@fortawesome/free-solid-svg-icons'
import { setTagFilter } from '../reducers/forumReducer'

const tagOptions = [
  { tag: 'ทั้งหมด', backgroundColor: '#8e2bff', icon: 'globe' },
  { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'venus-mars' },
  { tag: 'การออกเดท', backgroundColor: '#288046', icon: 'glass-cheers' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'users' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'sad-tear' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'flushed' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'theater-masks' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'business-time' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'angry' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'question-circle' },
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: 'syringe' },

]
const chooseTagColor = (passed) => {
  let color = tagOptions.find(t => t.tag === passed)
    return color.backgroundColor
}
const chooseTagIcon = (passed) => {
  let chosen = tagOptions.find(t => t.tag === passed)
    return chosen.icon
}

const ForumLandingPage = ({navigation}) => {
  const dispatch = useDispatch()

  const clickTag = (t) => {
    dispatch(setTagFilter(t.tag))
    if (t.tag === 'ทั้งหมด') {
      navigation.navigate(`AllQuestions`)
    } else {
     navigation.navigate(`Forum${t.tag}`)
    }
  }
  return (
    <View>
      <ScrollView>
        {tagOptions.map(t =>
          <View key={t.tag} style={{alignItems: 'center'}}>
            <Card>
                  <Icon.Button 
                  onPress={() => clickTag(t)}
                  name={chooseTagIcon(t.tag)}
                  size={40}
                  color={chooseTagColor(t.tag)}
                  style={{backgroundColor: 'white', width: 240}}>
                  <Text style={{fontSize: 30, color: chooseTagColor(t.tag)}}>{t.tag}</Text>
                  </Icon.Button>
            </Card>
          </View>
        )}
      </ScrollView>
      <View>
        <Text><Icon name='code' type='fontawesome'/></Text>
        {/* <Text ><a style={{ color: '#343a40' }} href="https://www.mangolatte.dev"> with <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> by Richard</a></Text> */}
      </View>
    </View>
  )
}
export default ForumLandingPage