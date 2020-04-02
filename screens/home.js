import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,Button,
  AsyncStorage,
  Text,
  NetInfo
} from "react-native";
import TodoItem from "../components/todoItem";
import { StackActions } from '@react-navigation/native';
import AddTodo from "../components/addTodo";
import Loader from '../components/loader';
import ConLabel from '../components/conLabel';
import { SplashScreen } from 'expo';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { MaterialIcons } from "@expo/vector-icons";

import {decode, encode} from 'base-64'




export default function Home({ navigation , route}) {
  
  if (!global.btoa) { global.btoa = encode }

  if (!global.atob) { global.atob = decode }

  const [todos, setTodos] = useState([]);
  const [isMout, setIsMount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(true)
  const [userId, setUserId] = useState(firebase.auth().currentUser.uid)

 
  var db = firebase.firestore();


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

  React.useEffect(() => {
    if(!isMout){
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        hasInternetConnection =>{
          setOnline(hasInternetConnection);
          console.log("hasInternetConnection:" + hasInternetConnection)
        }
      );    
      fetchData()
      navigation.setParams({isFocus :false});
      setIsMount(prevMount =>{
        return !prevMount
      })
    }
    if(isMout)
   { 
    if(route.params.isFocus){
      setTodos(prevTodos => {
        db.collection("Todos").doc(route.params.id).update({
          title: route.params.title
      });
        return [...prevTodos];
       });
       navigation.setParams({isFocus :false});
    }
  }

  });

const logout = async () =>{

  try {
      await firebase.auth().signOut();
  } catch (error) {
      console.log(error);
  }

}

 const getQuary = () =>{
  db.collection("Todos").where("userId", "==", userId).onSnapshot((querySnapshot) => {
    
      let data = []
      querySnapshot.forEach((doc) => {
          todo = doc.data()
          todo.id = doc.id
          data = [todo, ...data]
      });

    setTodos(() => {
      data = data.sort((a, b)=> { return parseInt(a.date) < parseInt(b.date)})
      return data;
    });
    setLoading(false);
  })
 }


    const fetchData = async()=>{
      setLoading(()=>{
        return true
      })
      console.log("Loading " + loading)
      getQuary()
   }
    
  const pressHandler = id => {
    navigation.navigate("TodoDetails", {
      data: todos.filter(todo => todo.id == id)[0],
    });
  };

  const todoHandler = id => {
    setTodos(prevTodos => {
      prevTodos = prevTodos.filter(todo => todo.id != id);

      db.collection("Todos").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
       }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      return prevTodos;
    });
  };

  const CheckHandler = id => {
    
    setTodos(prevTodos => {
      index = prevTodos.findIndex(todo => todo.id == id);
      prevTodos[index].completed = !prevTodos[index].completed;
      db.collection("Todos").doc(id).update({
        completed: prevTodos[index].completed
    });
      return [...prevTodos];
    });
    
  };

  const submitHandler = title => {
    if (title.length > 3) {
      let todo = {
        userId:userId,
        title: title,
        completed:false,
        date: Date.now().toString() 
       }

      db.collection("Todos").add(todo)
      .then(function(docRef) {
        console.log("Document written with ID: ");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    todo.id = Math.random().toString()
        setTodos(prevTodos => {
          prevTodos =  [
              todo,
            ...prevTodos
          ]
          return prevTodos;
        });
     
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };

 
  return (
    <View style ={{flex:1}}>

 { loading? <Loader/>:( 
     <View style={{flex:1}}>
      <ConLabel connected = {online} fetchData={fetchData}/>
     <View style={styles.content}>
      <AddTodo submitHandler={submitHandler} />
      <View style={styles.list}>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              pressHandler={pressHandler}
              deleteHandler={CheckHandler}
              todoHandler={todoHandler}
            />
          )}
        />
      </View>
    </View>
    </View>
    )}
    <View style={{padding: 40}}>
    <Button onPress={fetchData} title="Refresh"/>
    </View>
    </View>
   
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