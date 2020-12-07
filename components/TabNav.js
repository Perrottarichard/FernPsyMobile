import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ficons from 'react-native-vector-icons/FontAwesome5';
import About from './About';
import Home from './Home';
import ForumPostMain from './ForumPostMain';
import Articles from './Articles';
import ForumNavigate from './ForumNavigate';

const Tab = createMaterialBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#d896ac"
      inactiveColor="lightgray"
      labeled
      barStyle={styles.barStyle}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <Icon name="info-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Ask Fern"
        component={ForumPostMain}
        options={{
          tabBarLabel: 'Ask Fern',
          tabBarIcon: ({ color }) => (
            <Icon name="post-add" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarLabel: 'Articles',
          tabBarIcon: ({ color }) => (
            <Ficons name="book-reader" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="View Forum"
        component={ForumNavigate}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ color }) => (
            <Icon name="forum" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#252626'
  }
})

export default TabNav;
