import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setUser } from './reducers/activeUserReducer';
import { initializeForumAnswered } from './reducers/forumReducer';
import forumService from './services/forumService';
import TabNav from './components/TabNav';

const App = () => {
  const user = useSelector((state) => state.activeUser.user);
  const dispatch = useDispatch();
  const getLoggedUser = async () => {
    const loggedUserJSON = await AsyncStorage.getItem('loggedForumUser');
    if (loggedUserJSON) {
      const existingUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(existingUser));
      forumService.setToken(existingUser.token);
    } else {
      console.log('no user');
    }
  };
  useEffect(() => {
    if (!user) {
      getLoggedUser();
    } else {
      forumService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('App UF forumAnswered running')
    dispatch(initializeForumAnswered());
  }, []);

  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
};

export default App;
