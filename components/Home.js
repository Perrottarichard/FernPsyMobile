import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet} from 'react-native';
import LoginNavigate from './LoginNavigate';
import MyQuestionsNavigate from './MyQuestionsNavigate';

const Home = () => {
  const user = useSelector((state) => state.activeUser);

  if (user && user.token) {
    return (
      <View style={styles.ifLoggedInContainer}>
        <View style={styles.myQuestionsContainer}>
        <MyQuestionsNavigate/>
        </View>
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
  myQuestionsContainer: {
    flex: 1
  }
});
export default Home;
