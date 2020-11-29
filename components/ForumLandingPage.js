import React from 'react'
import { Button, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
// import { faQuestionCircle, faBusinessTime, faBrain, faHome, faSyringe, faHeartBroken, faVenusMars, faTransgender, faAngry, faFlushed, faGlassCheers, faTheaterMasks, faSadTear, faGlobe, faUsers, faCode, faHeart } from '@fortawesome/free-solid-svg-icons'
import { setTagFilter } from '../reducers/forumReducer'

const tagOptions = [
  { tag: 'ทั้งหมด', backgroundColor: '#8e2bff', icon: 'globe' },
  { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'venusmars' },
  { tag: 'การออกเดท', backgroundColor: '#288046', icon: 'glasscheers' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heartbroken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'users' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'sadtear' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'flushed' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'theatermasks' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'businesstime' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'angry' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'questioncircle' },
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: 'syringe' },

]
const chooseTagColor = (passed) => {
  let color = tagOptions.find(t => t.tag === passed)
  if (color) {
    return {
      backgroundColor: color.backgroundColor,
      width: '80px',
      height: '60px',
      verticalAlign: 'middle',
      postition: 'relative',
      color: 'white',
      fontSize: '40px',
      padding: '10px',
      borderStyle: 'double',
      borderWidth: '4px'
    }
  } else {
    return {
      backgroundColor: 'magenta',
      width: '100px'
    }
  }
}
const chooseTagIcon = (passed) => {
  let chosen = tagOptions.find(t => t.tag === passed)
  if (chosen) {
    return chosen.icon
  } else {
    return null
  }
}
const textStyle = {
  color: 'black',
  fontFamily: 'Kanit',
  fontSize: '16px',
  textAlign: 'center'
}
const ViewStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '40px'
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
      <View style={ViewStyle}>
        {tagOptions.map(t =>
          <View key={t.tag} style={{ flexDirection: 'row' }} >
            <Card body>
              <Card.Title style={textStyle}>{t.tag}
                <Text>
                  <Button onPress={() => clickTag(t)}>
                    <Icon
                      style={chooseTagColor(t.tag)}
                      name={chooseTagIcon(t.tag)}
                      type='fontawesome'
                    >{t.tag}
                    </Icon>
                  </Button>
                </Text>
              </Card.Title>
            </Card>
          </View>
        )}
      </View >
      <View style={{ display: 'block', textAlign: 'center', fontFamily: 'Kanit' }}>
        <Text><Icon name='code' type='fontawesome'/></Text>
        {/* <Text ><a style={{ color: '#343a40' }} href="https://www.mangolatte.dev"> with <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> by Richard</a></Text> */}
      </View>
    </View>
  )
}
export default ForumLandingPage