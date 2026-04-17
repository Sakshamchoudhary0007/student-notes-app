import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5001";

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(`${API}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8">

      <h1 className="text-3xl font-bold mb-6">📊 Analytics Dashboard</h1>

      {/* CARD */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-64">
        <h2 className="text-lg">Total Notes</h2>
        <p className="text-4xl font-bold mt-2">{notes.length}</p>
      </div>

    </div>
  );
}