import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        data
      );

      console.log("SUCCESS:", res.data);

      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err.response?.data);

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[350px] text-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-700 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-700 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="w-full p-3 rounded bg-gray-700 outline-none"
            required
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded font-semibold">
            Register
          </button>

        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}