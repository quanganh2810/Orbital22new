import * as React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Todolist from '../../TodoList';
import Pomodoro from '../../Pomodoro';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Todo" 
      options={{ tabBarIcon: () => <Text> ✅ </Text>}}
      component={Todolist} />
      <Tab.Screen 
      name="Pomodoro" 
      options={{ tabBarIcon: () => <Text> ⏰ </Text>}}
      component={Pomodoro} />
    </Tab.Navigator>
  )
}

export default HomeScreen