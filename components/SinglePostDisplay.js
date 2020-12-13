import React, { useEffect, useState} from 'react';
import {
  Text, View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, ToastAndroid, TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { List, Chip, IconButton, TextInput, Menu, Provider} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import {BigHead} from 'react-native-bigheads'
import { addComment, heart } from '../reducers/forumReducer';
import { initializeForumAnswered, setFlaggedComment } from '../reducers/forumReducer';
import {timeSince} from './ForumDisplayAll'

const tagOptions = [
  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'gender-male-female' },
  { tag: 'relationships', backgroundColor: '#63ba90', icon: 'account-heart-outline' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'gender-transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'account-group' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'emoticon-sad-outline' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'lightning-bolt' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'theater-comedy' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'cash' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'emoticon-angry-outline' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home-heart' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'head-question' },
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: 'pill' },
];
const chooseTagColor = (passed) => {
  const color = tagOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const chooseIcon = (passed) => {
  const icon = tagOptions.find(t => t.tag === passed);
  if(icon) {
    return icon.icon;
  }
  return 'star'
}

const SinglePostDisplay = (props) => {
  const { activeUser, navigation, route } = props;
  const { postId, postTitle } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const post = useSelector((state) => state.forum.answered.find((p) => p._id === postId));
  const [sentHeart, setSentHeart] = useState(null);
  const [pulseHeart, setPulseHeart] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(false);

  const openMenu = () => setVisibleMenu(true)
  const closeMenu = () => setVisibleMenu(false)

  useEffect(() => {
    dispatch(initializeForumAnswered());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  const submitComment = async () => {
    const postToModifyId = post;
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องลงชื่อเพื่อแสดงความคิดเห็น', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } else if (comment === '') {
      ToastAndroid.show('คุณลืมที่จะเขียนความคิดเห็น', ToastAndroid.SHORT);
    } else {
      try {
        setIsLoading(true);
        dispatch(addComment(comment, postToModifyId));
        setComment('');
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };
  const submitHeart = async () => {
    const postToModify = post;
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } else if (sentHeart !== null) {
      ToastAndroid.show('คุณได้ส่งหัวใจสำหรับโพสต์นี้แล้ว', ToastAndroid.SHORT);
    } else {
      try {
        setPulseHeart('heart-icon');
        setTimeout(() => {
          setSentHeart(post._id);
          dispatch(heart(postToModify));
          setPulseHeart('');
        }, 2000);
      } catch (error) {
        console.log(error);
        ToastAndroid.show('กรุณาลองใหม่', ToastAndroid.SHORT);
      }
    }
  };
  const flag = (comment) => {
    if (comment.isFlagged) {
      setVisibleMenu(false)
      return ToastAndroid.show('ความคิดเห็นนี้มีผู้รายงานให้แอดมินทราบปัญหาเรียบร้อยแล้ว', ToastAndroid.SHORT);
    }
    setVisibleMenu(false)
    dispatch(setFlaggedComment(comment));
  };

  return (
    <Provider>
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.cardStyle} key={post._id}>
              <List.Item
              title={post.title}
              description={`Posted by ${post.user.avatarName} ${timeSince(post.date)} ago`}
              left={() => <BigHead {...post.user.avatarProps} size={50}/>}
              titleStyle={styles.headTitle}
              descriptionStyle={styles.descriptionStyle}
              titleNumberOfLines={3}
              descriptionNumberOfLines={2}
              titleEllipsizeMode='tail'
              onPress={() => {
                navigation.navigate('SinglePostDisplay', {
                  postId: post._id,
                  postTitle: post.title,
                });
              }}
              />
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
              {post.question}
              </Text>
            </View>
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>
              {post.answer.answer}
              </Text>
            </View>
            <View style={styles.bottomTags}>
              {post.tags.map((t) => <Chip key={t} mode='outlined' icon={chooseIcon(t)} style={styles.chip} textStyle={{ color: chooseTagColor(t), ...styles.chipText}}>{t}</Chip>)}
              <Text style={styles.commentCountText}>
              {post.comments.length}
            </Text>
            <IconButton
            icon='comment-outline'
            size={24}
            style={styles.commentIconButton}
            color='gray'
            />
            <Icon
              name="ios-heart-sharp"
              color="pink"
              size={26}
              style={styles.heartIconStyle}
            />
            <Text style={styles.likeTextStyle}>
              {post.likes}
            </Text>
            </View>
          </Card>
          <View>
            {post.comments.map(c =>
                  <Card containerStyle={styles.cardStyle} key={c._id}>
                  <List.Item
                  title={c.user.avatarName}
                  description={`${timeSince(c.date)} ago`}
                  left={() => <Menu visible={visibleMenu} onDismiss={closeMenu} anchor={ <TouchableOpacity onPress={openMenu} style={styles.touchableOpacityEllipsis}><Icon name='ellipsis-vertical' size={16} color='gray'  style={styles.ellipsis}/></TouchableOpacity>}>
                    <Menu.Item icon='flag' titleStyle={styles.flagMenuContent} onPress={() => flag(c)} title='Flag comment'/>
                  </Menu>}
                  right={() => <BigHead {...c.user.avatarProps} size={35}/>}
                  titleStyle={styles.commentHeadTitle}
                  descriptionStyle={styles.commentDescriptionStyle}
                  titleNumberOfLines={1}
                  descriptionNumberOfLines={1}
                  titleEllipsizeMode='tail'
                  disabled={true}
                  onPress={() => console.log('pressed')}
                  />
                <Menu >

                </Menu>
                <View>
                  <Text style={styles.commentContent}>
                  {c.content}
                  </Text>
                </View>
              </Card>
            )}
          </View>
    </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // scroll: {
  //   flex: 1,
  // },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0
  },
  questionContainer: {
    padding: 10
  },
  questionText: {
    fontSize: 14
  },
  answerContainer: {
    padding: 10
  },
  answerText: {
    fontSize: 14
  },
  bottomTags: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  heartIconStyle: {
    position: 'absolute', 
    right: 16,
    bottom: 4
  },
  likeTextStyle: {
    position: 'absolute',
    right: 45,
    bottom: 8,
    color: 'gray'
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    color: 'gray'
  },
  chip: {
    position: 'absolute',
    left: 10,
    bottom: 9,
    paddingLeft: 0,
    paddingRight: 1,
    alignItems: 'center',
    height: 20
  },
  chipText: {
    padding: 0,
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2
  },
  commentIconButton: {
    margin: 0,
  },
  commentCountText: {
    position: 'absolute',
    right: 172,
    bottom: 8,
    color: 'gray',
    fontSize: 14
  },
  commentHeadTitle: {
    alignSelf: 'flex-end',
    fontWeight: 'normal',
    fontSize: 12,
    color: 'gray',
  },
  commentDescriptionStyle: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  commentContent: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10
  },
  flagMenuContent: {
    fontSize: 12,
    color: '#cf4f46',
  },
  ellipsis: {
    marginTop: 8,
    marginLeft: 2
  },
  touchableOpacityEllipsis: {
    width: 40
  }
})
export default SinglePostDisplay;
