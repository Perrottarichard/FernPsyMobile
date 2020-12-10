import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ScrollView} from 'react-native';
import LoginNavigate from './LoginNavigate';
import Logout from './Logout';
import MyQuestionsNavigate from './MyQuestionsNavigate';
import AvatarPreview from './AvatarPreview'

const Home = () => {
  const user = useSelector((state) => state.activeUser);

  if (user && user.token) {
    return (
      <View style={styles.ifLoggedInContainer}>
        <AvatarPreview/>
        {/* <View style={styles.myQuestionsContainer}>
        <MyQuestionsNavigate/>
        </View> */}
        </View>
    );
  }
  return (
    <View style={styles.loginContainer}>
      <LoginNavigate />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  ifLoggedInContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  // myQuestionsContainer: {
  //   flex: 1
  // }
});
export default Home;
