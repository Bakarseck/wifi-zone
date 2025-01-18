import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      // Decode the token to get user data (optional, if payload contains useful data)
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser({ id: payload.id, email: payload.email });
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

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, token, login, logout };
}
