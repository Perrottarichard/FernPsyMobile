import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/activeUserReducer'
import { initializeForumAnswered } from './reducers/forumReducer'
import forumService from './services/forumService'
import About from './components/About';
import LoginForm from './components/LoginForm'
import ForumPostMain from './components/ForumPostMain';
import ForumDisplayAll from './components/ForumDisplayAll'
import ForumLandingPage from './components/ForumLandingPage'
import ContactForm from './components/ContactForm';
import NoPage from './components/NoPage'
import SingleTagDisplay from './components/SingleTagDisplay';
import SinglePostDisplay from './components/SinglePostDisplay';
import MyQuestions from './components/MyQuestions'
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/TabNav';
import ForumMain from './components/ForumMain';
import TabNav from './components/TabNav';



const App = () => {

  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const getLoggedUser = async () => {
    let loggedUserJSON = await AsyncStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      forumService.setToken(user.token)
  }
}
  useEffect(() => {
    if(!activeUser){
      getLoggedUser()
    }
  }, [dispatch])

  useEffect(() => {
      dispatch(initializeForumAnswered())
  }, [])
  return (
    <NavigationContainer>
      <TabNav/>
    </NavigationContainer>
  );
};

export default App;
