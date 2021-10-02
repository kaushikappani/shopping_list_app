import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SingleTodo from "./components/Todo";
import AsyncStorage from "@react-native-async-storage/async-storage"

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleAdd = () => {
    console.log("handle add")
    setTodos((prev) => {
      return [...prev, { id: Date.now(), text: todo }];
    })
    setTodo("");
  }
  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) {
      setTodos(JSON.parse(data))
    }
  }
  useEffect(() => {
    fetchTodos();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter todo"
          style={styles.input}
          value={todo}
          onSubmitEditing={handleAdd}

          onChangeText={(text) => { setTodo(text) }}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", marginTop: 10 }}>
        <FlatList
          data={todos}
          renderItem={
            ({ item }) => <SingleTodo todo={item} todos={todos} setTodos={setTodos} />
          }
          keyExtractor={item => item.id.toString()}
        />

      </View>
      <StatusBar style="auto" />
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7DAd9"
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
    paddingTop: 30
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center"
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 10,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10
  }
})

export default App;
