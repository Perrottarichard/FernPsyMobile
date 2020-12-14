import React, { useEffect, useState, useCallback } from 'react';
import {
  Text, View, FlatList, StyleSheet, ActivityIndicator, RefreshControl
} from 'react-native';
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForumAnswered } from '../reducers/forumReducer';
import {BigHead} from 'react-native-bigheads'
import { List, Chip, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-picker/picker'
import NoPostsYet from './NoPostsYet'

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

export const timeSince = (date) => {
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

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const applyFilterByTag = (allAnsweredPosts, filter) => {
  if(filter === 'none'){
    return allAnsweredPosts;
  }else{
    return allAnsweredPosts.filter(f => f.tags.includes(filter))
  }
}
const Item = ({ item, onPress }) => (
  <Card containerStyle={styles.cardStyle} key={item._id}>
              <List.Item
              title={item.title}
              description={`Posted by ${item.user.avatarName} ${timeSince(item.date)} ago`}
              left={() => <BigHead {...item.user.avatarProps} size={50}/>}
              titleStyle={styles.headTitle}
              descriptionStyle={styles.descriptionStyle}
              titleNumberOfLines={3}
              descriptionNumberOfLines={2}
              titleEllipsizeMode='tail'
              onPress={onPress}
              style={styles.listItemStyle}
              />
            <View style={styles.bottomTags}>
              {item.tags.map((t) => <Chip key={t} mode='outlined' icon={chooseIcon(t)}style={styles.chip} textStyle={{ color: chooseTagColor(t), ...styles.chipText}}>{t}</Chip>)}
              <Text style={styles.commentCountText}>
              {item.comments.length}
            </Text>
            <IconButton
            icon='comment'
            size={24}
            style={styles.commentIconButton}
            color='lightgray'
            />
            <Icon
              name="ios-heart-sharp"
              color="pink"
              size={26}
              style={styles.heartIconStyle}
            />
            <Text style={styles.likeTextStyle}>
              {item.likes}
            </Text>
            </View>
          </Card>
);

const ForumDisplayAll = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let forumAnswered = useSelector((state) => state.forum.answered);
  const [selectedFilterTag, setSelectedFilterTag] = useState('none')

  forumAnswered = applyFilterByTag(forumAnswered, selectedFilterTag)
  const DATA = forumAnswered.sort((a, b) => new Date(b.date) - new Date(a.date))

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(initializeForumAnswered());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!forumAnswered) {
      setIsLoading(true);
      dispatch(initializeForumAnswered());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, forumAnswered]);

  const renderItem = ({item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('SinglePostDisplay', {
            postId: item._id,
            postTitle: item.title,
          });
        }
      }
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
       <View style={styles.filterContainer}>
         <Icon name='ios-filter-outline' style={styles.filterIcon} size={24}/>
        <Picker
          onValueChange={(value) => setSelectedFilterTag(value)}
          selectedValue={selectedFilterTag}
          dropdownIconColor='#d896ac'
          style={styles.picker}
        >
          <Picker.Item label='Show all' value='none'/>
          <Picker.Item label='ปัญหาเรื่องเพศ' value='ปัญหาเรื่องเพศ'/>
          <Picker.Item label='การเสพติด' value='การเสพติด'/>
          <Picker.Item label='เพื่อน' value='เพื่อน'/>
          <Picker.Item label='lgbt' value='lgbt'/>
          <Picker.Item label='โรคซึมเศร้า' value='โรคซึมเศร้า'/>
          <Picker.Item label='ความวิตกกังวล' value='ความวิตกกังวล'/>
          <Picker.Item label='ไบโพลาร์' value='ไบโพลาร์'/>
          <Picker.Item label='relationships' value='relationships'/>
          <Picker.Item label='การทำงาน' value='การทำงาน'/>
          <Picker.Item label='สุขภาพจิต' value='สุขภาพจิต'/>
          <Picker.Item label='การรังแก' value='การรังแก'/>
          <Picker.Item label='ครอบครัว' value='ครอบครัว'/>
          <Picker.Item label='อื่นๆ' value='อื่นๆ'/>
          <Picker.Item label='ความรัก' value='ความรัก'/>
        </Picker>
        </View>
    <FlatList 
    style={styles.scroll} 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    data={DATA}
    renderItem={renderItem}
    keyExtractor={item => item._id}
    ListEmptyComponent={<NoPostsYet/>}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flex: 0.05,
    flexDirection: 'row',
    marginBottom: 0,
    padding: 15,
    paddingBottom: 0,
  },
  filterIcon: {
    position: 'absolute',
    left: 20,
    color: 'gray',
    top: 12,
  },
  picker: {
    width: 200,
    position: 'absolute',
    left: 45,
    top: 0,
    color: 'gray',
  },
  scroll: {
    flex: 1,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 4,
    paddingRight: 0
  },
  listItemStyle: {
    paddingLeft: 5, 
    margin: 0,
    borderRadius: 10,
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
    marginRight: 2,
    opacity: 0.7
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
  }
});
export default ForumDisplayAll;
