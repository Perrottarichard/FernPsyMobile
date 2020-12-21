/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector} from 'react-redux';
import { View, FlatList, StyleSheet} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';

  const prettyDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateToChange = new Date(dateString).toLocaleDateString('th-TH', options)
    return dateToChange;
  }

const Item = ({item}) => (
  <Card
    style={styles.card}
  >
    <Card.Cover
      style={styles.coverImage}
      source={{uri: item.image}}
    />
    <Card.Title
      style={styles.cardTitleStyle}
      title={item.title}
      titleStyle={styles.cardTitleTextStyle}
      subtitle={`posted on ${prettyDate(item.date)}`}
      subtitleStyle={{fontSize: 10, paddingLeft: 3}}
      right={() => 
        <Micon.Button
          name='eye'
          backgroundColor='transparent'
          color='gray'
          size={16}
        ><Text
          style={{color: 'gray', fontSize: 12}}
        >{item.likes}</Text></Micon.Button>}
    />
  </Card>
) 

const Articles = () => {
  //get articles
  const DATA = useSelector(state => state.forum.articles)

  const renderItem = ({item}) => (
    <Item 
      item={item}
    />
  );

  return(
    <View
      style={styles.container}
    >
      <FlatList
        data={DATA}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        style={styles.scroll}
      />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    margin: 10
  },
  scroll: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    resizeMode: 'cover'
  },
  // cardContentStyle: {
  //   paddingLeft: 0
  // },
  cardTitleStyle: {
    paddingLeft: 0
  },
  cardTitleTextStyle: {
    fontSize: 14,
    paddingLeft: 3
  }
})
  

export default Articles;
