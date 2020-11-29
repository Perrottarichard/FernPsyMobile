import React, {useState} from "react";
import { View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'

const Home = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
      title='Go to Forum'
      onPress={() => navigation.navigate('ForumMain')}
      />
    </View>
  );
};

const styles= StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}
})

export default Home;
