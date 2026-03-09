import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthServices from '../../services/AuthServices';
import toast from 'react-hot-toast';
import "./AuthStyle.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault(); // prevent form reload

    // Check for empty fields
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Send data exactly as backend expects
      const data = { username, email, password };
      const res = await AuthServices.registerUser(data);

      toast.success(res.data.message); // show success message from backend

      // **NEW:** store the user separately in localStorage for createdBy usage
      if (res.data.user) {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify({
          _id: user._id,
          username: user.username,
          email: user.email
        }));
      }

      
      localStorage.setItem("todoapp", JSON.stringify(res.data));

      
      navigate("/login");

      console.log(res.data);

    } catch (error) {
      
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
        console.log(error.response.data);
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={registerHandler}>
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-bottom">
          <p className="text-center">
            Already a user? please
            <Link to="/login"> login</Link>
          </p>

          <button type="submit" className="login-btn">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;