import React from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useAuthContext();
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      if (response.ok) {
        alert("Login up successful!");
      } else {
        alert("Login up failed!");
      }
    } catch (error) {
      alert("Login up failed!");
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useSignUp;
