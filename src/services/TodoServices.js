import axios from "axios";

// Helper to get token from localStorage
const getToken = () => {
  const storedData = JSON.parse(localStorage.getItem("todoapp"));
  return storedData?.token;
};

// Base URL handles production and local separately
const BASE_URL = process.env.NODE_ENV === "production" 
  ? process.env.REACT_APP_API_URL 
  : "/api/v1";

// Create todo
const createTodo = async (data) => {
  const token = getToken();
  if (!token) return console.log("Token not found");

  return axios.post(`${BASE_URL}/todo/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get all todos
const getAllTodo = async (userId) => {
  const token = getToken();
  if (!token) return console.log("Token not found");

  return axios.get(`${BASE_URL}/todo/getAll/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update todo
const updateTodo = async (id, updatedData) => {
  const token = getToken();
  if (!token) return console.log("Token not found");

  return axios.patch(`${BASE_URL}/todo/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete todo
const deleteTodo = async (id) => {
  const token = getToken();
  if (!token) return console.log("Token not found");

  return axios.delete(`${BASE_URL}/todo/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };

export default TodoServices;