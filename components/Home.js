import React, {useState} from "react";
import { View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import Logout from "./Logout";

const Home = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
      title='Go to Forum'
      onPress={() => navigation.navigate('ForumLandingPage')}
      />
      <Button
      title='About Fern'
      onPress={() => navigation.navigate('About')}
      />
      <Button
      title='Login'
      onPress={() => navigation.navigate('LoginForm')}
      />
      <Logout/>
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
