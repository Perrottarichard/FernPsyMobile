/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { Button, Text, ToastAndroid, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Icon } from 'react-native-vector-icons/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../reducers/forumReducer'
import {Picker} from '@react-native-picker/picker';
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const buttonStyle = {
  marginTop: '20px',
  width: '150px',
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  backgroundColor: '#288046',
  fontFamily: 'Kanit',
}

const ForumPostMain = (props) => {
  const { activeUser, navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  let chosenFilter = useSelector(state => state.forum.tagFilter)
  if (chosenFilter === 'รวมทุกหัวข้อ' || chosenFilter === '') {
    chosenFilter = undefined
  }
  const [selectedTags, setSelectedTags] = useState([])
  const tagOptions = [
    { value: chosenFilter, label: chosenFilter },
    { value: 'ปัญหาเรื่องเพศ', label: 'ปัญหาเรื่องเพศ' },  //sex
    { value: 'การออกเดท', label: 'การออกเดท' }, //dating
    { value: 'การเสพติด', label: 'การเสพติด' }, //addiction
    { value: 'เพื่อน', label: 'เพื่อน' }, //friendship
    { value: 'lgbt', label: 'LGBT' },
    { value: 'โรคซึมเศร้า', label: 'โรคซึมเศร้า' }, //depression
    { value: 'ความวิตกกังวล', label: 'ความวิตกกังวล' }, //anxiety
    { value: 'ไบโพลาร์', label: 'ไบโพลาร์' }, //bipolar
    { value: 'relationships', label: 'Relationships' },
    { value: 'การทำงาน', label: 'การทำงาน' }, //career
    { value: 'สุขภาพจิต', label: 'สุขภาพจิต' }, //mental health
    { value: 'bullying', label: 'Bullying' },
    { value: 'ครอบครัว', label: 'ครอบครัว' }, //family
    { value: 'อื่นๆ', label: 'อื่นๆ' } //other
  ]

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleContentChange = (event) => {
    setQuestion(event.target.value)
  }
  const handleTagChange = (selected) => {
    setSelectedTags(selected)
  }

  const handleEditorSubmit = async (event) => {
    event.preventDefault()
    if (!title || !question) {
      ToastAndroid.show('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ' )
      //'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    }
    else if ((selectedTags.length === 0 && !chosenFilter) || selectedTags.length > 3) {
      ToastAndroid.show('You should have 1-3 tags')
      //กรุณาเลือกแท็กสองหัวข้อค่ะ
      //'Please select 2 tags'
    }
    else if (!activeUser) {
      ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
      //กรุณาล็อคอินก่อนโพสคำถามค่ะ
      //'You must be logged in to post to the forum'
      history.push('/login')
    }
    else if (activeUser.username === 'Fern-Admin' || activeUser.username === 'Richard-Admin') {
      ToastAndroid.show('Why are you trying to ask yourself a question?')

    } else {
      const postToAdd = {
        title: title,
        question: question,
        answer: '',
        isAnswered: false,
        tags: chosenFilter === undefined ? selectedTags.map(t => t.value) : chosenFilter.concat(selectedTags.map(t => t)),
        likes: 0
      }
      try {
        setIsLoading(true)
        dispatch(addQuestion(postToAdd))
        setTitle('')
        setQuestion('')
        setSelectedTags([])
        navigation.navigate('Home')
      } catch (error) {
        ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ')
        //กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error)

      }

    }
  }
  return (
    <View>
      <View style={{ display: 'block', textAlign: 'center', fontSize: '100px', color: '#343a40', marginBottom: '0px' }}>
        <Icon name='questioncircle' type='fontawesome'/>
      </View>
      <View id='forum-title-View'>
        <Input
          placeholder='พิมพ์หัวข้อที่นี่'
          onChange={handleTitleChange}
          value={title}
          style={{ marginBottom: '20px', fontFamily: 'Kanit' }}
        />
      </View>

      <View id='forum-question-View'>
        <Input
          placeholder='พิมพ์รายละเอียดคำถามของคุณ'
          onChange={handleContentChange}
          value={question}
          style={{ fontFamily: 'Kanit' }}
        />
        <Picker
          onValueChange={(itemValue, itemIndex) => handleTagChange(itemValue, itemIndex)}
          style={{ fontFamily: 'Kanit' }}>
          // defaultValue={chosenFilter !== undefined ? tagOptions[0] : null}
          {tagOptions.map(t => <Picker.Item label={t.label} value={t.value}></Picker.Item>)}
        </Picker>
        <View style={{ display: 'block', textAlign: 'center' }}>
          <Text style={{ fontFamily: 'Kanit' }}>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ</Text>
          <Button style={buttonStyle} onPress={handleEditorSubmit}>ส่งคำถาม</Button>
        </View>
      </View>
    </View >
  )
}
export default ForumPostMain