/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { Button, Text, ToastAndroid, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../reducers/forumReducer'
import MultiSelect from 'react-native-multiple-select';
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const ForumPostMain = (props) => {
  const { activeUser, navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
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

  const handleTagChange = (selected) => {
    setSelectedTags(selected)
  }

  const handleEditorSubmit = async () => {

    if (!title || !question) {
      ToastAndroid.show('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ', ToastAndroid.SHORT )
      //'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    }
    else if ((selectedTags.length === 0 && !chosenFilter) || selectedTags.length > 3) {
      ToastAndroid.show('You should have 1-3 tags', ToastAndroid.SHORT)
      //กรุณาเลือกแท็กสองหัวข้อค่ะ
      //'Please select 2 tags'
    }
    else if (!activeUser) {
      ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ', ToastAndroid.SHORT)
      //กรุณาล็อคอินก่อนโพสคำถามค่ะ
      //'You must be logged in to post to the forum'
      navigation.navigate('Login')
    }
    else if (activeUser.username === 'Fern-Admin' || activeUser.username === 'Richard-Admin') {
      ToastAndroid.show('Why are you trying to ask yourself a question?', ToastAndroid.SHORT)

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
        ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ', ToastAndroid.SHORT)
        //กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error)

      }

    }
  }
  return (
    <View>
      <View>
        <Icon name='question'/>
      </View>
      <View>
        <TextInput
          placeholder='พิมพ์หัวข้อที่นี่'
          onChange={t => setTitle(t)}
          value={title}
        />
      </View>

      <View>
        <TextInput
          placeholder='พิมพ์รายละเอียดคำถามของคุณ'
          onChange={q => setQuestion(q)}
          value={question}
        />
        <MultiSelect
          onSelectedItemsChange={(value) => handleTagChange(value)}
          selectedItems={selectedTags}
          uniqueKey='name'
          items={[
            { name: 'ปัญหาเรื่องเพศ', value: 'ปัญหาเรื่องเพศ', key: 'a' },  //sex
            { name: 'การออกเดท', value: 'การออกเดท', key: 'b' }, //dating
            { name: 'การเสพติด', value: 'การเสพติด', key: 'c' }, //addiction
            { name: 'เพื่อน', value: 'เพื่อน', key: 'd' }, //friendship
            { name: 'lgbt', value: 'LGBT', key: 'e' },
            { name: 'โรคซึมเศร้า', value: 'โรคซึมเศร้า', key: 'f' }, //depression
            { name: 'ความวิตกกังวล', value: 'ความวิตกกังวล', key: 'g' }, //anxiety
            { name: 'ไบโพลาร์', value: 'ไบโพลาร์', key: 'h' }, //bipolar
            { name: 'relationships', value: 'Relationships', key: 'i' },
            { name: 'การทำงาน', value: 'การทำงาน', key: 'j' }, //career
            { name: 'สุขภาพจิต', value: 'สุขภาพจิต', key: 'k' }, //mental health
            { name: 'bullying', value: 'Bullying', key: 'l' },
            { name: 'ครอบครัว', value: 'ครอบครัว', key: 'm' }, //family
            { name: 'อื่นๆ', value: 'อื่นๆ', key: 'n' } //other
            ]}
          >
        </MultiSelect>
        <View>
          <Text>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ</Text>
          <Button onPress={handleEditorSubmit} title={'ส่งคำถาม'}></Button>
        </View>
      </View>
    </View >
  )
}
export default ForumPostMain