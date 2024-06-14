import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your computer's IP address 

const fetchTasks = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/tasks`); // http://localhost:3000/tasks
    return data;
  } 
  catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Propagate the error for further handling
  }
};

export default function TaskList({ navigation }: any) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>An error has occurred: {error ? error.message : 'Unknown error'}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { task: item })} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('TaskForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
