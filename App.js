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
    if (!activeUser) {
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
