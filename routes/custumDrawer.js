
import React, { useState } from "react";

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase'
import { StackActions } from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


export default function CustomDrawerContent(props) {
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
if(!IsAuth) return (<DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
           
 </DrawerContentScrollView>
 )

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => {
                firebase.auth().signOut();
                props.navigation.dispatch(StackActions.replace('Login'));
                props.navigation.closeDrawer();}} 

            />       
        </DrawerContentScrollView>
    );
  }
  