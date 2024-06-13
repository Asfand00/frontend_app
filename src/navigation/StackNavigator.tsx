import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './screens/TaskList';
import TaskForm from './screens/TaskForm';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
