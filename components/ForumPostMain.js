/* eslint-disable no-multi-str */
import React, { useState, useEffect } from 'react';
import {
  Keyboard, Text, ToastAndroid, View, StyleSheet, TextInput, ScrollView, LogBox, TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
import { addQuestion } from '../reducers/forumReducer';
import PostGraphic from '../undraw_add_post_64nu.svg';

const ForumPostMain = (props) => {
  const { navigation } = props;
  const activeUser = useSelector((state) => state.activeUser);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  let chosenFilter = useSelector((state) => state.forum.tagFilter);
  if (chosenFilter === 'รวมทุกหัวข้อ' || chosenFilter === '') {
    chosenFilter = undefined;
  }
  const handleTagChange = (selected) => {
    setSelectedTags(selected);
  };

  console.log(selectedTags);
  const handleEditorSubmit = async () => {
    console.log(question);

    if (!title || !question) {
      ToastAndroid.show('กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ', ToastAndroid.SHORT);
      // 'Please make sure you have a title, a question, and two tags'
      // กรุณาใส่หัวข้อคำถาม คำถามของคุณ และโปรดเลือกแท็กสองหัวข้อ
    } else if ((selectedTags.length === 0 && !chosenFilter) || selectedTags.length > 3) {
      ToastAndroid.show('กรุณาเลือก 1-3 tags ค่ะ', ToastAndroid.SHORT);
      // กรุณาเลือกแท็กสองหัวข้อค่ะ
      // 'Please select 2 tags'
    } else if (!activeUser) {
      ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ', ToastAndroid.SHORT);
      // กรุณาล็อคอินก่อนโพสคำถามค่ะ
      // 'You must be logged in to post to the forum'
      navigation.navigate('LoginForm');
    } else if (activeUser.username === 'Fern-Admin' || activeUser.username === 'Richard-Admin') {
      ToastAndroid.show('Why are you trying to ask yourself a question?', ToastAndroid.SHORT);
    } else {
      const postToAdd = {
        title,
        question,
        answer: '',
        isAnswered: false,
        tags: selectedTags,
        likes: 0,
      };
      try {
        setIsLoading(true);
        dispatch(addQuestion(postToAdd));
        setTitle('');
        setQuestion('');
        setSelectedTags([]);
        navigation.navigate('Home');
      } catch (error) {
        ToastAndroid.show('กรุณาล็อคอินก่อนโพสคำถามค่ะ', ToastAndroid.SHORT);
        // กรุณาล็อคอินก่อนโพสคำถามค่ะ
        console.log(error);
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.graphicContainer}>
        <PostGraphic width={200} height={160} />
      </View>
      <View style={styles.textAreaContainerTitle}>
        <TextInput
          style={styles.textAreaTitle}
          multiline={false}
          numberOfLines={1}
          placeholder="พิมพ์หัวข้อที่นี่"
          onChangeText={(t) => setTitle(t)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          value={title}
        />
      </View>

      <View style={styles.textAreaContainerQuestion}>
        <TextInput
          style={styles.textAreaQuestion}
          multiline
          textAlignVertical="top"
          numberOfLines={4}
          placeholder="พิมพ์รายละเอียดคำถามของคุณ"
          onChangeText={(q) => setQuestion(q)}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          blurOnSubmit
          value={question}
        />
      </View>
      <View>
        <MultiSelect
          hideDropdown
          styleTextDropdown={styles.styleTextDropdown}
          styleListContainer={styles.styleListContainer}
          styleMainWrapper={styles.picker}
          selectedItemTextColor="#d896ac"
          submitButtonText="Submit Tags"
          tagContainerStyle={styles.tagContainerStyle}
          tagTextColor="black"
          tagRemoveIconColor="gray"
          tagBorderColor="#d896ac"
          onSelectedItemsChange={(value) => handleTagChange(value)}
          selectedItems={selectedTags}
          uniqueKey="name"
          selectText="เลือก tags"
          items={[
            { name: 'ปัญหาเรื่องเพศ', value: 'ปัญหาเรื่องเพศ', key: 'a' }, // sex
            { name: 'การออกเดท', value: 'การออกเดท', key: 'b' }, // dating
            { name: 'การเสพติด', value: 'การเสพติด', key: 'c' }, // addiction
            { name: 'เพื่อน', value: 'เพื่อน', key: 'd' }, // friendship
            { name: 'lgbt', value: 'LGBT', key: 'e' },
            { name: 'โรคซึมเศร้า', value: 'โรคซึมเศร้า', key: 'f' }, // depression
            { name: 'ความวิตกกังวล', value: 'ความวิตกกังวล', key: 'g' }, // anxiety
            { name: 'ไบโพลาร์', value: 'ไบโพลาร์', key: 'h' }, // bipolar
            { name: 'relationships', value: 'Relationships', key: 'i' },
            { name: 'การทำงาน', value: 'การทำงาน', key: 'j' }, // career
            { name: 'สุขภาพจิต', value: 'สุขภาพจิต', key: 'k' }, // mental health
            { name: 'bullying', value: 'Bullying', key: 'l' },
            { name: 'ครอบครัว', value: 'ครอบครัว', key: 'm' }, // family
            { name: 'อื่นๆ', value: 'อื่นๆ', key: 'n' }, // other
          ]}
        />
        <View style={styles.afterForm}>
          <Text style={styles.afterFormText}>ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ</Text>
          <TouchableHighlight onPress={handleEditorSubmit} style={styles.submitPostButton}>
            <Text style={styles.submitPostText}>
              ส่งคำถาม
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  graphicContainer: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAreaContainerTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
  },
  textAreaContainerQuestion: {
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
  },
  textAreaTitle: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  textAreaQuestion: {
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  picker: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styleTextDropdown: {
    paddingLeft: 10, 
    color: 'gray'
  },
  styleListContainer: {
    height: 120
  },
  tagContainerStyle: {
    height: 30
  },
  submitPostButton: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
    alignSelf: 'center',
  },
  submitPostText: {
    color: '#d896ac',
    alignSelf: 'center',
  },
  afterForm: {
    marginTop: 50,
  },
  afterFormText: {
    alignSelf: 'center',
    fontSize: 10,
  },
});
export default ForumPostMain;
