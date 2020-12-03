import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import About from "./About";
import Home from './Home'
import ForumPostMain from "./ForumPostMain";
import ForumLandingPage from "./ForumLandingPage";

const Tab = createMaterialBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      style={{ backgroundColor: 'tomato' }}
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
        name="View Forum"
        component={ForumLandingPage}
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
