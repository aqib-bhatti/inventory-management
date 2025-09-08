import React, { useEffect, useState } from "react";
import { getProfile } from "../services/userServices"; // service import

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        // const userData = { token: localStorage.getItem("token") }; 
        const response = await getProfile();

        
        if (response.success) {
          setUser(response.user); 
        } else {
          setError(response.message || "Failed to fetch profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading Profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2 className="font-bold text-lg">👤 Profile</h2>
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Role:</b> {user?.role}</p>
    </div>
  );
}

export default Profile;
