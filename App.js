import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTheme} from 'react-native-paper'
import {ToastAndroid, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import { initStats, setUser } from './reducers/activeUserReducer';
import { initializeForumAnswered, getAllArticles } from './reducers/forumReducer';
import forumService from './services/forumService';
import TabNav from './components/TabNav';
import userService from './services/userService';
import reactotron from './ReactotronConfig';

LogBox.ignoreLogs(['Require cycles are allowed'])
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
  reactotron.connect()
}


const App = () => {
  const netInfo = useNetInfo();

  useCallback(() => {
  if(netInfo.isConnected === false) {
    ToastAndroid.show('Looks like you`re not connected to the internet.  Some features might not work', ToastAndroid.LONG)
  } else {
    console.log('internet connected')
  }
  }, [netInfo.isConnected])
  
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
      console.log(existingUser)
      dispatch(setUser(existingUser));
      forumService.setToken(existingUser.token);
      userService.setToken(existingUser.token);
      dispatch(initStats(existingUser._id))
    } else {
      console.log('no user');
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (!user) {
      getLoggedUser();
    } else {
      forumService.setToken(user.token);
      userService.setToken(user.token);
      dispatch(initStats(user._id))
    }
  }, [dispatch, getLoggedUser, user]);

  useEffect(() => {
    console.log('App initForumAnswered')
    dispatch(initializeForumAnswered());
  }, [dispatch]);

  useEffect(() => {
    console.log('App initArticles')
    dispatch(getAllArticles());
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
