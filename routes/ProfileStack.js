import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile';


const Stack = createStackNavigator()

export default ProfileStack = ({navigation}) => {
  return (
      <Stack.Navigator
         screenOptions={{
            title: 'My Todos', 
            headerTitleAlign: 'center',
             headerStyle: {
                backgroundColor: '#228B22'},

            headerTitleStyle: {
                alignSelf: 'center',
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
          }
      }}
      > 
        <Stack.Screen name='Profile' component={Profile} />

      </Stack.Navigator>
  )
}