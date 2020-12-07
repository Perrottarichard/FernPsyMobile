import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setUser } from './reducers/activeUserReducer';
import { initializeForumAnswered } from './reducers/forumReducer';
import forumService from './services/forumService';
import About from './components/About';
import LoginForm from './components/LoginForm';
import ForumPostMain from './components/ForumPostMain';
import ForumDisplayAll from './components/ForumDisplayAll';
import ForumLandingPage from './components/ForumLandingPage';
import ContactForm from './components/ContactForm';
import NoPage from './components/NoPage';
import SingleTagDisplay from './components/SingleTagDisplay';
import SinglePostDisplay from './components/SinglePostDisplay';
import MyQuestions from './components/MyQuestions';
import Home from './components/TabNav';
import ForumMain from './components/ForumMain';
import TabNav from './components/TabNav';

const App = () => {
  const activeUser = useSelector((state) => state.activeUser);
  const dispatch = useDispatch();
  const getLoggedUser = async () => {
    const loggedUserJSON = await AsyncStorage.getItem('loggedForumUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      dispatch(setUser(user));
      forumService.setToken(user.token);
    } else {
      console.log('no user');
    }
  };
  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle: node_modules/react-native-paper']);
  }, []);

  useEffect(() => {
    if (!activeUser) {
      console.log('!activeUser');
      getLoggedUser();
    } else {
      forumService.setToken(activeUser.token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeForumAnswered());
  }, []);

  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
};

export default App;
