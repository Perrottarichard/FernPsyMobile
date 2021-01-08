import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OnboardingScreen from './OnboardingScreen';

const Stack = createStackNavigator();

const OnboardingNavigate = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name='Onboarding' component={OnboardingScreen}/>
      
    <Stack.Screen
      name="LoginForm" component={LoginForm}
    />
    <Stack.Screen
      name="RegisterForm" component={RegisterForm}
    />
  </Stack.Navigator>
);
export default OnboardingNavigate;