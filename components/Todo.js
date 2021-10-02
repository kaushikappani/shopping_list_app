import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function SingleTodo({ todo, setTodos, todos }) {
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const handleEdit = () => {
        if (!edit) {
            setEdit(!edit);
        } else {

            setTodos(
                todos.map((t) =>
                    t.id === todo.id
                        ? {
                            id: t.id,
                            text: editText,
                        }
                        : t
                )
            );
            AsyncStorage.setItem("todos", JSON.stringify(todos));
            setEdit(!edit);
        }
    };
    const handleDelete = (id) => {
        setTodos(todos.filter(t => t.id !== id))
    }
    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    return (
        <View style={styles.todo}>
            {!edit ? <Text style={styles.todotext}>{todo.text}</Text> : <TextInput
                onChangeText={(text) => setEditText(text)}
                style={styles.todoinput}
                value={editText}
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={handleEdit}
            />}
            <TouchableOpacity>
                <MaterialIcons
                    name="edit"
                    size={23}
                    color="black"
                    onPress={handleEdit}
                    style={styles.todoaction}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcons
                    name="delete"
                    size={23}
                    color="red"
                    style={styles.todoaction}
                    onPress={() => handleDelete(todo.id)}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 50,
    },
    todotext: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    todoinput: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 5,
    },
    todoaction: {
        marginLeft: 20,
    },
});