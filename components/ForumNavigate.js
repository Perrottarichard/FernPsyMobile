import React from 'react'
import ForumDisplayAll from './ForumDisplayAll'
import ForumLandingPage from './ForumLandingPage'
import SinglePostDisplay from './SinglePostDisplay'
import SingleTagDisplay from './SingleTagDisplay'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ForumNavigate = () => {
  return(
    <Stack.Navigator>
    <Stack.Screen name='ForumLandingPage' component={ForumLandingPage} options={{title: 'Choose a Topic'}}/>
    <Stack.Screen name='SingleTagDisplay' component={SingleTagDisplay} options={({ route }) => ({ title: route.params.tag })}/>
    <Stack.Screen name='ForumDisplayAll' component={ForumDisplayAll} options={({ route }) => ({ title: route.params.tag })}/>
    <Stack.Screen name='SinglePostDisplay' component={SinglePostDisplay} options={({ route }) => ({ title: route.params.postTitle })}/>
  </Stack.Navigator>
  )
}
export default ForumNavigate