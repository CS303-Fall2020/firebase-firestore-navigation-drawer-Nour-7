import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { StackActions } from '@react-navigation/native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { MaterialIcons } from "@expo/vector-icons";
import {decode, encode} from 'base-64'

export default function about({ navigation}) {
  
  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }
 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button           
        onPress={()=>{
          logout()
          navigation.dispatch(StackActions.replace('Login'));
        }} title="LOGOUT" />
      ),
      headerLeft: () => (
        <MaterialIcons
        name={'menu'}
        size={30}
        color="#333"
        onPress={() => {navigation.openDrawer()}}
      />
      ),
    });
  }, [navigation]);

const logout = async () =>{

  try {
      await firebase.auth().signOut();

  } catch (error) {
      console.log(error);
  }
}

  return (
   
    <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      console.log("dismissed");
    }}
  >
    <View style={styles.container}>
      <View style={styles.content}>
   <View style = {styles.container}> 
        <Text> Profile </Text>
    </View>
      </View>
    </View>
  </TouchableWithoutFeedback>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    marginTop: 25,
    flex: 1,
  }
});