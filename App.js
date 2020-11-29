import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import ForumMain from './components/ForumMain';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{title: 'Fern`s Counseling'}}/>
        <Stack.Screen name='ForumMain' component={ForumMain}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
