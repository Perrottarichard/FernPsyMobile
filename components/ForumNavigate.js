import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForumDisplayAll from './ForumDisplayAll';
import ForumLandingPage from './ForumLandingPage';
import SinglePostDisplay from './SinglePostDisplay';
import SingleTagDisplay from './SingleTagDisplay';

const Stack = createStackNavigator();

const ForumNavigate = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="ForumDisplayAll" component={ForumDisplayAll} />
    <Stack.Screen name="SingleTagDisplay" component={SingleTagDisplay} options={({ route }) => ({ title: route.params.tag })} />
    <Stack.Screen name="SinglePostDisplay" component={SinglePostDisplay} options={({ route }) => ({ title: route.params.postTitle })} />
  </Stack.Navigator>
);
export default ForumNavigate;
