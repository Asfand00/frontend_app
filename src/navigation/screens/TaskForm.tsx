import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

const API_BASE_URL = 'http://localhost:3000'; // Replace with your computer's IPv4 address for example http://198.25.0.2:3000  

export default function TaskForm({ navigation, route }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient(); // Grab the query client with useQueryClient()

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [route.params?.task]);

  const handleSubmit = async () => {
    try {
      if (route.params?.task) {
        console.log(`Updating task with ID ${route.params.task.id}: ${title}, ${description}`);
        await axios.put(`${API_BASE_URL}/tasks/${Number(route.params.task.id)}`, { title, description });
      } else {
        console.log(`Creating new task: ${title}, ${description}`);
        await axios.post(`${API_BASE_URL}/tasks`, { title, description });
      }
      await queryClient.refetchQueries({ queryKey: ['tasks'] }); // Refetch the tasks query before exiting handleSubmit
      navigation.goBack();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Handle error here (e.g., show error message to user)
    }
  };

  const handleDelete = async () => {
    try {
      if (route.params?.task) {
        console.log(`Deleting task with ID ${route.params.task.id}`);
        await axios.delete(`${API_BASE_URL}/tasks/${Number(route.params.task.id)}`);
      }
      await queryClient.refetchQueries({ queryKey: ['tasks'] });
      navigation.goBack();
    } catch (error) {
      console.error('Error in handleDelete:', error);
      // Handle error here (e.g., show error message to user)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Button title="Save" onPress={handleSubmit} />
      {route.params?.task && <Button title="Delete" onPress={handleDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
});
