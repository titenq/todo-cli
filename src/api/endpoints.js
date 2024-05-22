import dotenv from 'dotenv';
import axios from 'axios';

import { envConfig } from '../utils/envConfig.js';

dotenv.config();

const baseUrl = envConfig.BASE_URL || 'https://todo-demo-7qeb.onrender.com/todo';

const getTodos = async () => {
  try {
    const response = await axios.get(baseUrl);
    const data = await response.data;
    
    return data;
  } catch (error) {
    console.error(error);

    return error;
  }
};

const postTodo = async content => {
  try {
    const response = await axios.post(baseUrl, { content });
    const data = await response.data;
    
    return data;
  } catch (error) {
    console.error(error);

    return error;
  }
};

const patchTodo = async (_id, content) => {
  try {
    const response = await axios.patch(`${baseUrl}/${_id}`, { content });
    const data = await response.data;
    
    return data;
  } catch (error) {
    console.error(error);

    return error;
  }
};

const deleteTodo = async _id => {
  try {
    const response = await axios.delete(`${baseUrl}/${_id}`);
    const data = await response.data;
    
    return data;
  } catch (error) {
    console.error(error);

    return error;
  }
};

export { getTodos, postTodo, patchTodo, deleteTodo };
