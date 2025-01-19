import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    // Decode the token to extract user information
    try {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        name: `${payload.firstName} ${payload.lastName}`,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to decode token:", error);
      logout(); // Clear invalid token
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in.");
      }

      const { token, user } = await response.json();
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const fetchProtectedData = async (url) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch protected data.");
        // return {error: "Failed to fetch"}
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching protected data:", error);
      // throw new Error("Failed to fetch protected data.");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, token, login, logout, fetchProtectedData, loading };
}
