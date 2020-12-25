import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper'
import MyQuestionsNavigate from './MyQuestionsNavigate';
import MoodTracker from './MoodTracker';

const Tab = createMaterialTopTabNavigator();

const MyQuestionsOrMoodNavigate = () => {
  const theme = useTheme()
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          height: 30, 
          paddingTop: 0, 
          marginTop: 0, 
          marginBottom: 3
          },
          indicatorStyle: {
            backgroundColor: theme.colors.primary,
            height: 0.25
          }
        }} >
      <Tab.Screen
        name="Home" component={MyQuestionsNavigate} />
      <Tab.Screen
        name="My Moods" component={MoodTracker}/>
    </Tab.Navigator>
  );
}

export default MyQuestionsOrMoodNavigate