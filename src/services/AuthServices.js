import axios from "axios";

// Base URL uses environment variable for production
// Locally, proxy in package.json handles /users requests
const API = process.env.NODE_ENV === "production" 
  ? `${process.env.REACT_APP_API_URL}/users` 
  : "/api/v1/users";

const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
}

const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
}

const AuthServices = { registerUser, loginUser };

export default AuthServices;