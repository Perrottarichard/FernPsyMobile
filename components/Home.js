import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import LoginNavigate from './LoginNavigate';
import MyQuestionsNavigate from './MyQuestionsNavigate';

const Home = () => {
  const user = useSelector((state) => state.activeUser.user);
  const redirecting = useSelector(state => state.activeUser.redirecting)

  if ((user && user.token) && !redirecting) {
    return (
      <View style={styles.ifLoggedInContainer}>
        <View style={styles.myQuestionsContainer}>
        <MyQuestionsNavigate/>
        </View>
        </View>
    );
  }
  if (redirecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
