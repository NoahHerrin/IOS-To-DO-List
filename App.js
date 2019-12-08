import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';
import { thisExpression } from '@babel/types';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      todoInput: '',
      todos: [
        {id: 0, title: 'Take out the trash', done: false},
        {id: 1, title: 'cook dinner', done: false }
      ]
    }
  }
  addNewTodo() {
    let todos = this.state.todos;
    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    })
  }
  toggleDone(item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }
      return todo
    })
    this.setState({todos});
  }
  removeTodo(item) {
    let todos = this.state.todos;
    todos = todos.filter((todo)=>todo.id !== item.id);
    this.setState({todos});
  }
// research lifecycle methods onMountComponent, and onDismountComponent
// cycle of an object is 
// constructor -> objectWillMount -> render -> onDismount -> render
  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>
    return (
      <View style={styles.container}>
        {statusbar}
        <Header title="Noah's To Do List"/>
        <View style={styles.divider}/>
        <InputBar
          addNewTodo={() => this.addNewTodo()}
          textChange={todoInput => this.setState({ todoInput })}
          todoInput={this.state.todoInput}
        />
        <FlatList 
        data={this.state.todos}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return(
            <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={()=>this.removeTodo(item)}/>
          )
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor: '#bddcf0',
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
  }

})