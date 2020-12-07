import React, { useEffect, useState } from 'react';
import {
  Button, Text, View, ScrollView, StyleSheet, ActivityIndicator, Pressable,
} from 'react-native';
import { Badge, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForumAnswered } from '../reducers/forumReducer';

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

];
const chooseTagColor = (passed) => {
  const color = tagColorOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const ForumDisplayAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const forumAnswered = useSelector((state) => state.forum.answered);

  useEffect(() => {
    if (!forumAnswered) {
      setIsLoading(true);
      dispatch(initializeForumAnswered());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, forumAnswered, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <ScrollView>
      {forumAnswered && forumAnswered.map((f) => (
        <Pressable
          key={f._id}
          onPress={() => {
            navigation.navigate('SinglePostDisplay', {
              postId: f._id,
              postTitle: f.title,
            });
          }}
        >
          <Card style={styles.cardStyle}>
            <Card.Title>
              {f.title}
              {'\n'}
              <Text>
                ถามเมื่อ
                {f.date.slice(0, 10)}
              </Text>
              {'\n'}
            </Card.Title>
            <Icon
              name="ios-heart-sharp"
              color="deeppink"
              size={26}
              style={styles.heartIconStyle}
            />
            <Text style={styles.likeTextStyle}
            >
              {f.likes}
            </Text>
            <Text>
              {f.question}
            </Text>
            <Text>
              {f.answer.answer}
            </Text>
            <View style={styles.bottomTags}>
              {f.tags.map((t) => <Badge key={t} badgeStyle={{ backgroundColor: chooseTagColor(t) }} value={t} />)}
            </View>
          </Card>
        </Pressable>
      ))}
      <View>
        <Text>ตั้งกระทู้ถาม</Text>
        <Button title="ส่งคำถาม" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTags: {
    flexDirection: 'row-reverse',
  },
  heartIconStyle: {
    position: 'absolute', left: 0
  },
  likeTextStyle: {
    position: 'absolute', 
    left: 10, 
    fontSize: 10, 
    paddingTop: 6, 
    color: 'white', 
    fontWeight: 'bold'
  }
});
export default ForumDisplayAll;
