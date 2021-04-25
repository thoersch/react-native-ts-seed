
 import React, { useState } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
   Text,
   View,
   TextInput,
 } from 'react-native';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function App() {
    const [newTodo, setNewTodo] = useState<string>("");
    const [todoList, setTodos] = useState<Todo[]>([{id: 1, title: "Make an App", done: false}, {id: 2, title: "Ship the damn thing.", done: false}]);

    const toggleTodo = (todoIndex: number) : void => {
      const updatedTodos = [...todoList];
      updatedTodos[todoIndex].done = !updatedTodos[todoIndex].done;
      setTodos(updatedTodos);
    }

    const addTodo = (todoItem: string) : void => {
      if (todoItem === '') {
        return;
      }

      const highestIdReducer = (acc: Todo, cur: Todo) => acc.id > cur.id ? acc : cur;
      const newId: number = todoList.reduce(highestIdReducer).id + 1;
      const todo: Todo = { id: newId, title: todoItem, done: false };
      
      setTodos([...todoList, todo]);
      setNewTodo(''); 
    }

    const removeTodos = () : void => {
      const updatedTodos = [...todoList.filter(t => !t.done)];
      setTodos(updatedTodos);
    }

    return (
      <SafeAreaView>
        <StatusBar barStyle={'light-content'}></StatusBar>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Todos ({todoList.filter((t) => !t.done).length})</Text>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            {
              todoList.map((todo: Todo, index: number) => (
                <TouchableOpacity onPress={(e) => toggleTodo(index)} style={[styles.todo, todo.done ? styles.todoDone : styles.todoOpen]}>
                  <Text style={[todo.done ? styles.todoDoneText : styles.todoDoneOpen]}>
                  {todo.title}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
        <TextInput style={styles.newTodo} 
                   placeholder="Yet another thing..." 
                   value={newTodo} 
                   blurOnSubmit={false}
                   onSubmitEditing={e => addTodo(newTodo)} 
                   onChangeText={(e) => setNewTodo(e)}></TextInput>
        <TouchableOpacity style={styles.removeTodos} onPress={(e) => removeTodos()} disabled={todoList.length === 0}><Text>Remove Completed</Text></TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row'
  },
  sectionTitle: {
    backgroundColor: '#9689c4',
    padding: 15,
    width: '100%',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  todo: {
    minHeight: 30,
    width: '100%',
    padding: 15,
    marginBottom: 5
  },
  todoDone: {
    backgroundColor: '#f1eff7'
  },
  todoOpen: {
    backgroundColor: '#d2d4d2'
  },
  todoDoneText: {
    textDecorationLine: 'line-through'
  },
  todoDoneOpen: {
    fontWeight: 'bold'
  },
  removeTodos: {
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    minHeight: 40,
    backgroundColor: '#c4b389',
    marginTop: 3
  },
  newTodo: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: 5,
    margin: 2,
    height: 40
  }
});
