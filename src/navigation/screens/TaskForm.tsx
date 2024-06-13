import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function TaskForm({ navigation, route }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [route.params?.task]);

  const handleSubmit = async () => {
    if (route.params?.task) {
      await axios.put(`http://localhost:3000/tasks/${route.params.task.id}`, { title, description });
    } else {
      await axios.post('http://localhost:3000/tasks', { title, description });
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (route.params?.task) {
      await axios.delete(`http://localhost:3000/tasks/${route.params.task.id}`);
    }
    navigation.goBack();
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
