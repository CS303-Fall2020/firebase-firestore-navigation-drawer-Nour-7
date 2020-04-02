import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/signup';
import Login from '../screens/login';
import ForgetPass from '../screens/forgetPass';


const Stack = createStackNavigator()


export default AuthStack = () => {
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
   <Stack.Screen name='Login' component={Login} />
   <Stack.Screen name='Signup' component={Signup} />
   <Stack.Screen name='ForgetPass' component={ForgetPass} />
 </Stack.Navigator>
  );
};