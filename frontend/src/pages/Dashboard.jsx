import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../api";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("/api/auth/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (err.reponse?.status === 401) {
          navigate("/login"); // fallback on 401's
        }
      }
    };

    fetchUser();
  }, [navigate]);

   // logout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate('/login');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      {user ? (
        <>
          <p className="mb-4">Hello, {user.email}!</p>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loding user info...</p>
      )}
      {/* Add more components here later: Tickets, Cases, etc. */}
    </div>
  );
};

export default Dashboard;
