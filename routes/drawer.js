import { StyleSheet, TouchableOpacity, Text, View, Button} from "react-native";
import React, { useState } from "react";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase'
import Home from '../routes/homeStack';
import Profile from './ProfileStack';
import Auth from './AuthStack';
import Custom from './custumDrawer'

const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  const [IsAuth, setIsAuth] = useState(false);
  const [isMout, setIsMount] = useState(true)
  
    React.useEffect(()=>{
      if(isMout)
        {
          firebase.auth().onAuthStateChanged((user) => {
          setIsAuth(!!user)
          console.log(!!user)
          });
          setIsMount(false);
          
      }
    })

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Todos"  drawerContent={props => <Custom {...props}/>} >
        <Drawer.Screen name="Todos" component={Home} />
        {IsAuth?<Drawer.Screen name="Profile" component={Profile} />:null}
      </Drawer.Navigator> 
    </NavigationContainer>
  );

}
