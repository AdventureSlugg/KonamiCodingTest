import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './ui/pages/signin';
import SuccessfulLogin from './ui/pages/successfulLogin';
import TodoList from './ui/pages/todolist';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessfulLogin" component={SuccessfulLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
