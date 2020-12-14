import React, { useEffect, useState} from 'react';
import {
  Text, View, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, ToastAndroid, TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { List, Chip, IconButton, Surface, Menu, Provider, Divider} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
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
  const { postId} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.forum.answered.find((p) => p._id === postId));

  const [sentHeart, setSentHeart] = useState(null);
  const [pulseHeart, setPulseHeart] = useState('');

  const [visibleMenu, setVisibleMenu] = useState('');

  const openMenu = (id) => setVisibleMenu(id)
  const closeMenu = () => setVisibleMenu('')

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
      setVisibleMenu('')
      return ToastAndroid.show('ความคิดเห็นนี้มีผู้รายงานให้แอดมินทราบปัญหาเรียบร้อยแล้ว', ToastAndroid.SHORT);
    }
    setVisibleMenu('')
    dispatch(setFlaggedComment(comment));
  };

  return (
    <Provider>
    {post && post._id &&
    <ScrollView style={styles.container}>
      <Surface style={styles.cardStylePost} key={post._id}>
              <List.Item
              title={post.title}
              description={`Posted by ${post.user.avatarName} ${timeSince(post.date)} ago`}
              left={() => <BigHead {...post.user.avatarProps} size={55}/>}
              titleStyle={styles.headTitle}
              descriptionStyle={styles.descriptionStyle}
              titleNumberOfLines={3}
              descriptionNumberOfLines={2}
              titleEllipsizeMode='tail'
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
            <Micon.Button
            name='comment-plus'
            size={23}
            style={styles.commentMiconButton}
            iconStyle={styles.miconIconStyle}
            color='lightgray'
            underlayColor='white'
            activeOpacity={0.5} 
            onPress={() => {
              navigation.navigate('AddComment', {
                postId: post._id,
                postTitle: post.title,
              });
            }}
            ><Text style={styles.miconText}>Comment</Text></Micon.Button>
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
          </Surface>
          
          <View>
            {post.comments.map(c =>
            <View key={c._id}>
                  <Surface style={styles.cardStyleComment} >
                  <List.Item
                  title={`${c.user.avatarName}`}
                  description={`commented ${timeSince(c.date)} ago`}
                  right={() => 
                  <View style={styles.replyButtonView}>
                    <Micon.Button 
                    name='reply' 
                    color='lightgray' 
                    size={18}
                    underlayColor='white'
                    activeOpacity={0.5} 
                    iconStyle={styles.miconIconStyle}
                    style={styles.replyButton} 
                    backgroundColor='white'
                    onPress={() => {
                      navigation.navigate('AddReply', {
                        commentId: c._id,
                        postId: post._id
                      });
                    }}
                    >
                      <Text style={styles.replyButtonText}>Reply</Text>
                      </Micon.Button>
                      <Menu visible={visibleMenu === c._id ? true : false} 
                      onDismiss={closeMenu} 
                      anchor={ 
                      <TouchableOpacity 
                      onPress={() => openMenu(c._id)} style={styles.touchableOpacityEllipsis}>
                        <Icon name='ellipsis-vertical' 
                        size={16} 
                        color='gray'  
                        style={styles.ellipsis}/>
                        </TouchableOpacity>}>
                    <Menu.Item 
                    icon='flag' 
                    titleStyle={styles.flagMenuContent} 
                    onPress={() => flag(c)} 
                    title='Flag comment'/>
                  </Menu>
                  </View>}
                  left={() => <BigHead {...c.user.avatarProps} size={38}/>}
                  titleStyle={styles.commentHeadTitle}
                  descriptionStyle={styles.commentDescriptionStyle}
                  titleNumberOfLines={1}
                  descriptionNumberOfLines={1}
                  titleEllipsizeMode='tail'
                  disabled={true}
                  style={styles.commentListItem}
                  onPress={() => console.log('pressed')}
                  />
                <View>
                  <Text style={styles.commentContent}>
                  {c.content}
                  </Text>
                </View>
              </Surface>

              {c.replies.map(r => 
              <View key={r._id}>
                <List.Item
                  title={`${r.user.avatarName}`}
                  description={`replied ${timeSince(r.date)} ago`}
                  left={() => <BigHead {...r.user.avatarProps} size={28}/>
                  }
                  titleStyle={styles.replyHeadTitle}
                  descriptionStyle={styles.replyDescriptionStyle}
                  titleNumberOfLines={1}
                  descriptionNumberOfLines={1}
                  titleEllipsizeMode='tail'
                  disabled={true}
                  style={styles.replyListItem}
                  onPress={() => console.log('pressed')}
                  />
                  {/* <Surface style={styles.replySurface}> */}
                <Text style={styles.replyContent}>{r.reply}</Text>
                <Divider style={styles.replyDivider}/>
                {/* </Surface> */}
                </View>)}
              </View>
            )}
          </View>
    </ScrollView>
   }
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 20
  },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // scroll: {
  //   flex: 1,
  // },
  cardStylePost: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 5,
  },
  cardStyleComment: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0,
    marginBottom: 5
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
    bottom: 6
  },
  likeTextStyle: {
    position: 'absolute',
    right: 45,
    bottom: 11,
    color: 'gray',
    fontSize: 12
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
    bottom: 11,
    paddingLeft: 0,
    paddingRight: 1,
    alignItems: 'center',
    height: 20
  },
  chipText: {
    padding: 0,
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2,
    opacity: 0.7
  },
  commentMiconButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: 'white',
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 10
  },
  commentCountText: {
    position: 'absolute',
    right: 172,
    bottom: 8,
    color: 'gray',
    fontSize: 14
  },
  commentHeadTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'normal',
    fontSize: 12,
    color: 'gray',
  },
  commentDescriptionStyle: {
    fontSize: 10,
    alignSelf: 'flex-start',
  },
  commentListItem: {
    paddingLeft: 13,
  },
  commentContent: {
    color: 'gray',
    fontSize: 13,
    paddingLeft: 30,
    paddingRight: 10,
    paddingBottom: 10
  },
  flagMenuContent: {
    fontSize: 12,
    color: '#cf4f46',
  },
  replyButtonView: {
    flexDirection: 'row'
  },
  miconIconStyle: {
    marginRight: 3
  },
  replyButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: 'white',
  },
  replyButtonText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 10
  },
  ellipsis: {
    marginTop: 8,
    marginLeft: 15
  },
  touchableOpacityEllipsis: {
    width: 40
  },
  replyListItem: {
    margin: 5,
    padding: 0,
  },
  replyHeadTitle: {
    alignSelf: 'flex-start',
    fontSize: 10,
    color: 'gray'
  },
  replyDescriptionStyle: {
    alignSelf: 'flex-start',
    fontSize: 8,
    color: 'gray'
  },
  replyContent: {
    marginLeft: 30,
    fontSize: 12,
    color: 'gray'
  },
  replyDivider: {
    backgroundColor: 'black',
    margin: 5
  }
})
export default SinglePostDisplay;
