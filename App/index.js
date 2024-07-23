// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

const WorkoutTracker = () => {
  const [workout, setWorkout] = useState('');
  const [workoutList, setWorkoutList] = useState([]);

  const handleAddWorkout = () => {
    if (workout.trim()) {
      setWorkoutList(prev => [...prev, { id: String(prev.length + 1), name: workout }]);
      setWorkout('');
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter workout"
        value={workout}
        onChangeText={setWorkout}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddWorkout}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
      <FlatList
        data={workoutList}
        renderItem={renderWorkoutItem}
        keyExtractor={item => item.id}
        style={styles.workoutList}
      />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Workout Tracker</Text>
        <WorkoutTracker />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cccccc',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  workoutList: {
    width: '100%',
    marginTop: 20,
  },
  workoutItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  workoutText: {
    fontSize: 16,
  },
});