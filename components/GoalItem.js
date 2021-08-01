import React from "react";
import { FlatList, StyleSheet, Dimensions, View, Text } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { useKeyboard } from '@react-native-community/hooks';

const windowHeight = Dimensions.get("window").height;

const GoalItem = ({ items, deleteItem }) => {
const keyboard = useKeyboard();

let maxHeight = keyboard.keyboardShown ? windowHeight - (keyboard.keyboardHeight + 160) : windowHeight - 120

  return (
    <View>
    <FlatList
      style={{maxHeight: maxHeight}}
      keyExtractor={(item) => item.id}
      data={items}
      renderItem={({ item }) => (
        <Card
          mode="outlined"
          style={{ backgroundColor: "#293B5F", borderRadius: 10, marginBottom: 3, }}
        >
          <Card.Title
            title={item.title}
            titleStyle={{ color: "white", fontSize: 17, }}
            subtitle={`${item.date}-0${item.month}`}
            subtitleStyle={{ color: "#EEEEEE" }}
            left={(props) => <Avatar.Icon size={35} icon='calendar-check'/>}
            right={(props) => (
              <IconButton {...props} color="white" icon="check" onPress={() => deleteItem(item.id)} />
            )}
          />
        </Card>
      )}
    />

    </View>
  );
};


export default GoalItem;