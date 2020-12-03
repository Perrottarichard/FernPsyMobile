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

  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

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

  console.log(activeUser)
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{title: 'Fern`s Counseling'}}/>
        <Stack.Screen name='ForumLandingPage' component={ForumLandingPage} options={{title: 'Choose a Topic'}}/>
        <Stack.Screen name='About' component={About}/>
        <Stack.Screen name='LoginForm' component={LoginForm} options={{title: 'Login'}}/>
        <Stack.Screen name='SingleTagDisplay' component={SingleTagDisplay} options={({ route }) => ({ title: route.params.tag })}/>
        <Stack.Screen name='ForumDisplayAll' component={ForumDisplayAll} options={({ route }) => ({ title: route.params.tag })}/>
        <Stack.Screen name='SinglePostDisplay' component={SinglePostDisplay} options={({ route }) => ({ title: route.params.postTitle })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
