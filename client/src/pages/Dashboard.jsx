import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API = "http://localhost:5001"; // ✅ correct port

  // Fetch user
  const fetchUser = async () => {
    const res = await axios.get(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  // Fetch notes
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/api/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  // Add / Update
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      return alert("Fill all fields");
    }

    if (editingId) {
      await axios.put(`${API}/api/notes/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
    } else {
      await axios.post(`${API}/api/notes`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({ title: "", content: "" });
    fetchNotes();
  };

  // Edit
  const handleEdit = (note) => {
    setForm({
      title: note.title,
      content: note.content,
    });
    setEditingId(note._id);
  };

  // Delete
  const deleteNote = async (id) => {
    await axios.delete(`${API}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">

      <h1 className="text-2xl mb-4">
        Welcome {user?.name} 👋
      </h1>

      <button
        onClick={() => navigate("/analytics")}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Go Analytics 📊
      </button>

      {/* FORM */}
      <div className="mb-6">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="p-2 mr-2 text-black"
        />

        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="p-2 mr-2 text-black"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* NOTES */}
      {notes.map((note, index) => (
        <div key={note._id} className="mb-3 p-3 bg-gray-800 rounded">
          <h2>{index + 1}. {note.title}</h2>
          <p>{note.content}</p>

          <button
            onClick={() => handleEdit(note)}
            className="bg-yellow-500 px-2 py-1 mr-2"
          >
            Edit
          </button>

          <button
            onClick={() => deleteNote(note._id)}
            className="bg-red-500 px-2 py-1"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}