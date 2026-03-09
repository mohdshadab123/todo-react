import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;