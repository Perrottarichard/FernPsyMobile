import React, { useEffect, useState } from 'react';
import {
  Text, View, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForumAnswered } from '../reducers/forumReducer';
import {BigHead} from 'react-native-bigheads'
import { List, Chip, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'

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

const timeSince = (date) => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'y';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'mo';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'd';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "h";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "min";
          } else {
            interval = seconds;
            intervalType = "s";
          }
        }
      }
    }
  }
  return interval + '' + intervalType;
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
  }, [dispatch, forumAnswered]);

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
          <Card containerStyle={styles.cardStyle} key={f._id}>
              <List.Item
              title={f.title}
              description={`Posted by ${f.user.avatarName} ${timeSince(f.date)} ago`}
              left={() => <BigHead {...f.user.avatarProps} size={50}/>}
              titleStyle={styles.headTitle}
              descriptionStyle={styles.descriptionStyle}
              titleNumberOfLines={3}
              descriptionNumberOfLines={2}
              titleEllipsizeMode='tail'
              onPress={() => {
                navigation.navigate('SinglePostDisplay', {
                  postId: f._id,
                  postTitle: f.title,
                });
              }}
              />

            {/* <Text>
              {f.question}
            </Text>
            <Text>
              {f.answer.answer}
            </Text> */}
            <View style={styles.bottomTags}>
              {f.tags.map((t) => <Chip key={t} mode='outlined' icon={chooseIcon(t)}style={styles.chip} textStyle={{ color: chooseTagColor(t), ...styles.chipText}}>{t}</Chip>)}
              <Text style={styles.commentCountText}>
              {f.comments.length}
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
              {f.likes}
            </Text>
            </View>
          </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4
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
    bottom: 8
  },
  headTitle: {
    fontWeight: 'bold'
  },
  descriptionStyle: {
    color: 'gray'
  },
  chip: {
    position: 'absolute',
    left: 0,
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
    color: 'black',
    fontSize: 14
  }
});
export default ForumDisplayAll;
