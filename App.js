import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTheme} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { setUser } from './reducers/activeUserReducer';
import { initializeForumAnswered } from './reducers/forumReducer';
import forumService from './services/forumService';
import TabNav from './components/TabNav';

const App = () => {
  let user = useSelector(state => state.activeUser)
  if(user !== null){
    user = user.user;
  }else{
    user = null;
  }
  const dispatch = useDispatch();
  const theme = useTheme()
  const getLoggedUser = useCallback(async () => {
    const loggedUserJSON = await AsyncStorage.getItem('loggedForumUser');
    if (loggedUserJSON) {
      const existingUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(existingUser));
      forumService.setToken(existingUser.token);
    } else {
      console.log('no user');
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (!user) {
      getLoggedUser();
    } else {
      forumService.setToken(user.token);
    }
  }, [dispatch, getLoggedUser, user]);

  useEffect(() => {
    console.log('App initForumAnswered')
    dispatch(initializeForumAnswered());
  }, [dispatch]);

  return (
    <NavigationContainer
      theme={theme}
    >
      <TabNav />
    </NavigationContainer>
  );
};

export default App;
