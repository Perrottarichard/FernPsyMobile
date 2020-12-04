import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginNavigate = () => {
  return(
    <Stack.Navigator initialRouteName='LoginForm' screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='LoginForm' component={LoginForm} options={{title: 'Choose a Topic'}}/>
    <Stack.Screen name='RegisterForm' component={RegisterForm}/>
  </Stack.Navigator>
  )
}
export default LoginNavigate