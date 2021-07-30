import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  View,
  StyleSheet,
} from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";
import Realm from "realm";
import { createTodo, deleteTodo, todosGet, highestIdLookup } from "../api/apiRequests";
const date = new Date().getDate(); //To get the Current Date
const month = new Date().getMonth() + 1; //To get the Current Month
const year = new Date().getFullYear(); //To get the Current Year

// const windowHeight = Dimensions.get("window").height;
const windowsWidth = Dimensions.get("window").width;

export default function TodoScreen() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [highestId, setHighestId] = useState(0)
  const [highestIdFromServer, setHighestIdFromServer] = useState(null)

  async function getTodos() {
    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    return realm.objects("Task");

  }

  // const pullFromServer = () => {
  //   highestIdLookup().then(res => res.json())
  //     .then(response => setHighestIdFromServer(response['id']))
  // }

  // async function realmCreate(obj) {
  //   const realm = await Realm.open({
  //     path: "todos",
  //     schema: [TaskSchema],
  //   });
  //   realm.write(() => {
  //     realm.create("Task", obj);
  //   });
  // }
  
  useEffect(() => {
    // pullFromServer()
    getTodos().then(r => setTodos(r));
    // todosGet().then(resp => resp.json())
    //   .then(response => {
    //     const arr = todos.map(t1 => (response.filter(t2 => {
    //       return (t2['_id'] !== t1['_id'])
    // })))
    
    // console.log("not in todos", arr[1])
      // }
        // )
        // getTodos().then(r => setTodos(r));
  }, [title, highestId]);


  const TaskSchema = {
    name: "Task",
    properties: {
      _id: "int",
      title: "string",
      date: "int",
      month: "int",
      year: "int",
    },
    primaryKey: "_id",
  };

  async function pressHandler(title) {
    setTitle(title);
    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    const lastTask = realm.objects("Task").sorted("_id", true)[0];
    const highestId = lastTask == null ? 0 : lastTask._id + 1;
    // setHighestId(highestIdFromServer)

    realm.write(() => {
      realm.create("Task", {
        _id: highestId,
        title: title,
        date: date,
        month: month,
        year: year,
      });
    });
    // pullFromServer()

  //   try{
  //     createTodo({ highestId, title, date, month, year })
  //   }
  //   catch(err) {
  //     if (err) {
  //       deleteHandler(highestIdFromServer)
  //     }
  //   }

  }

  async function deleteHandler(id) {

    setTodos(todos.filter(r => r._id !== id));

    const realm = await Realm.open({
      path: "todos",
      schema: [TaskSchema],
    });

    realm.write(() => {
      const taskTodelete = realm.objects("Task").filtered(`_id==${id}`);
      realm.delete(taskTodelete);
    });
    deleteTodo(id);
    // pullFromServer()

  }


  return (
    <View style={styles.background} onPress={Keyboard.dismiss}>
      <View onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <GoalItem deleteItem={deleteHandler} items={todos} addHandler={pressHandler} />
        </View>
      </View>
      <View style={styles.inputContainer}>
      {/* <View style={{alignSelf: 'flex-end', marginRight: 10}}>
      <IconButton
        icon="refresh"
        color="white"
        size={35}
        onPress={pullFromServer}
      />
      </View> */}
        <GoalInput addHandler={pressHandler} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  background: {
    backgroundColor: "#47597E",
    flex: 1,
  },
  container: {
    margin: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputContainer: {
    width: windowsWidth,
    position: 'absolute',
    bottom: 0,
  }
});
