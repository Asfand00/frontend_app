import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/tasks',
});

export const getTasks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/', task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/${id}`);
};
