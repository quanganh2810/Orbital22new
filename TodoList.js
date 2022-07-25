import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, ImageBackground } from 'react-native';
import Task from './components/task';
import React, { useState } from 'react';

export default function Todolist() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [Duration, setDuration] = useState();
  const [taskDuration, setTaskDuration] = useState([])
  const [Deadline, setDeadline] = useState();
  const [taskDeadline, setTaskDeadline] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTaskDuration([...taskDuration, Duration]);
    setTaskDeadline([...taskDeadline, Deadline]);
    setTask(null);
    setDuration(null);
    setDeadline(null);
  }
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    let DurationCopy = [...taskDuration];
    DurationCopy.splice(index, 1);
    let DeadlineCopy = [...taskDeadline];
    DeadlineCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setTaskDuration(DurationCopy);
    setTaskDeadline(DeadlineCopy);
  }
  return (
    <ImageBackground  style={styles.container} source={require('./assets/Background.png')}>
      <View style={styles.bars}>
      </View>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>AUTODO</Text>
        <Text style={styles.sectionTitle}>   </Text>
        <TouchableOpacity>
          <View style={styles.tabWrapper}>
        <Text style={styles.tab}>What should I do today ?</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.sortWrapper}>
<Text style={styles.sort}> List: </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.items}>
          <ScrollView>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress = {() => completeTask(index)}>
                <Task text={item}/>
                </TouchableOpacity>
              ) 
            })
          }
          </ScrollView>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <ScrollView style={styles.ScrollView} horizontal={true}>
        <TextInput style={styles.inputtask} placeholder={'Task'} value={task} onChangeText={text => setTask(text)} />
        <TextInput style={styles.inputDuration} placeholder={'Duration (in hours)'} onChangeText={howlong => setDuration(howlong)}/>
        <TextInput style={styles.inputDeadline} placeholder={'Deadline (dd/mm/yy)'} onChangeText={bywhen => setDeadline(bywhen)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bars: {

  },
  container: {
    flex: 1,
    height: 800,
    width: 400,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  tab: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
     
  },
  items: {

  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },

  inputtask: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  inputDuration: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  inputDeadline: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrapper:{
    position: 'absolute',
    top: 510,
    width: 260,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  sortWrapper:{
    position: 'absolute',
    top: -30,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  sort:{
    fontSize: 15,
    fontWeight: 'bold',
  }
});