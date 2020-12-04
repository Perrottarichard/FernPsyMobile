import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ficons from 'react-native-vector-icons/FontAwesome5'
import About from "./About";
import Home from './Home'
import ForumPostMain from "./ForumPostMain";
import ForumLandingPage from "./ForumLandingPage";
import Articles from "./Articles";
import ForumNavigate from "./ForumNavigate";

const Tab = createMaterialBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#d896ac"
      inactiveColor='lightgray'
      labeled={true}
      barStyle={{ backgroundColor: '#252626' }}
    >
      <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen
      name='About'
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
      name='Articles'
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
          tabBarLabel: 'View Forum',
          tabBarIcon: ({ color }) => (
            <Icon name="forum" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default TabNav;