import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect} from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import ForumMain from './components/ForumMain';


const Stack = createStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

  const getLoggedUser = async () => {
    let loggedUserJSON = await AsyncStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setLoggedIn(true)
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
  }, [dispatch])

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{title: 'Fern`s Counseling'}}/>
        <Stack.Screen name='ForumMain' component={ForumMain}/>
        <Stack.Screen name='About' component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
