import React, { useState, useEffect } from 'react';
import {
  Text, View, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { List, Chip, Surface, Menu, Provider, Avatar} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import {PacmanIndicator} from 'react-native-indicators'
import {BigHead} from 'react-native-bigheads'
// import { heart } from '../reducers/forumReducer';
import { setFlaggedComment } from '../reducers/forumReducer';
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
const checkMention = (passed) => {
  let regex = /\B@(\w+|[^\x00-\x7F]+)/g
  let found = passed.match(regex)
  if(found){
    let start = passed.substring(0, passed.indexOf('@'))
    let target = found.toString()
    let after = passed.substring(start.length + target.length)

    return <View style={styles.mentionContainer}><Text style={styles.replyWithMention}>{start}</Text><Text style={styles.replyWithMentionTarget}>{target}</Text><Text style={styles.replyWithMention}>{after}</Text></View>
  }else{
    return <View><Text style={styles.replyWithoutMention}>{passed}</Text></View>
  }
}

const SinglePostDisplay = (props) => {
  const { navigation, route } = props;
  const { postId } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const activeUser = useSelector(state => state.activeUser)
  const post = useSelector((state) => state.forum.answered.find((p) => p._id === postId));

  useEffect(() => {
    if(!post){
      setIsLoading(true)
    }else{
      setIsLoading(false)
    }
  }, [dispatch, post])

  const [visibleMenu, setVisibleMenu] = useState('');
  const [showReplies, setShowReplies] = useState('');
  const [showPac, setShowPac] = useState(false)

  const openMenu = (id) => setVisibleMenu(id)
  const closeMenu = () => setVisibleMenu('')

  const openReplies = (id) => {
    setShowPac(true)
    setShowReplies(id)
    setTimeout(() => {
      setShowPac(false)
    }, 2500);
  }
  const closeReplies = () => {
    setShowReplies('')
  }

  const submitHeart = async () => {
    const postToModify = post;
    if (activeUser === null) {
      ToastAndroid.show('คุณต้องเข้าสู่ระบบเพื่อส่งหัวใจ', ToastAndroid.SHORT);
      navigation.navigate('LoginForm');
    } else if (activeUser.heartedPosts.includes(post._id)) {
      ToastAndroid.show('คุณได้ส่งหัวใจสำหรับโพสต์นี้แล้ว', ToastAndroid.SHORT);
    } else {
      try {
          dispatch(heart(postToModify));
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

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
              <Text style={styles.questionText} selectable={true}>
              {post.question}
              </Text>
            </View>
            <List.Item
              left={() => <Avatar.Image size={45} source={{uri: 'http://fern-counseling.herokuapp.com/static/media/fernhippie500.8ec92f3a.jpg'}}
              style={styles.fernAvatar}/>}
              title={post.answer.answer}
              titleStyle={styles.answerHeadTitle}
              titleNumberOfLines={100}
              titleEllipsizeMode='tail'
              />
            <View style={styles.bottomTags}>
              <Chip key={post._id} mode='outlined' icon={chooseIcon(post.tags[0])} style={styles.chip} textStyle={{ color: chooseTagColor(post.tags[0]), ...styles.chipText}}>{post.tags[0]}</Chip>
            <Micon.Button
            name='comment-plus'
            size={28}
            style={styles.commentMiconButton}
            iconStyle={styles.miconIconStyle}
            color='lightgray'
            underlayColor='white'
            backgroundColor='white'
            activeOpacity={0.5} 
            onPress={() => {
              navigation.navigate('AddComment', {
                postId: post._id,
                postTitle: post.title,
              });
            }}
            ><Text style={styles.miconText}>Comment</Text></Micon.Button>
            <Micon.Button
              name="heart-half-full"
              color="pink"
              size={28}
              style={styles.heartIconStyle}
              backgroundColor='white'
              underlayColor='white'
              activeOpacity={0.5}
            >
              <Text style={styles.likeTextStyle}>
              {post.likes}
            </Text>
            </Micon.Button>
            </View>
          </Surface>
          
          <View>
            {post.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(c =>
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
                        <Icon name='md-flag-outline' 
                        size={14}
                        color='gray'  
                        style={styles.ellipsis}/>
                        </TouchableOpacity>}>
                    <Menu.Item 
                    icon='flag-variant' 
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
                <View style={styles.contentContainerView}>
                  <Text style={styles.commentContent} selectable={true}>
                  {c.content}
                  </Text>
                {c.replies.length > 0 && showReplies !== c._id && !showPac &&
                <Micon.Button 
                name='dots-horizontal' 
                size={25} 
                color='lightgray'
                underlayColor='white'
                backgroundColor='white'
                activeOpacity={0.5}  
                onPress={() => openReplies(c._id)} 
                style={styles.replyDownArrow}
                />}

                {c.replies.length > 0 && showReplies !== c._id && showPac &&
                <Micon.Button 
                name='dots-horizontal' 
                size={25} 
                color='lightgray'
                underlayColor='white'
                backgroundColor='white'
                activeOpacity={0.5}  
                onPress={() => openReplies(c._id)} 
                style={styles.replyDownArrow}
                />}

                {c.replies.length > 0 && showReplies === c._id && !showPac &&
                <Micon.Button 
                name='dots-horizontal' 
                size={25} 
                color='lightgray'
                underlayColor='white'
                activeOpacity={0.5}
                backgroundColor='white'  
                onPress={closeReplies} 
                style={styles.replyDownArrow}/>}
                </View>

                {c.replies.length > 0 && showReplies === c._id && showPac &&
                <PacmanIndicator color='lightgray' size={35} style={styles.replyDownArrow}/>
                }
              </Surface>
              
              {showReplies === c._id && c.replies.length > 0 && !showPac && c.replies.map(r => 
              <View key={r._id}>
                <List.Item
                  title={`${r.user.avatarName}`}
                  description={`replied ${timeSince(r.date)} ago`}
                  left={() => <BigHead {...r.user.avatarProps} size={28} containerStyles={styles.bigHeadReplyContainer}/>
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
                {checkMention(r.reply)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  fernAvatar: {
    marginLeft: 6,
    marginTop: 8
  },
  questionContainer: {
    padding: 10
  },
  questionText: {
    fontSize: 14,
    marginLeft: 62,
    marginRight: 5
  },
  answerHeadTitle: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'normal',
    marginLeft: 5,
    marginRight: 10
  },
  bottomTags: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    height: 50,
  },
  heartIconStyle: {
    alignSelf: 'flex-end',
    height: 40,
  },
  likeTextStyle: {
    alignSelf: 'flex-end',
    color: 'gray',
  },
  headTitle: {
    fontWeight: 'bold',
    padding: 0,
  },
  descriptionStyle: {
    color: 'gray'
  },
  chip: {
    marginTop: 14,
    height: 20,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  chipText: {
    fontSize: 10,
    marginLeft: 0,
    marginRight: 2,
    opacity: 0.7
  },
  commentMiconButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 1,
    height: 40
  },
  miconText: {
    color: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 11
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
    paddingLeft: 20,
    paddingRight: 10,
    marginRight: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  flagMenuContent: {
    fontSize: 12,
    color: '#cf4f46',
  },
  contentContainerView: {
    flex: 1,
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
    marginTop: 9,
    marginLeft: 15
  },
  touchableOpacityEllipsis: {
    width: 40
  },
  replyDownArrow: {
    alignSelf: 'flex-end',
    paddingRight: 3,
    height: 25,
    backgroundColor: 'white'
  },
  replyListItem: {
    marginBottom: 9,
    marginTop: 0,
    padding: 0,
  },
  bigHeadReplyContainer: {
    marginTop: 3
  },
  replyHeadTitle: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 10,
    color: 'gray'
  },
  replyDescriptionStyle: {
    position: 'absolute',
    left: 0,
    top: 14,
    fontSize: 8,
    color: 'gray',
    padding: 0,
    margin: 0
  },
  replyWithoutMention: {
    marginLeft: 27,
    marginBottom: 10,
    marginRight: 20,
    paddingTop: 0,
    fontSize: 12,
    color: 'gray',
  },
    mentionContainer: {
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 27,
    marginRight: 10
  },
    replyWithMentionTarget: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10
  },
    replyWithMention: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 10,
  },

})

export default SinglePostDisplay;
