import React from 'react';
import {useSelector} from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
import {Text, Card} from 'react-native-paper';

const Item = ({item}) => (
  <Card
    style={styles.card}
  >
    <Card.Cover
      style={styles.coverImage}
      source={{uri: `https://fern-counseling.herokuapp.com/${item.image}`}}
    />
    <Text>{item.title}</Text>
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
    width: "100%",
    height: 200
  }
})
  

export default Articles;
