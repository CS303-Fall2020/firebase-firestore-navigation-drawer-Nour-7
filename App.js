import React, { useState} from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
// import Navigator from "./routes/homeStack";
import Navigator from './routes/drawer';

import { SplashScreen } from 'expo';
import config from './config'
import * as firebase from 'firebase'


if (!firebase.apps.length) {
  console.log("initializeApp-----------------")
  firebase.initializeApp(config)
}


export default function App() {
  // SplashScreen.preventAutoHide()
  console.disableYellowBox = true;
  
  return (
    <KeyboardAvoidingView enabled ={false}
    behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed");
      }}
    >
      <View style={styles.container}>
        {/* <Header /> */}
        <View style={styles.content}>
          <Navigator/>
        </View>
      </View>
    </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex: 1,
    
    backgroundColor: "#fff"
  },
  content: {
    flex: 1
  }
});
