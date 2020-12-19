import React, { useState, useEffect } from 'react';
import {
  Keyboard, Text, TextInput, ToastAndroid, View, StyleSheet, ScrollView, LogBox,
} from 'react-native';
import {Button, useTheme} from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import {Picker} from '@react-native-picker/picker'
import { addQuestion } from '../reducers/forumReducer';
import PostGraphic from '../assets/undraw_add_post_64nu.svg';

const ForumPostMain = (props) => {
  const { navigation } = props;
  const theme = useTheme();
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

  const handleEditorSubmit = async () => {

    if (!title || !question) {
      ToastAndroid.show('ใส่หัวข้อและคำถามของคุณด้วยนะคะ', ToastAndroid.SHORT);
      // 'Please make sure you have a title, a question'
      // ใส่หัวข้อและคำถามของคุณด้วยนะคะ
    } else if (selectedTags.length === 0 || selectedTags.includes('เลือก tag')) {
      ToastAndroid.show('คุณต้องเลือก 1 tag', ToastAndroid.SHORT);
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
    <ScrollView
      contentContainerStyle={styles.postContainer}
    >
      <View
        style={styles.graphicContainer}
      >
        <PostGraphic
          width={180} height={120}
        />
      </View>
      <View
        style={styles.inputContainer}
      >
        <View
          style={{...styles.textAreaContainerTitle, borderColor: theme.colors.onSurface, backgroundColor: theme.colors.surface}}
        >
          <TextInput
            style={{...styles.textAreaTitle, color: theme.colors.onSurface}}
            multiline={false}
            numberOfLines={1}
            placeholder="พิมพ์หัวข้อที่นี่"
            onChangeText={(t) => setTitle(t)}
            placeholderTextColor='gray'
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={() => { Keyboard.dismiss(); }}
            value={title}
          />
        </View>

        <View
          style={{...styles.textAreaContainerQuestion, borderColor: theme.colors.onSurface, backgroundColor: theme.colors.surface}}
        >
          <TextInput
            style={{...styles.textAreaQuestion, color: theme.colors.onSurface}}
            multiline
            textAlignVertical="top"
            numberOfLines={4}
            placeholderTextColor='gray'
            placeholder="พิมพ์รายละเอียดคำถามของคุณ"
            onChangeText={(q) => setQuestion(q)}
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={() => { Keyboard.dismiss(); }}
            blurOnSubmit
            value={question}
          />
        </View>
        <View
          style={{...styles.picker, borderColor: theme.colors.onSurface, color: theme.colors.onSurface, backgroundColor: theme.colors.surface}}
        >
          <Picker
            onValueChange={(value) => setSelectedTags(value)}
            selectedValue={selectedTags}
            style={{...styles.styleTextDropdown, color: theme.colors.placeholder}}
            itemStyle={{color: theme.colors.onSurface}}
            prompt='Choose a tag'
          >
            <Picker.Item
              label='เลือก tag' value='เลือก tag'
            />
            <Picker.Item
              label='ปัญหาเรื่องเพศ' value='ปัญหาเรื่องเพศ'
            />
            <Picker.Item
              label='การเสพติด' value='การเสพติด'
            />
            <Picker.Item
              label='เพื่อน' value='เพื่อน'
            />
            <Picker.Item
              label='lgbt' value='lgbt'
            />
            <Picker.Item
              label='โรคซึมเศร้า' value='โรคซึมเศร้า'
            />
            <Picker.Item
              label='ความวิตกกังวล' value='ความวิตกกังวล'
            />
            <Picker.Item
              label='ไบโพลาร์' value='ไบโพลาร์'
            />
            <Picker.Item
              label='relationships' value='relationships'
            />
            <Picker.Item
              label='การทำงาน' value='การทำงาน'
            />
            <Picker.Item
              label='สุขภาพจิต' value='สุขภาพจิต'
            />
            <Picker.Item
              label='การรังแก' value='การรังแก'
            />
            <Picker.Item
              label='ครอบครัว' value='ครอบครัว'
            />
            <Picker.Item
              label='อื่นๆ' value='อื่นๆ'
            />
            <Picker.Item
              label='ความรัก' value='ความรัก'
            />
          </Picker>
        </View>
      </View>
      <View
        style={styles.buttonContainer}
      >
        <Text
          style={styles.afterFormText}
        >ชื่อที่คุณใช้ล็อคอินจะไม่ปรากฏในคำถามของคุณ
        </Text>
        <Button
          mode='contained' icon='text-box-plus' onPress={handleEditorSubmit} style={styles.submitPostButton}
        >
          <Text
            style={styles.submitPostText}
          >
            ส่งคำถาม
          </Text>
        </Button>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1
  },
  graphicContainer: {
    flex: 2,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'space-evenly',
    marginLeft: 5,
    marginRight: 5
  },
  textAreaContainerTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.25,
    borderRadius: 10,
    marginBottom: 10
  },
  textAreaContainerQuestion: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.25,
    borderRadius: 10,
    marginBottom: 10
  },
  textAreaTitle: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  textAreaQuestion: {
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    fontSize: 16
  },
  picker: {
    borderWidth: 0.25,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styleTextDropdown: {
  },
  submitPostButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightpink',
  },
  submitPostText: {
    color: 'black',
  },
  buttonContainer: {
    flex: 1,
  },
  afterFormText: {
    alignSelf: 'center',
    fontSize: 10,
  },
});
export default ForumPostMain;
