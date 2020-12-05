/* eslint-disable no-multi-str */
import React, { useState } from 'react'
import { Keyboard, Text, ToastAndroid, View, Pressable, StyleSheet, TextInput, ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../reducers/forumReducer'
import MultiSelect from 'react-native-multiple-select';
import PostGraphic from '../undraw_add_post_64nu.svg'

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
    console.log(question)

    if (!title || !question) {
      ToastAndroid.show('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ', ToastAndroid.SHORT )
      //'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    }
    else if ((selectedTags.length === 0 && !chosenFilter) || selectedTags.length > 3) {
      ToastAndroid.show('กรุณาเลือก 1-3 tags ค่ะ', ToastAndroid.SHORT)
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
    <ScrollView>
      <View style={styles.graphicContainer}>
        <PostGraphic width={200} height={160}/>
      </View>
      <View style={styles.textAreaContainerTitle}>
        <TextInput
        style={styles.textAreaTitle}
        multiline={false}
        numberOfLines={1}
        placeholder='พิมพ์หัวข้อที่นี่'
        onChangeText={t => setTitle(t)}
        keyboardType="default"
        returnKeyType="done"
        onSubmitEditing={()=>{Keyboard.dismiss()}}
        />
      </View>

      <View style={styles.textAreaContainerQuestion}>
        <TextInput
        style={styles.textAreaQuestion}
        multiline
        textAlignVertical={'top'}
        numberOfLines={4}
        placeholder='พิมพ์รายละเอียดคำถามของคุณ'
        onChangeText={q => setQuestion(q)}
        keyboardType="default"
        returnKeyType="done"
        onSubmitEditing={()=>{Keyboard.dismiss()}}
        blurOnSubmit={true}
        />
        </View>
        <View>
        <MultiSelect
          hideDropdown={true}
          styleTextDropdown={{paddingLeft: 10, color: 'gray'}}
          styleListContainer={{height: 120}}
          styleMainWrapper={styles.picker}
          submitButtonText='Submit Tags'
          tagContainerStyle={{height: 30}}
          tagTextColor='black'
          tagRemoveIconColor='gray'
          tagBorderColor='#d896ac'
          onSelectedItemsChange={(value) => handleTagChange(value)}
          selectedItems={selectedTags}
          uniqueKey='name'
          selectText='เลือก tags'
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
        <View style={styles.afterForm}>
          <Text style={styles.afterFormText}>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ</Text>
          <Pressable onPress={handleEditorSubmit} style={styles.submitPostButton}>
            <Text style={styles.submitPostText}>
            ส่งคำถาม
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  graphicContainer: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAreaContainerTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5
  },
  textAreaContainerQuestion: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5
  },
  textAreaTitle: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: "flex-start"
  },
  textAreaQuestion: {
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: "flex-start"
  },
  picker: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  submitPostButton: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
    alignSelf: 'center'
  },
  submitPostText: {
    color: '#d896ac',
    alignSelf: 'center'
  },
  afterForm: {
    marginTop: 50
  },
  afterFormText: {
    alignSelf: 'center',
    fontSize: 10
  }
})
export default ForumPostMain