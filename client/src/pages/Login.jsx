import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-start bg-cover bg-center relative px-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1758292109543-a5c7f0c4cb9b?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN CARD */}
      <div className="relative ml-20 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-[350px] text-center">

        {/* LOGO */}
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="text-red-500">CU</span>IMS
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-300 text-sm mb-4">
          Welcome to University Information Management System
        </p>

        <h2 className="text-lg text-white font-semibold mb-6">
          Log in
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter Email Id"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            required
          />

          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold transition">
            NEXT
          </button>
        </form>

        {/* REGISTER BUTTON */}
        <div className="mt-4 ">
          <p className="text-gray-300 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}