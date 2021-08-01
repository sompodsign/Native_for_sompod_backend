import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  View,
  StyleSheet,
} from "react-native";
import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";
import firestore from '@react-native-firebase/firestore';

const date = new Date().getDate(); //To get the Current Date
const month = new Date().getMonth() + 1; //To get the Current Month
const year = new Date().getFullYear(); //To get the Current Year

const windowsWidth = Dimensions.get("window").width;

export default function TodoScreen() {

  const ref = firestore().collection('todos');

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");


  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, date, month, year } = doc.data();
        list.push({
          id: doc.id,
          title,
          date,
          month,
          year
        });
      });

      setTodos(list);
    });
  }, []);

  async function pressHandler(title) {
    await ref.add({
      title: title,
      date: date, 
      month: month,
      year: year
    });
  }

  async function deleteHandler(id) {
     await firestore().collection("todos").doc(id).delete()
  }

  return (
    <View style={styles.background} onPress={Keyboard.dismiss}>
      <View onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <GoalItem deleteItem={deleteHandler} items={todos} addHandler={pressHandler} />
        </View>
      </View>
      <View style={styles.inputContainer}>

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
