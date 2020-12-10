import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyQuestions from './MyQuestions';
import MyAnswered from './MyAnswered';
import MyPending from './MyPending';
import AvatarPreview from './AvatarPreview';

const Stack = createStackNavigator();

const MyQuestionsNavigate = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyQuestions" component={MyQuestions} options={{title: 'My Activity'}}/>
    <Stack.Screen name="MyAnswered" component={MyAnswered} options={{ title: 'Answered' }} />
    <Stack.Screen name="MyPending" component={MyPending} options={{ title: 'Pending' }}/>
    <Stack.Screen name="EditAvatar" component={AvatarPreview} options={{title: 'Edit your Avatar'}}/>
  </Stack.Navigator>
);

export default MyQuestionsNavigate;