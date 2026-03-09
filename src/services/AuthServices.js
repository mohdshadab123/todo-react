import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/api/v1/users`;

const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
}

const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
}

const AuthServices = { registerUser, loginUser };

export default AuthServices;